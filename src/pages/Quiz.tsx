import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
} from "lucide-react";
import { quizzes } from "@/data/quizzes";
import { useProgress } from "@/hooks/useProgress";
import { toast } from "sonner";

const Quiz = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const quiz = quizzes.find((q) => q.moduleId === moduleId);

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const { markComplete } = useProgress();

  if (!quiz) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl text-muted-foreground">Test tapylmady</p>
          <Button onClick={() => navigate("/learn")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Sapaklara gaýt
          </Button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQ];
  const total = quiz.questions.length;
  const percent = Math.round(((currentQ + (answered ? 1 : 0)) / total) * 100);

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setAnswered(true);
    const correct = selected === question.correctIndex;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, selected]);
  };

  const handleNext = () => {
    if (currentQ + 1 >= total) {
      setFinished(true);
      const finalScore = score;
      const passingScore = Math.ceil(total * 0.7);
      if (finalScore >= passingScore) {
        markComplete(`quiz-${moduleId}`);
        toast.success("Test üstünlikli geçildi! 🎉");
      }
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  if (finished) {
    const passingScore = Math.ceil(total * 0.7);
    const passed = score >= passingScore;
    const scorePercent = Math.round((score / total) * 100);

    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4">
                  {passed ? (
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Trophy className="h-10 w-10 text-primary" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                      <XCircle className="h-10 w-10 text-destructive" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-2xl">
                  {passed ? "Gutlaýarys! 🎉" : "Synanyşyň!"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-4xl font-bold text-primary mb-1">
                    {score} / {total}
                  </p>
                  <p className="text-muted-foreground">
                    dogry jogap ({scorePercent}%)
                  </p>
                </div>

                <Progress value={scorePercent} className="h-3 max-w-xs mx-auto" />

                <p className="text-muted-foreground">
                  {passed
                    ? "Siz bu moduly üstünlikli tamamladyňyz!"
                    : `Geçmek üçin ${passingScore} dogry jogap gerek. Gaýtadan synanyşyň!`}
                </p>

                {/* Review answers */}
                <div className="space-y-2 text-left max-w-md mx-auto">
                  {quiz.questions.map((q, i) => {
                    const userAnswer = answers[i];
                    const correct = userAnswer === q.correctIndex;
                    return (
                      <div
                        key={q.id}
                        className={`flex items-start gap-2 p-2 rounded-lg text-sm ${
                          correct
                            ? "bg-primary/5 text-foreground"
                            : "bg-destructive/5 text-foreground"
                        }`}
                      >
                        {correct ? (
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        ) : (
                          <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                        )}
                        <div>
                          <p className="font-medium">{q.question}</p>
                          {!correct && (
                            <p className="text-muted-foreground text-xs mt-0.5">
                              Dogry jogap: {q.options[q.correctIndex]}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3 justify-center pt-2">
                  <Button variant="outline" onClick={() => navigate("/learn")}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Sapaklara gaýt
                  </Button>
                  <Button onClick={handleRestart}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Gaýtadan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/learn")}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Yza
              </Button>
              <Badge variant="secondary">
                {quiz.icon} {quiz.title}
              </Badge>
            </div>
            <Badge variant="outline">
              {currentQ + 1} / {total}
            </Badge>
          </div>

          <Progress value={percent} className="h-2" />

          {/* Question Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {question.options.map((option, i) => {
                let variant = "outline" as const;
                let extraClass = "justify-start text-left h-auto py-3 px-4";

                if (answered) {
                  if (i === question.correctIndex) {
                    extraClass +=
                      " border-primary bg-primary/10 text-primary";
                  } else if (i === selected && i !== question.correctIndex) {
                    extraClass +=
                      " border-destructive bg-destructive/10 text-destructive";
                  }
                } else if (i === selected) {
                  extraClass +=
                    " border-primary bg-primary/5 ring-2 ring-primary/20";
                }

                return (
                  <Button
                    key={i}
                    variant={variant}
                    className={`w-full ${extraClass} transition-all`}
                    onClick={() => handleSelect(i)}
                    disabled={answered}
                  >
                    <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-sm font-bold mr-3 shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {option}
                    {answered && i === question.correctIndex && (
                      <CheckCircle2 className="h-5 w-5 text-primary ml-auto shrink-0" />
                    )}
                    {answered &&
                      i === selected &&
                      i !== question.correctIndex && (
                        <XCircle className="h-5 w-5 text-destructive ml-auto shrink-0" />
                      )}
                  </Button>
                );
              })}

              {answered && (
                <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground">
                  💡 {question.explanation}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Bal: {score} / {currentQ + (answered ? 1 : 0)}
            </div>
            {!answered ? (
              <Button onClick={handleSubmit} disabled={selected === null}>
                Barla
              </Button>
            ) : (
              <Button onClick={handleNext}>
                {currentQ + 1 >= total ? "Netijäni gör" : "Indiki sorag"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
