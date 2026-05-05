import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield, Users, BookOpen, Trophy, ArrowLeft, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { useLessons } from "@/hooks/useLessons";
import AdminLessonEditor from "@/components/AdminLessonEditor";
import { toast } from "sonner";

interface UserData {
  user_id: string;
  display_name: string | null;
  created_at: string;
  progress_count: number;
  roles: string[];
}

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { modules, customLessons, reload: reloadLessons } = useLessons();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0, totalProgress: 0 });

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);

  useEffect(() => {
    if (adminLoading) return;
    if (!isAdmin) {
      navigate("/");
      return;
    }
    loadData();
  }, [isAdmin, adminLoading, navigate]);

  const loadData = async () => {
    setLoading(true);

    // Load all profiles
    const { data: profiles } = await supabase
      .from("profiles")
      .select("user_id, display_name, created_at")
      .order("created_at", { ascending: false });

    // Load all progress counts
    const { data: progress } = await supabase
      .from("user_progress")
      .select("user_id, lesson_id");

    // Load all roles
    const { data: roles } = await supabase
      .from("user_roles")
      .select("user_id, role");

    if (profiles) {
      const progressMap: Record<string, number> = {};
      (progress || []).forEach((p: any) => {
        progressMap[p.user_id] = (progressMap[p.user_id] || 0) + 1;
      });

      const rolesMap: Record<string, string[]> = {};
      (roles || []).forEach((r: any) => {
        if (!rolesMap[r.user_id]) rolesMap[r.user_id] = [];
        rolesMap[r.user_id].push(r.role);
      });

      const userData: UserData[] = profiles.map((p: any) => ({
        user_id: p.user_id,
        display_name: p.display_name,
        created_at: p.created_at,
        progress_count: progressMap[p.user_id] || 0,
        roles: rolesMap[p.user_id] || [],
      }));

      setUsers(userData);
      setStats({
        totalUsers: profiles.length,
        totalProgress: (progress || []).length,
      });
    }

    setLoading(false);
  };

  const deleteUserProgress = async (userId: string) => {
    const { error } = await supabase
      .from("user_progress")
      .delete()
      .eq("user_id", userId);

    if (error) {
      toast.error("Ýalňyşlyk: " + error.message);
    } else {
      toast.success("Ösüş aýyryldy");
      loadData();
    }
  };

  if (adminLoading || loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <p className="text-muted-foreground">Ýüklenýär...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-6 animate-slide-up">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Yza
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">Admin Panel</h1>
            </div>
          </div>

          <Tabs defaultValue="users" className="space-y-4">
            <TabsList>
              <TabsTrigger value="users">Ulanyjylar</TabsTrigger>
              <TabsTrigger value="lessons">Sapaklar</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              {/* Stats */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.totalUsers}</p>
                      <p className="text-sm text-muted-foreground">Ulanyjylar</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{totalLessons}</p>
                      <p className="text-sm text-muted-foreground">Sapaklar</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stats.totalProgress}</p>
                      <p className="text-sm text-muted-foreground">Tamamlanan sapaklar</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Users Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Ulanyjylar ({users.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ady</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Ösüş</TableHead>
                        <TableHead>Hasap döredildi</TableHead>
                        <TableHead className="text-right">Amallar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((u) => (
                        <TableRow key={u.user_id}>
                          <TableCell className="font-medium">
                            {u.display_name || "—"}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {u.roles.length > 0 ? (
                                u.roles.map((r) => (
                                  <Badge
                                    key={r}
                                    variant={r === "admin" ? "default" : "secondary"}
                                    className="text-xs"
                                  >
                                    {r}
                                  </Badge>
                                ))
                              ) : (
                                <Badge variant="outline" className="text-xs">user</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={totalLessons ? (u.progress_count / totalLessons) * 100 : 0}
                                className="h-2 w-20"
                              />
                              <span className="text-xs text-muted-foreground">
                                {u.progress_count}/{totalLessons}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(u.created_at).toLocaleDateString("tk-TM")}
                          </TableCell>
                          <TableCell className="text-right">
                            {!u.roles.includes("admin") && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-destructive hover:text-destructive"
                                onClick={() => deleteUserProgress(u.user_id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lessons">
              <AdminLessonEditor customLessons={customLessons} onReload={reloadLessons} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
