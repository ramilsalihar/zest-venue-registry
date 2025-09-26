import { useState, useRef } from "react";
import Hero from "@/components/Hero";
import VenueRegistrationForm from "@/components/VenueRegistrationForm";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import VenueGrid from "@/components/VenueGrid";
import FeaturedEvents from "@/components/FeaturedEvents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitSuccess = () => {
    setShowConfirmation(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setShowConfirmation(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showConfirmation) {
    return <ConfirmationScreen onBackToHome={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen">
      <Hero onRegisterClick={scrollToForm} />
      
      <Tabs defaultValue="venues" className="container mx-auto px-4 py-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="venues">Площадки</TabsTrigger>
          <TabsTrigger value="events">События</TabsTrigger>
        </TabsList>
        
        <TabsContent value="venues">
          <VenueGrid />
        </TabsContent>
        
        <TabsContent value="events">
          <FeaturedEvents />
        </TabsContent>
      </Tabs>
      
      <div ref={formRef}>
        <VenueRegistrationForm onSubmitSuccess={handleSubmitSuccess} />
      </div>
    </div>
  );
};

export default Index;
