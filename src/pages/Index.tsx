import { useState, useRef } from "react";
import Hero from "@/components/Hero";
import VenueRegistrationForm from "@/components/VenueRegistrationForm";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import VenueGrid from "@/components/VenueGrid";

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
      <VenueGrid />
      <div ref={formRef}>
        <VenueRegistrationForm onSubmitSuccess={handleSubmitSuccess} />
      </div>
    </div>
  );
};

export default Index;
