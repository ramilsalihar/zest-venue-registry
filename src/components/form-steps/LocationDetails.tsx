import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { VenueFormData } from "../VenueRegistrationForm";

interface LocationDetailsProps {
  formData: VenueFormData;
  updateFormData: (data: Partial<VenueFormData>) => void;
}

export default function LocationDetails({ formData, updateFormData }: LocationDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-foreground">Location Details</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="address" className="text-foreground font-medium">
            Street Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="address"
            placeholder="Enter street address"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            className="mt-2"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city" className="text-foreground font-medium">
              City <span className="text-destructive">*</span>
            </Label>
            <Input
              id="city"
              placeholder="City"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="state" className="text-foreground font-medium">
              State <span className="text-destructive">*</span>
            </Label>
            <Input
              id="state"
              placeholder="State"
              value={formData.state}
              onChange={(e) => updateFormData({ state: e.target.value })}
              className="mt-2"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="zipCode" className="text-foreground font-medium">
              ZIP Code <span className="text-destructive">*</span>
            </Label>
            <Input
              id="zipCode"
              placeholder="ZIP Code"
              value={formData.zipCode}
              onChange={(e) => updateFormData({ zipCode: e.target.value })}
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="landmark" className="text-foreground font-medium">
              Nearby Landmark
            </Label>
            <Input
              id="landmark"
              placeholder="e.g., Near City Mall"
              value={formData.landmark}
              onChange={(e) => updateFormData({ landmark: e.target.value })}
              className="mt-2"
            />
          </div>
        </div>

        {/* Map Placeholder */}
        <Card className="p-8 bg-muted/30 border-dashed">
          <div className="text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold mb-2">Interactive Map</h4>
            <p className="text-sm text-muted-foreground">
              Map integration will be available once connected to backend services.
              Your venue location will be displayed here for easy navigation.
            </p>
          </div>
        </Card>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> Accurate location details help couples find your venue easily. 
          We'll use this information to show your venue on our interactive map.
        </p>
      </div>
    </div>
  );
}