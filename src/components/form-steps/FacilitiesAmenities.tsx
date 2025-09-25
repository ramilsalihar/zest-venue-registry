import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { VenueFormData } from "../VenueRegistrationForm";

interface FacilitiesAmenitiesProps {
  formData: VenueFormData;
  updateFormData: (data: Partial<VenueFormData>) => void;
}

const facilitiesList = [
  "Air Conditioning",
  "Parking Space",
  "Valet Parking",
  "Power Backup",
  "DJ Setup",
  "Stage",
  "Dance Floor",
  "Bridal Room",
  "Green Room",
  "Kitchen Facility",
  "Bar Service",
  "Outdoor Space",
];

const amenitiesList = [
  "In-house Catering",
  "External Catering Allowed",
  "Decoration Services",
  "Sound System",
  "Projector & Screen",
  "WiFi",
  "Photography Services",
  "Accommodation",
  "Wheelchair Accessible",
  "Kids Play Area",
  "Security Services",
  "Event Planning Support",
];

export default function FacilitiesAmenities({ formData, updateFormData }: FacilitiesAmenitiesProps) {
  const handleFacilityChange = (facility: string, checked: boolean) => {
    const updatedFacilities = checked
      ? [...formData.facilities, facility]
      : formData.facilities.filter(f => f !== facility);
    updateFormData({ facilities: updatedFacilities });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const updatedAmenities = checked
      ? [...formData.amenities, amenity]
      : formData.amenities.filter(a => a !== amenity);
    updateFormData({ amenities: updatedAmenities });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-foreground">Capacity & Facilities</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="minCapacity" className="text-foreground font-medium">
              Minimum Capacity (Guests) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="minCapacity"
              type="number"
              placeholder="e.g., 50"
              value={formData.minCapacity}
              onChange={(e) => updateFormData({ minCapacity: e.target.value })}
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="maxCapacity" className="text-foreground font-medium">
              Maximum Capacity (Guests) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="maxCapacity"
              type="number"
              placeholder="e.g., 500"
              value={formData.maxCapacity}
              onChange={(e) => updateFormData({ maxCapacity: e.target.value })}
              className="mt-2"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="indoorArea" className="text-foreground font-medium">
              Indoor Area (sq. ft.)
            </Label>
            <Input
              id="indoorArea"
              placeholder="e.g., 5000"
              value={formData.indoorArea}
              onChange={(e) => updateFormData({ indoorArea: e.target.value })}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="outdoorArea" className="text-foreground font-medium">
              Outdoor Area (sq. ft.)
            </Label>
            <Input
              id="outdoorArea"
              placeholder="e.g., 10000"
              value={formData.outdoorArea}
              onChange={(e) => updateFormData({ outdoorArea: e.target.value })}
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <Label className="text-foreground font-medium mb-3 block">
            Available Facilities
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {facilitiesList.map((facility) => (
              <div key={facility} className="flex items-center space-x-2">
                <Checkbox
                  id={facility}
                  checked={formData.facilities.includes(facility)}
                  onCheckedChange={(checked) => handleFacilityChange(facility, checked as boolean)}
                />
                <Label
                  htmlFor={facility}
                  className="text-sm font-normal cursor-pointer"
                >
                  {facility}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-foreground font-medium mb-3 block">
            Amenities & Services
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {amenitiesList.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={formData.amenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                />
                <Label
                  htmlFor={amenity}
                  className="text-sm font-normal cursor-pointer"
                >
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}