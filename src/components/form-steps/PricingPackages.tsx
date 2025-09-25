import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VenueFormData } from "../VenueRegistrationForm";

interface PricingPackagesProps {
  formData: VenueFormData;
  updateFormData: (data: Partial<VenueFormData>) => void;
}

export default function PricingPackages({ formData, updateFormData }: PricingPackagesProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-foreground">Pricing & Packages</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="priceRange" className="text-foreground font-medium">
            Price Range <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.priceRange}
            onValueChange={(value) => updateFormData({ priceRange: value })}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="budget">Budget (Under $5,000)</SelectItem>
              <SelectItem value="moderate">Moderate ($5,000 - $15,000)</SelectItem>
              <SelectItem value="premium">Premium ($15,000 - $30,000)</SelectItem>
              <SelectItem value="luxury">Luxury ($30,000+)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="startingPrice" className="text-foreground font-medium">
            Starting Price (per event) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="startingPrice"
            type="text"
            placeholder="e.g., $2,500"
            value={formData.startingPrice}
            onChange={(e) => updateFormData({ startingPrice: e.target.value })}
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="priceIncludes" className="text-foreground font-medium">
            What's Included in Base Price
          </Label>
          <Textarea
            id="priceIncludes"
            placeholder="e.g., Venue rental for 8 hours, basic lighting, sound system, parking for 50 cars"
            value={formData.priceIncludes}
            onChange={(e) => updateFormData({ priceIncludes: e.target.value })}
            className="mt-2 min-h-[100px]"
          />
        </div>

        <div>
          <Label htmlFor="additionalServices" className="text-foreground font-medium">
            Additional Services (with pricing if possible)
          </Label>
          <Textarea
            id="additionalServices"
            placeholder="e.g., Catering: $50-100 per person, Decoration: Starting from $1,000, DJ Services: $500"
            value={formData.additionalServices}
            onChange={(e) => updateFormData({ additionalServices: e.target.value })}
            className="mt-2 min-h-[100px]"
          />
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Tip:</strong> Transparent pricing helps couples make informed decisions. 
          Consider offering package deals for different event types (weddings, receptions, cultural events).
        </p>
      </div>
    </div>
  );
}