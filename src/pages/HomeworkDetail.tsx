import { useState, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Play, RotateCcw, CheckCircle2, Lightbulb, Lock } from "lucide-react";
import { toast } from "sonner";
import { homeworkTasks, getHomeworkForLesson } from "@/data/homework";
import { modules } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";

function escapeHtml(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function tokenize(code: string): string {
  const patterns = [
    { type: "comment", regex: /\/\/.*$/gm },
    { type: "comment", regex: /\/\*[\s\S]*?\*\//g },
    { type: "string", regex: /(["'`])(?:(?!\1|\\).|\\.)*\1/g },
    { type: "keyword", regex: /\b(?:const|let|var|function|return|if|else|for|while|class|import|export|from|new|typeof)\b/g },
    { type: "builtin", regex: /\b(?:console|Math|JSON|Array|Object|document)\b/g },
    { type: "boolean", regex: /\b(?:true|false|null|undefined)\b/g },
    { type: "number", regex: /\b\d+\.?\d*\b/g },
    { type: "function", regex: /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g },
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
    if (token.start >= lastEnd) { filtered.push(token); lastEnd = token.end; }
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

const Homework = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { isCompleted, markComplete } = useProgress();

  const currentModule = modules.find((m) => m.id === moduleId);
  const moduleHomeworks = homeworkTasks.filter((hw) => hw.moduleId === moduleId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const hw = moduleHomeworks[currentIndex];

  const [code, setCode] = useState(hw?.starterCode ?? "");
  const [output, setOutput] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const syncScroll = useCallback(() => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  if (!currentModule || moduleHomeworks.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-xl text-muted-foreground">Öý iş tapylmady</p>
          <Button onClick={() => navigate("/homework")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" /> Yza
          </Button>
        </div>
      </div>
    );
  }

  const isHtml = hw.language === "html";
  const hwDone = isCompleted(hw.id);

  const runCode = () => {
    if (isHtml) {
      if (iframeRef.current) {
        const doc = iframeRef.current.contentDocument;
        if (doc) { doc.open(); doc.write(code); doc.close(); }
      }
      // Check if expected patterns exist in code
      const allMatch = hw.expectedOutput.every((pattern) =>
        code.toLowerCase().includes(pattern.toLowerCase())
      );
      if (allMatch) {
        markComplete(hw.id);
        toast.success("Öý iş tamamlandy! 🎉");
      } else {
        toast.info("Kody ýerine ýetirdik, ýöne talaplary barlaň.");
      }
    } else {
      const logs: string[] = [];
      const origLog = console.log;
      const origErr = console.error;
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
        if (logs.length > 0 && !logs.some((l) => l.startsWith("Ýalňyşlyk"))) {
          markComplete(hw.id);
          toast.success("Öý iş tamamlandy! 🎉");
        } else if (logs.length === 0) {
          toast.info("console.log bilen netije çykaryň!");
        }
      } catch (error: any) {
        logs.push(`Ýalňyşlyk: ${error?.message || String(error)}`);
        setOutput(logs);
        toast.error("Kodda ýalňyşlyk bar");
      } finally {
        console.log = origLog;
        console.error = origErr;
      }
    }
  };

  const resetCode = () => {
    setCode(hw.starterCode);
    setOutput([]);
    setShowHint(false);
  };

  const goTo = (index: number) => {
    setCurrentIndex(index);
    const next = moduleHomeworks[index];
    setCode(next.starterCode);
    setOutput([]);
    setShowHint(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-6 animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => navigate("/homework")}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Yza
              </Button>
              <Badge variant="secondary">{currentModule.icon} {currentModule.title}</Badge>
              <Badge variant="outline">{currentIndex + 1} / {moduleHomeworks.length}</Badge>
              {hwDone && (
                <Badge className="bg-primary/10 text-primary border-primary/20 gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Tamamlandy
                </Badge>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-1">{hw.title}</h1>
            <p className="text-muted-foreground">{hw.description}</p>
          </div>

          {/* Instruction */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="py-4">
              <p className="font-medium">📋 {hw.instruction}</p>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Code Editor */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <CardTitle className="text-base">📝 Kod</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setShowHint(!showHint)}>
                    <Lightbulb className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={resetCode}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={runCode} className="gap-1">
                    <Play className="h-4 w-4" /> Barla
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {showHint && (
                  <div className="mb-3 p-3 rounded-lg bg-muted/50 border border-border text-sm space-y-1">
                    <p className="font-medium text-primary">💡 Maslahatlar:</p>
                    {hw.hints.map((hint, i) => (
                      <p key={i} className="text-muted-foreground">• {hint}</p>
                    ))}
                  </div>
                )}
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
                    className="relative w-full font-mono text-xs leading-relaxed min-h-[280px] resize-none p-3 bg-transparent text-transparent caret-foreground outline-none z-10"
                    spellCheck={false}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-base">📤 Netije</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {isHtml ? (
                  <div className="rounded-lg border border-border overflow-hidden bg-white">
                    <iframe ref={iframeRef} title="Preview" className="w-full min-h-[280px] border-0" sandbox="allow-scripts" />
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-lg p-3 min-h-[200px] font-mono text-xs">
                    {output.length === 0 ? (
                      <p className="text-muted-foreground">Netije şu ýerde görkeziler...</p>
                    ) : (
                      <div className="space-y-0.5">
                        {output.map((line, i) => (
                          <div key={i} className={line.startsWith("Ýalňyşlyk") ? "text-destructive" : "text-foreground"}>
                            <span className="text-muted-foreground mr-2">›</span>{line}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            {currentIndex > 0 ? (
              <Button variant="outline" onClick={() => goTo(currentIndex - 1)}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Öňki
              </Button>
            ) : <div />}
            {currentIndex + 1 < moduleHomeworks.length ? (
              <Button onClick={() => goTo(currentIndex + 1)} disabled={!hwDone}>
                {!hwDone && <Lock className="h-4 w-4 mr-2" />}
                Indiki
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={() => navigate("/homework")}>
                Öý işlere gaýt <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homework;
