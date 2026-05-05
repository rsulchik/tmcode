import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, BookOpen, LogOut, Save } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import { modules } from "@/data/lessons";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, signOut } = useAuth();
  const { getModuleProgress, totalCompleted } = useProgress();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    // Load profile
    supabase
      .from("profiles")
      .select("display_name")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data?.display_name) setDisplayName(data.display_name);
      });
  }, [user, navigate]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName })
      .eq("user_id", user.id);
    if (error) {
      toast.error("Ýalňyşlyk ýüze çykdy");
    } else {
      toast.success("Profil täzelendi!");
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast.success("Ulgamdan çykyldy");
  };

  if (!user) return null;

  const initials = displayName
    ? displayName.slice(0, 2).toUpperCase()
    : (user.email?.slice(0, 2).toUpperCase() ?? "?");

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4 w-full">
                  <div className="space-y-2">
                    <Label>Adyňyz</Label>
                    <div className="flex gap-2">
                      <Input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Adyňyzy giriziň"
                      />
                      <Button onClick={handleSave} disabled={saving} size="sm" className="gap-1.5">
                        <Save className="h-4 w-4" />
                        Sakla
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="gap-1">
                      <Trophy className="h-3 w-3" />
                      {totalCompleted} sapak tamamlandy
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress by module */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Ösüş
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {modules.map((mod) => {
                const progress = getModuleProgress(mod.lessons.map((l) => l.id));
                return (
                  <div key={mod.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span>{mod.icon}</span>
                        {mod.title}
                      </span>
                      <span className="font-medium text-primary">{progress.percent}%</span>
                    </div>
                    <Progress value={progress.percent} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {progress.done} / {progress.total} sapak
                    </p>
                  </div>
                );
              })}
              <div className="pt-2 border-t border-border">
                <div className="flex justify-between text-sm font-medium">
                  <span>Umumy</span>
                  <span className="text-primary">
                    {totalLessons ? Math.round((totalCompleted / totalLessons) * 100) : 0}%
                  </span>
                </div>
                <Progress
                  value={totalLessons ? (totalCompleted / totalLessons) * 100 : 0}
                  className="h-2 mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            Ulgamdan çyk
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
