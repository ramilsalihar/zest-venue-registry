import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { VenueFormData } from "../VenueRegistrationForm";

interface PhotoUploadProps {
  formData: VenueFormData;
  updateFormData: (data: Partial<VenueFormData>) => void;
}

export default function PhotoUpload({ formData, updateFormData }: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    const updatedPhotos = [...formData.photos, ...newFiles].slice(0, 10); // Limit to 10 photos
    
    // Create previews
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string].slice(0, 10));
      };
      reader.readAsDataURL(file);
    });

    updateFormData({ photos: updatedPhotos });
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = formData.photos.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    updateFormData({ photos: updatedPhotos });
    setPreviews(updatedPreviews);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-foreground">Venue Photos</h3>
        <p className="text-muted-foreground">Upload up to 10 high-quality photos of your venue</p>
      </div>

      <div className="space-y-4">
        <Label className="text-foreground font-medium">
          Upload Photos <span className="text-destructive">*</span>
        </Label>

        {/* Upload Area */}
        <div
          className={`relative ${dragActive ? 'border-primary bg-primary/5' : 'border-border'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="photo-upload"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          <label
            htmlFor="photo-upload"
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
              dragActive ? 'border-primary bg-primary/5' : 'border-border'
            }`}
          >
            <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
            <p className="text-sm text-center text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, WEBP up to 10MB each
            </p>
          </label>
        </div>

        {/* Photo Previews */}
        {previews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <Card key={index} className="relative group overflow-hidden">
                <img
                  src={preview}
                  alt={`Venue photo ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              </Card>
            ))}
          </div>
        )}

        {/* Photo Guidelines */}
        <Card className="p-4 bg-muted/30">
          <div className="flex items-start space-x-3">
            <ImageIcon className="w-5 h-5 text-primary mt-0.5" />
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Photo Guidelines:</p>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Include exterior and interior views</li>
                <li>Show different areas (hall, stage, dining, etc.)</li>
                <li>Use high-resolution images (minimum 1920x1080)</li>
                <li>Ensure good lighting and clear images</li>
                <li>Include photos from actual events if available</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div className="text-sm text-muted-foreground">
        {formData.photos.length} of 10 photos uploaded
      </div>
    </div>
  );
}