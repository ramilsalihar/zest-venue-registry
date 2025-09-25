import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Mail, Phone, Calendar, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface ConfirmationScreenProps {
  onBackToHome: () => void;
}

export default function ConfirmationScreen({ onBackToHome }: ConfirmationScreenProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const colors = ['#FF6B35', '#FFA500', '#FFD700', '#008B8B'];

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2
        },
        colors: colors
      });

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2
        },
        colors: colors
      });
    }, 250);

    // Show content with animation
    setTimeout(() => setShowContent(true), 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className={`p-8 md:p-12 text-center shadow-2xl transition-all duration-1000 ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6 animate-glow" />
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Congratulations!
          </h1>
          
          <p className="text-xl text-foreground mb-8">
            Your venue registration has been successfully submitted
          </p>

          <div className="bg-muted/30 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-lg mb-4">What happens next?</h3>
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Email Confirmation</p>
                  <p className="text-sm text-muted-foreground">You'll receive a confirmation email within 5 minutes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Verification Call</p>
                  <p className="text-sm text-muted-foreground">Our team will contact you within 24-48 hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Venue Visit</p>
                  <p className="text-sm text-muted-foreground">We'll schedule a visit to complete the onboarding</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-primary text-primary-foreground rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-lg mb-2">Your Registration ID</h3>
            <p className="text-2xl font-mono font-bold">ZE-{Date.now().toString().slice(-8)}</p>
            <p className="text-sm mt-2 opacity-90">Please save this for future reference</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="lg"
              onClick={onBackToHome}
              className="min-w-[200px]"
            >
              Back to Home
              <ArrowRight className="ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px]"
            >
              Download Details
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}