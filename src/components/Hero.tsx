import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import zestLogo from "@/assets/zest-logo.png";

interface HeroProps {
  onRegisterClick: () => void;
}

export default function Hero({ onRegisterClick }: HeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-radial">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-celebration-orange rounded-full opacity-20 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-gold rounded-full opacity-20 blur-3xl animate-float-delayed"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          <img 
            src={zestLogo} 
            alt="Zest Events" 
            className="w-32 h-32 mx-auto mb-8 animate-glow"
          />
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Partner with Zest Events
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            Join our exclusive network of premium venues for weddings and cultural celebrations
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with thousands of families looking for the perfect venue to celebrate life's most precious moments
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={onRegisterClick}
              className="text-lg px-8 py-6 h-auto"
            >
              Register Your Venue
              <ArrowRight className="ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 h-auto"
            >
              Learn More
              <Sparkles className="ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="bg-card p-6 rounded-lg shadow-card backdrop-blur-sm">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Registered Venues</div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-card backdrop-blur-sm">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Happy Celebrations</div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-card backdrop-blur-sm">
              <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}