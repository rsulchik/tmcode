import { useState, useRef, useCallback, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, Copy, ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Lock, ClipboardList } from "lucide-react";
import { toast } from "sonner";
import { modules as staticModules } from "@/data/lessons";
import { useLessons } from "@/hooks/useLessons";
import { getHomeworkForLesson } from "@/data/homework";
import { useProgress } from "@/hooks/useProgress";

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function tokenize(code: string): string {
  const patterns = [
    { type: "comment", regex: /\/\/.*$/gm },
    { type: "comment", regex: /\/\*[\s\S]*?\*\//g },
    { type: "comment", regex: /<!--[\s\S]*?-->/g },
    { type: "string", regex: /(["'`])(?:(?!\1|\\).|\\.)*\1/g },
    { type: "keyword", regex: /\b(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|typeof|instanceof|in|of|class|extends|super|import|export|default|from|try|catch|finally|throw|async|await|yield|this|void|delete)\b/g },
    { type: "builtin", regex: /\b(?:console|Math|JSON|Array|Object|String|Number|Boolean|Date|document|window)\b/g },
    { type: "boolean", regex: /\b(?:true|false|null|undefined|NaN|Infinity)\b/g },
    { type: "number", regex: /\b\d+\.?\d*\b/g },
    { type: "function", regex: /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g },
    { type: "keyword", regex: /(?<=<\/?)[\w-]+/g },
    { type: "property", regex: /(?<=\s)[\w-]+(?==)/g },
  ];

  const allTokens: { type: string; start: number; end: number; text: string }[] = [];
  for (const pattern of patterns) {
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    let match;
    while ((match = regex.exec(code)) !== null) {
      allTokens.push({ type: pattern.type, start: match.index, end: match.index + match[0].length, text: match[0] });
    }
  }
  allTokens.sort((a, b) => a.start - b.start || b.end - a.end);

  const filtered: typeof allTokens = [];
  let lastEnd = 0;
  for (const token of allTokens) {
    if (token.start >= lastEnd) {
      filtered.push(token);
      lastEnd = token.end;
    }
  }

  let result = "";
  let pos = 0;
  for (const token of filtered) {
    if (token.start > pos) result += escapeHtml(code.slice(pos, token.start));
    result += `<span class="token-${token.type}">${escapeHtml(token.text)}</span>`;
    pos = token.end;
  }
  if (pos < code.length) result += escapeHtml(code.slice(pos));
  return result + "\n";
}

function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-muted-foreground">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal text-muted-foreground">$2</li>')
    .replace(/\n\n/g, '<br class="my-2">');
}

const LessonDetail = () => {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { modules } = useLessons();

  const currentModule = modules.find((m) => m.id === moduleId);
  const lessonIndex = currentModule?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  const lesson = currentModule?.lessons[lessonIndex];

  const [code, setCode] = useState(lesson?.code ?? "");
  const [output, setOutput] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { isCompleted, markComplete } = useProgress();

  const isHtmlCss = lesson?.language === "html";
  const lessonDone = lesson ? isCompleted(lesson.id) : false;

  const syncScroll = useCallback(() => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  const runCode = () => {
    if (isHtmlCss) {
      // Render HTML/CSS in iframe
      if (iframeRef.current) {
        const doc = iframeRef.current.contentDocument;
        if (doc) {
          doc.open();
          doc.write(code);
          doc.close();
        }
      }
      toast.success("HTML görkezildi");
    } else {
      const logs: string[] = [];
      const originalLog = console.log;
      const originalError = console.error;
      console.log = (...args: any[]) => {
        logs.push(args.map((a) => {
          if (a === null) return "null";
          if (a === undefined) return "undefined";
          if (typeof a === "object") try { return JSON.stringify(a); } catch { return String(a); }
          return String(a);
        }).join(" "));
      };
      console.error = (...args: any[]) => {
        logs.push("Ýalňyşlyk: " + args.map(String).join(" "));
      };
      try {
        const fn = new Function(code);
        fn();
        setOutput(logs);
        toast.success("Kod üstünlikli ýerine ýetirildi");
      } catch (error: any) {
        logs.push(`Ýalňyşlyk: ${error?.message || String(error)}`);
        setOutput(logs);
        toast.error("Kod ýerine ýetirilende ýalňyşlyk ýüze çykdy");
      } finally {
        console.log = originalLog;
        console.error = originalError;
      }
    }
  };

  const resetCode = () => {
    setCode(lesson?.code ?? "");
    setOutput([]);
    toast.info("Kod täzeden başladyldy");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Kod göçürildi");
  };

  const prevLesson = currentModule?.lessons[lessonIndex - 1];
  const nextLesson = currentModule?.lessons[lessonIndex + 1];

  if (!lesson || !currentModule) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl text-muted-foreground">Sapak tapylmady</p>
          <Button onClick={() => navigate("/learn")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Sapaklara gaýt
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-6 animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Button variant="outline" size="sm" onClick={() => navigate("/learn")}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Yza
              </Button>
              <Badge variant="secondary">{currentModule.icon} {currentModule.title}</Badge>
              <Badge variant="outline">
                {lessonIndex + 1} / {currentModule.lessons.length}
              </Badge>
              {lessonDone && (
                <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Tamamlandy
                </Badge>
              )}
            </div>
            {!lessonDone && (
              <Button
                size="sm"
                variant="outline"
                className="gap-1 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => {
                  markComplete(lesson.id);
                  toast.success("Sapak tamamlandy! 🎉");
                }}
              >
                <CheckCircle2 className="h-4 w-4" />
                Tamamla
              </Button>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-1 flex items-center gap-3">
              {lesson.title}
              {lessonDone && <CheckCircle2 className="h-6 w-6 text-primary" />}
            </h1>
            <p className="text-muted-foreground">{lesson.description}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Theory / Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Teoriýa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm max-w-none text-foreground space-y-1"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(lesson.content) }}
                />
              </CardContent>
            </Card>

            {/* Code + output */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between py-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="text-lg">📝</span>
                    {isHtmlCss ? "HTML / CSS" : "JavaScript"}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={copyCode}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={resetCode}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={runCode} className="gap-1">
                      <Play className="h-4 w-4" />
                      Ýerine ýetir
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="relative rounded-lg border border-border overflow-hidden bg-muted/50">
                    <pre
                      ref={highlightRef}
                      className="absolute inset-0 p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words overflow-auto pointer-events-none m-0"
                      aria-hidden="true"
                    >
                      <code dangerouslySetInnerHTML={{ __html: tokenize(code) }} />
                    </pre>
                    <textarea
                      ref={textareaRef}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      onScroll={syncScroll}
                      className="relative w-full font-mono text-xs leading-relaxed min-h-[300px] resize-none p-3 bg-transparent text-transparent caret-foreground outline-none z-10"
                      spellCheck={false}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="text-lg">📤</span>
                    Netije
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {isHtmlCss ? (
                    <div className="rounded-lg border border-border overflow-hidden bg-white">
                      <iframe
                        ref={iframeRef}
                        title="HTML Preview"
                        className="w-full min-h-[300px] border-0"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    </div>
                  ) : (
                    <div className="bg-muted/50 rounded-lg p-3 min-h-[200px] font-mono text-xs">
                      {output.length === 0 ? (
                        <p className="text-muted-foreground">Netije şu ýerde görkeziler...</p>
                      ) : (
                        <div className="space-y-0.5">
                          {output.map((line, i) => (
                            <div key={i} className={line.startsWith("Ýalňyşlyk") ? "text-destructive" : "text-foreground"}>
                              <span className="text-muted-foreground mr-2">›</span>
                              {line}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Homework reminder */}
          {(() => {
            const hw = getHomeworkForLesson(lesson.id);
            const hwDone = hw ? isCompleted(hw.id) : true;
            if (hw && !hwDone && lessonDone) {
              return (
                <Card className="border-destructive/20 bg-destructive/5">
                  <CardContent className="py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ClipboardList className="h-5 w-5 text-destructive" />
                      <div>
                        <p className="font-medium">Öý iş tamamlanmady</p>
                        <p className="text-sm text-muted-foreground">Indiki sapaga geçmek üçin öý işini tamamlaň</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => navigate(`/homework/${moduleId}`)}>
                      Öý işe git
                    </Button>
                  </CardContent>
                </Card>
              );
            }
            return null;
          })()}

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            {prevLesson ? (
              <Button variant="outline" onClick={() => { navigate(`/learn/${moduleId}/${prevLesson.id}`); setCode(prevLesson.code); setOutput([]); }}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {prevLesson.title}
              </Button>
            ) : <div />}
            {(() => {
              const hw = getHomeworkForLesson(lesson.id);
              const hwDone = hw ? isCompleted(hw.id) : true;
              const nextLocked = !lessonDone || !hwDone;

              if (nextLesson) {
                return (
                  <Button
                    onClick={() => {
                      if (nextLocked) {
                        toast.error(hwDone ? "Sapagyy tamamlaň!" : "Öý işini tamamlaň!");
                        return;
                      }
                      navigate(`/learn/${moduleId}/${nextLesson.id}`);
                      setCode(nextLesson.code);
                      setOutput([]);
                    }}
                    variant={nextLocked ? "outline" : "default"}
                    className={nextLocked ? "opacity-70" : ""}
                  >
                    {nextLocked && <Lock className="h-4 w-4 mr-2" />}
                    {nextLesson.title}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                );
              }
              return (
                <Button onClick={() => navigate("/learn")}>
                  Sapaklara gaýt
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
