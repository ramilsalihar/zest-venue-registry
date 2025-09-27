import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroVenue from "@/assets/hero-venue.jpg";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Hero Background Image - More visible */}
      <div className="absolute inset-0">
        <img 
          src={heroVenue} 
          alt="Luxury wedding venue" 
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-primary/15 to-background/70"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-celebration-orange/20 to-background/50"></div>
      </div>
      
      {/* Decorative overlay elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-celebration-orange rounded-full opacity-25 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-gold rounded-full opacity-25 blur-3xl animate-float-delayed"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Сотрудничайте с Zest Events
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            Присоединяйтесь к нашей эксклюзивной сети премиальных площадок для свадеб и культурных торжеств
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Свяжитесь с тысячами семей, ищущих идеальное место для празднования самых драгоценных моментов жизни
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => navigate('/venue-registration')}
              className="text-lg px-8 py-6 h-auto"
            >
              Зарегистрировать Площадку
              <ArrowRight className="ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 h-auto"
            >
              Узнать Больше
              <Sparkles className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}