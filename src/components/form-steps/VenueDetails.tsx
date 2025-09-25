import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VenueFormData } from "../VenueRegistrationForm";

interface VenueDetailsProps {
  formData: VenueFormData;
  updateFormData: (data: Partial<VenueFormData>) => void;
}

export default function VenueDetails({ formData, updateFormData }: VenueDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-foreground">Tell us about your venue</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="venueName" className="text-foreground font-medium">
            Venue Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="venueName"
            placeholder="Enter your venue name"
            value={formData.venueName}
            onChange={(e) => updateFormData({ venueName: e.target.value })}
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="venueType" className="text-foreground font-medium">
            Venue Type <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.venueType}
            onValueChange={(value) => updateFormData({ venueType: value })}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select venue type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="banquet-hall">Banquet Hall</SelectItem>
              <SelectItem value="hotel">Hotel</SelectItem>
              <SelectItem value="resort">Resort</SelectItem>
              <SelectItem value="farmhouse">Farmhouse</SelectItem>
              <SelectItem value="garden">Garden/Outdoor</SelectItem>
              <SelectItem value="convention-center">Convention Center</SelectItem>
              <SelectItem value="heritage">Heritage Property</SelectItem>
              <SelectItem value="beach">Beach Venue</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description" className="text-foreground font-medium">
            Venue Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="description"
            placeholder="Describe your venue, its unique features, and what makes it special for celebrations"
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            className="mt-2 min-h-[120px]"
            required
          />
        </div>

        <div>
          <Label htmlFor="yearEstablished" className="text-foreground font-medium">
            Year Established
          </Label>
          <Input
            id="yearEstablished"
            type="number"
            placeholder="e.g., 2010"
            value={formData.yearEstablished}
            onChange={(e) => updateFormData({ yearEstablished: e.target.value })}
            className="mt-2"
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Tip:</strong> A detailed description helps couples understand what makes your venue special. 
          Mention any unique architectural features, scenic views, or special services you offer.
        </p>
      </div>
    </div>
  );
}