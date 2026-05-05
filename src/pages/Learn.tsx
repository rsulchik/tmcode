import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, ArrowRight, CheckCircle2, Trophy, ClipboardCheck, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { modules as staticModules } from "@/data/lessons";
import { quizzes } from "@/data/quizzes";
import { useLessons } from "@/hooks/useLessons";
import { getHomeworkForLesson } from "@/data/homework";
import { useProgress } from "@/hooks/useProgress";

const Learn = () => {
  const { modules } = useLessons();
  const { isCompleted, getModuleProgress, totalCompleted } = useProgress();

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);

  const isLessonLocked = (moduleId: string, lessonIndex: number, lessons: typeof modules[0]["lessons"]) => {
    if (lessonIndex === 0) return false;
    const prevLesson = lessons[lessonIndex - 1];
    const prevHw = getHomeworkForLesson(prevLesson.id);
    if (prevHw && !isCompleted(prevHw.id)) return true;
    if (!isCompleted(prevLesson.id)) return true;
    return false;
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8 animate-slide-up">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Öwreniň</h1>
              <p className="text-muted-foreground text-lg">
                Interaktiw sapaklardan programmirlemäni öwreniň
              </p>
            </div>
            <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
              <Trophy className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Umumy ösüş</p>
                <p className="text-lg font-bold">{totalCompleted} / {totalLessons} sapak</p>
              </div>
              <div className="w-24">
                <Progress value={totalLessons ? (totalCompleted / totalLessons) * 100 : 0} className="h-2" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => {
              const progress = getModuleProgress(mod.lessons.map((l) => l.id));
              const allDone = progress.done === progress.total;

              return (
                <Card key={mod.id} className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${allDone ? "ring-2 ring-primary/30" : ""}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{mod.icon}</div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1 flex items-center gap-2">
                          {mod.title}
                          {allDone && <CheckCircle2 className="h-5 w-5 text-primary" />}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{mod.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ösüş</span>
                        <span className="font-semibold text-primary">{progress.percent}%</span>
                      </div>
                      <Progress value={progress.percent} className="h-2" />
                      <p className="text-xs text-muted-foreground">{progress.done} / {progress.total} sapak tamamlandy</p>
                    </div>

                    <div className="space-y-1.5">
                      {mod.lessons.map((lesson, i) => {
                        const done = isCompleted(lesson.id);
                        const locked = isLessonLocked(mod.id, i, mod.lessons);
                        const hw = getHomeworkForLesson(lesson.id);
                        const hwDone = hw ? isCompleted(hw.id) : true;

                        if (locked) {
                          return (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-3 p-2 rounded-lg opacity-50 cursor-not-allowed"
                            >
                              <span className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 bg-muted text-muted-foreground">
                                <Lock className="h-3 w-3" />
                              </span>
                              <span className="text-sm truncate flex-1 text-muted-foreground">
                                {lesson.title}
                              </span>
                            </div>
                          );
                        }

                        return (
                          <Link
                            key={lesson.id}
                            to={`/learn/${mod.id}/${lesson.id}`}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group/item"
                          >
                            <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${done ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                              {done ? "✓" : i + 1}
                            </span>
                            <span className={`text-sm truncate flex-1 ${done ? "text-muted-foreground line-through" : "text-foreground group-hover/item:text-primary"} transition-colors`}>
                              {lesson.title}
                            </span>
                            {hw && !hwDone && done && (
                              <Badge variant="outline" className="text-xs shrink-0 gap-1 border-destructive/30 text-destructive">
                                <ClipboardCheck className="h-3 w-3" />
                                Öý iş
                              </Badge>
                            )}
                            <ArrowRight className="h-3 w-3 text-muted-foreground ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0" />
                          </Link>
                        );
                      })}
                    </div>

                    <div className="flex gap-2">
                      <Link to={`/learn/${mod.id}/${mod.lessons[0].id}`} className="flex-1">
                        <Button className="w-full gap-2" variant={allDone ? "outline" : "default"}>
                          {allDone ? (
                            <><CheckCircle2 className="h-4 w-4" /> Gaýtala</>
                          ) : progress.done > 0 ? (
                            <><Play className="h-4 w-4" /> Dowam et</>
                          ) : (
                            <><Play className="h-4 w-4" /> Başla</>
                          )}
                        </Button>
                      </Link>
                      {quizzes.find((q) => q.moduleId === mod.id) && (
                        <Link to={`/quiz/${mod.id}`}>
                          <Button
                            variant="outline"
                            className={`gap-1.5 ${isCompleted(`quiz-${mod.id}`) ? "border-primary/30 text-primary" : ""}`}
                          >
                            <ClipboardCheck className="h-4 w-4" />
                            Test
                            {isCompleted(`quiz-${mod.id}`) && (
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                            )}
                          </Button>
                        </Link>
                      )}
                    </div>
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

export default Learn;
