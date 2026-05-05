import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Code, BookOpen, Trophy } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up">
            <div className="inline-block">
              <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                Made by - SopyyevNCO.PTD.LTD              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Kod ýaz,
              <br />
              <span className="text-gradient">ösdür we öwren</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl">
              TürkmenCode bilen programmirleme dünýäsine giriziliň. 
              JavaScript, HTML, CSS we beýleki progrramirleme dillerini interaktiw 
              görnüşde öwreniň.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/learn">
                <Button size="lg" className="gap-2 shadow-glow">
                  Başlamak
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/code">
                <Button size="lg" variant="outline" className="gap-2">
                  <Code className="h-5 w-5" />
                  Kody synap gör
                </Button>
              </Link>
            </div>

            <div className="flex gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-lg">50+</div>
                  <div className="text-sm text-muted-foreground">Sapak</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Code className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="font-bold text-lg">100+</div>
                  <div className="text-sm text-muted-foreground">Mesele</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-success" />
                </div>
                <div>
                  <div className="font-bold text-lg">5000+</div>
                  <div className="text-sm text-muted-foreground">Ulanyjy</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-2xl blur-2xl opacity-20" />
              <div className="relative bg-card border border-border rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                    <div className="w-3 h-3 rounded-full bg-success" />
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">app.js</span>
                </div>
                <pre className="font-mono text-sm">
                  <code className="text-foreground">
                    <span className="text-primary">function</span>{" "}
                    <span className="text-accent">salam</span>
                    <span className="text-muted-foreground">(</span>
                    <span className="text-[#f59e0b]">ad</span>
                    <span className="text-muted-foreground">)</span>{" "}
                    <span className="text-muted-foreground">{"{"}</span>
                    {"\n  "}
                    <span className="text-primary">return</span>{" "}
                    <span className="text-success">`Salam, $</span>
                    <span className="text-muted-foreground">{"{"}</span>
                    <span className="text-[#f59e0b]">ad</span>
                    <span className="text-muted-foreground">{"}"}</span>
                    <span className="text-success">!`</span>
                    <span className="text-muted-foreground">;</span>
                    {"\n"}
                    <span className="text-muted-foreground">{"}"}</span>
                    {"\n\n"}
                    <span className="text-muted-foreground">console</span>
                    <span className="text-primary">.</span>
                    <span className="text-accent">log</span>
                    <span className="text-muted-foreground">(</span>
                    <span className="text-accent">salam</span>
                    <span className="text-muted-foreground">(</span>
                    <span className="text-success">"Myrat"</span>
                    <span className="text-muted-foreground">));</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
