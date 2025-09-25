import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VenueFormData } from "../VenueRegistrationForm";

interface ContactInfoProps {
  formData: VenueFormData;
  updateFormData: (data: Partial<VenueFormData>) => void;
}

export default function ContactInfo({ formData, updateFormData }: ContactInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-foreground">Contact Information</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="contactName" className="text-foreground font-medium">
            Contact Person Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contactName"
            placeholder="Full name"
            value={formData.contactName}
            onChange={(e) => updateFormData({ contactName: e.target.value })}
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="contactEmail" className="text-foreground font-medium">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contactEmail"
            type="email"
            placeholder="email@example.com"
            value={formData.contactEmail}
            onChange={(e) => updateFormData({ contactEmail: e.target.value })}
            className="mt-2"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactPhone" className="text-foreground font-medium">
              Primary Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contactPhone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.contactPhone}
              onChange={(e) => updateFormData({ contactPhone: e.target.value })}
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="alternatePhone" className="text-foreground font-medium">
              Alternate Phone
            </Label>
            <Input
              id="alternatePhone"
              type="tel"
              placeholder="+1 (555) 987-6543"
              value={formData.alternatePhone}
              onChange={(e) => updateFormData({ alternatePhone: e.target.value })}
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="preferredContactTime" className="text-foreground font-medium">
            Preferred Contact Time
          </Label>
          <Select
            value={formData.preferredContactTime}
            onValueChange={(value) => updateFormData({ preferredContactTime: value })}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select preferred time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
              <SelectItem value="evening">Evening (4 PM - 8 PM)</SelectItem>
              <SelectItem value="anytime">Anytime</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="website" className="text-foreground font-medium">
            Website (if any)
          </Label>
          <Input
            id="website"
            type="url"
            placeholder="https://www.example.com"
            value={formData.website}
            onChange={(e) => updateFormData({ website: e.target.value })}
            className="mt-2"
          />
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Important:</strong> We'll use this information to contact you about your registration 
          and send you booking inquiries. Please ensure all details are accurate.
        </p>
      </div>
    </div>
  );
}