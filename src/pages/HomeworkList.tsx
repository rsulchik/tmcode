import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ClipboardList, ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { modules } from "@/data/lessons";
import { getHomeworksForModule } from "@/data/homework";
import { useProgress } from "@/hooks/useProgress";

const HomeworkList = () => {
  const { isCompleted, getModuleProgress } = useProgress();

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8 animate-slide-up">
          <div>
            <h1 className="text-4xl font-bold mb-2">Öý işi</h1>
            <p className="text-muted-foreground text-lg">
              Her sapakdan soň öý işini tamamlaň
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => {
              const homeworks = getHomeworksForModule(mod.id);
              if (homeworks.length === 0) return null;

              const doneCount = homeworks.filter((hw) => isCompleted(hw.id)).length;
              const allDone = doneCount === homeworks.length;
              const percent = Math.round((doneCount / homeworks.length) * 100);

              return (
                <Card key={mod.id} className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${allDone ? "ring-2 ring-primary/30" : ""}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{mod.icon}</div>
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          {mod.title}
                          {allDone && <CheckCircle2 className="h-5 w-5 text-primary" />}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{homeworks.length} öý iş</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ösüş</span>
                        <span className="font-semibold text-primary">{percent}%</span>
                      </div>
                      <Progress value={percent} className="h-2" />
                      <p className="text-xs text-muted-foreground">{doneCount} / {homeworks.length} tamamlandy</p>
                    </div>

                    <div className="space-y-1.5">
                      {homeworks.map((hw, i) => {
                        const done = isCompleted(hw.id);
                        const prevDone = i === 0 || isCompleted(homeworks[i - 1].id);
                        const locked = !prevDone && !done;

                        return (
                          <div
                            key={hw.id}
                            className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                              locked ? "opacity-50" : "hover:bg-muted/50"
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                              done ? "bg-primary text-primary-foreground" : locked ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                            }`}>
                              {done ? "✓" : locked ? <Lock className="h-3 w-3" /> : i + 1}
                            </span>
                            <span className={`text-sm truncate flex-1 ${
                              done ? "text-muted-foreground line-through" : locked ? "text-muted-foreground" : "text-foreground"
                            }`}>
                              {hw.title}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <Link to={`/homework/${mod.id}`}>
                      <Button className="w-full gap-2 mt-2" variant={allDone ? "outline" : "default"}>
                        {allDone ? (
                          <><CheckCircle2 className="h-4 w-4" /> Gaýtala</>
                        ) : doneCount > 0 ? (
                          <><ArrowRight className="h-4 w-4" /> Dowam et</>
                        ) : (
                          <><ClipboardList className="h-4 w-4" /> Başla</>
                        )}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkList;
