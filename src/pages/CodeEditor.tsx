import { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, RotateCcw, Copy } from "lucide-react";
import { toast } from "sonner";

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
    { type: "operator", regex: /[+\-*/%=<>!&|^~?:]+|\.{3}/g },
    { type: "punctuation", regex: /[{}()\[\];,.]/g },
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

  let result = "", pos = 0;
  for (const token of filtered) {
    if (token.start > pos) result += escapeHtml(code.slice(pos, token.start));
    result += `<span class="token-${token.type}">${escapeHtml(token.text)}</span>`;
    pos = token.end;
  }
  if (pos < code.length) result += escapeHtml(code.slice(pos));
  return result + "\n";
}

const defaultJS = `// Salam TürkmenCode!

function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}

console.log(hasDuplicates([1, 2, 3])); // false
console.log(hasDuplicates([1, 2, 2])); // true`;

const defaultHTML = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #667eea, #764ba2);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .card {
      background: rgba(255,255,255,0.15);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 40px;
      text-align: center;
    }
    h1 { font-size: 32px; margin-bottom: 10px; }
    p { font-size: 18px; opacity: 0.9; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Salam, TürkmenCode! 🚀</h1>
    <p>HTML we CSS bilen web sahypa dörediň</p>
  </div>
</body>
</html>`;

type EditorMode = "javascript" | "html";

const CodeEditor = () => {
  const [mode, setMode] = useState<EditorMode>("javascript");
  const [jsCode, setJsCode] = useState(defaultJS);
  const [htmlCode, setHtmlCode] = useState(defaultHTML);
  const [output, setOutput] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const code = mode === "javascript" ? jsCode : htmlCode;
  const setCode = mode === "javascript" ? setJsCode : setHtmlCode;

  const syncScroll = useCallback(() => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  const runCode = () => {
    if (mode === "html") {
      if (iframeRef.current) {
        const doc = iframeRef.current.contentDocument;
        if (doc) { doc.open(); doc.write(htmlCode); doc.close(); }
      }
      toast.success("HTML görkezildi");
    } else {
      const looksLikeHtml = /^\s*</.test(jsCode) && /<\/?[a-z][\s\S]*>/i.test(jsCode);

      if (looksLikeHtml) {
        setHtmlCode(jsCode);
        setMode("html");
        setOutput([]);

        setTimeout(() => {
          if (iframeRef.current) {
            const doc = iframeRef.current.contentDocument;
            if (doc) {
              doc.open();
              doc.write(jsCode);
              doc.close();
            }
          }
        }, 0);

        toast.info("HTML/CSS kody tapyldy — HTML režime geçirildi");
        return;
      }

      const logs: string[] = [];
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      
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
      console.warn = (...args: any[]) => {
        logs.push("Duýduryş: " + args.map(String).join(" "));
      };
      
      try {
        const fn = new Function(jsCode);
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
        console.warn = originalWarn;
      }
    }
  };

  const resetCode = () => {
    if (mode === "javascript") setJsCode(defaultJS);
    else setHtmlCode(defaultHTML);
    setOutput([]);
    toast.info("Kod täzeden başladyldy");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Kod göçürildi");
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-6 animate-slide-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-1">Kod Editöri</h1>
              <p className="text-muted-foreground text-lg">Koduňyzy ýazyň we synap görüň</p>
            </div>
            <Tabs value={mode} onValueChange={(v) => setMode(v as EditorMode)}>
              <TabsList>
                <TabsTrigger value="javascript">🟨 JavaScript</TabsTrigger>
                <TabsTrigger value="html">🌐 HTML / CSS</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <span className="text-lg">📝</span>
                  Editor
                </CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={copyCode}><Copy className="h-4 w-4" /></Button>
                  <Button size="sm" variant="outline" onClick={resetCode}><RotateCcw className="h-4 w-4" /></Button>
                  <Button size="sm" onClick={runCode} className="gap-1"><Play className="h-4 w-4" />Ýerine ýetir</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg border border-border overflow-hidden bg-muted/50">
                  <pre ref={highlightRef} className="absolute inset-0 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words overflow-auto pointer-events-none m-0" aria-hidden="true">
                    <code dangerouslySetInnerHTML={{ __html: tokenize(code) }} />
                  </pre>
                  <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onScroll={syncScroll}
                    className="relative w-full font-mono text-sm leading-relaxed min-h-[500px] resize-none p-4 bg-transparent text-transparent caret-foreground outline-none z-10"
                    spellCheck={false}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-lg">📤</span>
                  Netije
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mode === "html" ? (
                  <div className="rounded-lg border border-border overflow-hidden bg-white">
                    <iframe ref={iframeRef} title="HTML Preview" className="w-full min-h-[500px] border-0" sandbox="allow-scripts allow-same-origin" />
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-lg p-4 min-h-[500px] font-mono text-sm">
                    {output.length === 0 ? (
                      <p className="text-muted-foreground">Netije şu ýerde görkeziler...</p>
                    ) : (
                      <div className="space-y-1">
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
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
