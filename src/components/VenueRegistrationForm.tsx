import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { validateStep } from "@/lib/venue-validation";
import VenueDetails from "./form-steps/VenueDetails";
import LocationDetails from "./form-steps/LocationDetails";
import FacilitiesAmenities from "./form-steps/FacilitiesAmenities";
import PricingPackages from "./form-steps/PricingPackages";
import PhotoUpload from "./form-steps/PhotoUpload";
import ContactInfo from "./form-steps/ContactInfo";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
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
    // Clear validation errors when user makes changes
    setValidationErrors([]);
  };

  const handleNext = () => {
    const validation = validateStep(currentStep, formData);
    
    if (!validation.success) {
      const errors = 'error' in validation ? validation.error.issues.map(issue => issue.message) : ['Ошибка валидации'];
      setValidationErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setValidationErrors([]);
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setValidationErrors([]);
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    // Validate the last step
    const validation = validateStep(currentStep, formData);
    
    if (!validation.success) {
      const errors = 'error' in validation ? validation.error.issues.map(issue => issue.message) : ['Ошибка валидации'];
      setValidationErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setIsSubmitting(true);
    setValidationErrors([]);
    
    try {
      // Upload photos to storage first
      const photoUrls: string[] = [];
      if (formData.photos.length > 0) {
        for (const photo of formData.photos) {
          const fileExt = photo.name.split('.').pop();
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
          
          const { error: uploadError, data } = await supabase.storage
            .from('venue-photos')
            .upload(fileName, photo);
            
          if (uploadError) {
            console.error('Photo upload error:', uploadError);
            continue;
          }
          
          if (data) {
            const { data: { publicUrl } } = supabase.storage
              .from('venue-photos')
              .getPublicUrl(fileName);
            photoUrls.push(publicUrl);
          }
        }
      }
      
      // Insert venue data
      const { data: venue, error: venueError } = await supabase
        .from('venues')
        .insert({
          venue_name: formData.venueName,
          venue_type: formData.venueType,
          description: formData.description,
          year_established: formData.yearEstablished ? parseInt(formData.yearEstablished) : null,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          landmark: formData.landmark || null,
          min_capacity: formData.minCapacity ? parseInt(formData.minCapacity) : null,
          max_capacity: formData.maxCapacity ? parseInt(formData.maxCapacity) : null,
          indoor_area: formData.indoorArea ? parseInt(formData.indoorArea) : null,
          outdoor_area: formData.outdoorArea ? parseInt(formData.outdoorArea) : null,
          facilities: formData.facilities,
          amenities: formData.amenities,
          price_range: formData.priceRange,
          starting_price: formData.startingPrice ? parseFloat(formData.startingPrice) : null,
          price_includes: formData.priceIncludes,
          additional_services: formData.additionalServices || null,
          contact_name: formData.contactName,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          alternate_phone: formData.alternatePhone || null,
          preferred_contact_time: formData.preferredContactTime,
          website: formData.website || null
        })
        .select()
        .single();
        
      if (venueError) {
        throw venueError;
      }
      
      // Insert photo records
      if (venue && photoUrls.length > 0) {
        const photoRecords = photoUrls.map((url, index) => ({
          venue_id: venue.id,
          photo_url: url,
          is_primary: index === 0,
          display_order: index
        }));
        
        await supabase
          .from('venue_photos')
          .insert(photoRecords);
      }
      
      toast({
        title: "Регистрация успешно отправлена!",
        description: "Мы рассмотрим детали вашей площадки и свяжемся с вами в течение 24-48 часов.",
      });
      
      setTimeout(() => {
        onSubmitSuccess();
      }, 1500);
      
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Ошибка отправки",
        description: "Произошла ошибка при отправке вашей регистрации. Пожалуйста, попробуйте еще раз.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
    "Детали площадки",
    "Расположение",
    "Удобства и услуги",
    "Ценовая политика",
    "Фотографии",
    "Контактная информация"
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Регистрация площадки</h2>
          <p className="text-lg text-muted-foreground">
            Заполните все обязательные поля для регистрации вашей площадки в нашей системе
          </p>
        </div>

        <Card className="p-8 shadow-xl">
          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-primary">Шаг {currentStep} из {totalSteps}</span>
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
              Назад
            </Button>

            {currentStep === totalSteps ? (
              <Button
                variant="hero"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  'Отправить заявку'
                )}
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={handleNext}
                className="min-w-[120px]"
              >
                Далее
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}