import { useState } from "react";
import VenueRegistrationForm from "@/components/VenueRegistrationForm";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VenueRegistration = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleSubmitSuccess = () => {
    setShowConfirmation(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (showConfirmation) {
    return <ConfirmationScreen onBackToHome={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" />
          Назад на главную
        </Button>
        
        <VenueRegistrationForm onSubmitSuccess={handleSubmitSuccess} />
      </div>
    </div>
  );
};

export default VenueRegistration;