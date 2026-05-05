import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import { Code2, BookOpen, Trophy, Users, Zap, Target } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Code2,
      title: "Interaktiw Sapaklar",
      description: "Her sapakda amaly kodyň bilen öwren we synap gör",
      gradient: "primary" as const,
    },
    {
      icon: BookOpen,
      title: "Giň Mazmun",
      description: "JavaScript, HTML, CSS we köp başga tehnologiýalar",
      gradient: "accent" as const,
    },
    {
      icon: Trophy,
      title: "Reýting Ulgamy",
      description: "Beýleki öwrenijiler bilen bäsleşiň we öňe geçiň",
      gradient: "primary" as const,
    },
    {
      icon: Users,
      title: "Jemgyýet",
      description: "Müňlerçe öwreniji bilen bilelikde öwreniň",
      gradient: "accent" as const,
    },
    {
      icon: Zap,
      title: "Çalt Öwrenme",
      description: "Öz depginizde öwreniň we çaltlyk sazlaň",
      gradient: "primary" as const,
    },
    {
      icon: Target,
      title: "Maksatlar we Ösüş",
      description: "Öz ösüşiňizi yzarlaň we maksatlara ýetişiň",
      gradient: "accent" as const,
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Näme üçin <span className="text-gradient">TürkmenCode?</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Programmirleme öwrenmek üçin iň oňat platforma. 
                Interaktiw sapaklar, amaly meseleler we köp başga...
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
