import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import VenueDetails from "./form-steps/VenueDetails";
import LocationDetails from "./form-steps/LocationDetails";
import FacilitiesAmenities from "./form-steps/FacilitiesAmenities";
import PricingPackages from "./form-steps/PricingPackages";
import PhotoUpload from "./form-steps/PhotoUpload";
import ContactInfo from "./form-steps/ContactInfo";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface VenueFormData {
  // Venue Details
  venueName: string;
  venueType: string;
  description: string;
  yearEstablished: string;
  
  // Location
  address: string;
  city: string;
  state: string;
  zipCode: string;
  landmark: string;
  latitude?: number;
  longitude?: number;
  
  // Capacity & Facilities
  minCapacity: string;
  maxCapacity: string;
  indoorArea: string;
  outdoorArea: string;
  facilities: string[];
  amenities: string[];
  
  // Pricing
  priceRange: string;
  startingPrice: string;
  priceIncludes: string;
  additionalServices: string;
  
  // Photos
  photos: File[];
  
  // Contact
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  alternatePhone: string;
  preferredContactTime: string;
  website: string;
}

interface VenueRegistrationFormProps {
  onSubmitSuccess: () => void;
}

export default function VenueRegistrationForm({ onSubmitSuccess }: VenueRegistrationFormProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  
  const [formData, setFormData] = useState<VenueFormData>({
    venueName: "",
    venueType: "",
    description: "",
    yearEstablished: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    landmark: "",
    minCapacity: "",
    maxCapacity: "",
    indoorArea: "",
    outdoorArea: "",
    facilities: [],
    amenities: [],
    priceRange: "",
    startingPrice: "",
    priceIncludes: "",
    additionalServices: "",
    photos: [],
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    alternatePhone: "",
    preferredContactTime: "",
    website: "",
  });

  const updateFormData = (data: Partial<VenueFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    // Here you would normally submit to a backend
    toast({
      title: "Registration Submitted!",
      description: "We'll review your venue details and contact you within 24-48 hours.",
    });
    
    // For now, just call the success callback
    setTimeout(() => {
      onSubmitSuccess();
    }, 1500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <VenueDetails formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <LocationDetails formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <FacilitiesAmenities formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <PricingPackages formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <PhotoUpload formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <ContactInfo formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  const stepTitles = [
    "Venue Details",
    "Location",
    "Facilities",
    "Pricing",
    "Photos",
    "Contact Info"
  ];

  return (
    <section id="registration-form" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Register Your Venue</h2>
          <p className="text-lg text-muted-foreground">Complete the form below to join our network</p>
        </div>

        <Card className="p-8 shadow-xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-primary">Step {currentStep} of {totalSteps}</span>
              <span className="text-muted-foreground">{stepTitles[currentStep - 1]}</span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          </div>

          {/* Form Content */}
          <div className="min-h-[400px] animate-fade-in">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="min-w-[120px]"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentStep === totalSteps ? (
              <Button
                variant="hero"
                onClick={handleSubmit}
                className="min-w-[120px]"
              >
                Submit Registration
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={handleNext}
                className="min-w-[120px]"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}