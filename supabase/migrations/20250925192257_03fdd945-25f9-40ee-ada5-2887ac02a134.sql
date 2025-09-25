-- Create venues table
CREATE TABLE public.venues (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  venue_name TEXT NOT NULL,
  venue_type TEXT NOT NULL,
  description TEXT,
  year_established INTEGER,
  
  -- Location details
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  landmark TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Capacity & Facilities
  min_capacity INTEGER,
  max_capacity INTEGER,
  indoor_area INTEGER,
  outdoor_area INTEGER,
  facilities TEXT[],
  amenities TEXT[],
  
  -- Pricing
  price_range TEXT,
  starting_price DECIMAL(10, 2),
  price_includes TEXT,
  additional_services TEXT,
  
  -- Contact
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  alternate_phone TEXT,
  preferred_contact_time TEXT,
  website TEXT,
  
  -- Metadata
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for approved venues)
CREATE POLICY "Approved venues are viewable by everyone" 
ON public.venues 
FOR SELECT 
USING (status = 'approved');

-- Create policy for inserting new venues (anyone can register)
CREATE POLICY "Anyone can register a venue" 
ON public.venues 
FOR INSERT 
WITH CHECK (true);

-- Create venue_photos table
CREATE TABLE public.venue_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  venue_id UUID NOT NULL REFERENCES public.venues(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for photos
ALTER TABLE public.venue_photos ENABLE ROW LEVEL SECURITY;

-- Photos are viewable if the venue is approved
CREATE POLICY "Photos viewable for approved venues" 
ON public.venue_photos 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.venues 
    WHERE public.venues.id = venue_photos.venue_id 
    AND public.venues.status = 'approved'
  )
);

-- Anyone can upload photos for venues
CREATE POLICY "Anyone can upload venue photos" 
ON public.venue_photos 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_venues_updated_at
BEFORE UPDATE ON public.venues
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample venue data
INSERT INTO public.venues (
  venue_name, venue_type, description, year_established,
  address, city, state, zip_code, landmark,
  min_capacity, max_capacity, indoor_area, outdoor_area,
  facilities, amenities,
  price_range, starting_price, price_includes, additional_services,
  contact_name, contact_email, contact_phone, preferred_contact_time,
  website, status
) VALUES 
(
  'The Grand Ballroom', 'Banquet Hall', 
  'Elegant ballroom with crystal chandeliers and modern amenities. Perfect for weddings, corporate events, and grand celebrations.',
  2010,
  '123 Main Street', 'Mumbai', 'Maharashtra', '400001', 'Near Gateway of India',
  50, 500, 5000, 2000,
  ARRAY['Parking', 'Valet Service', 'Kitchen', 'Bar', 'Stage'],
  ARRAY['Wi-Fi', 'Audio System', 'Projector', 'Dance Floor', 'Bridal Suite'],
  '₹50,000 - ₹2,00,000', 50000,
  'Basic decoration, sound system, and lighting',
  'Catering, DJ services, photography, floral arrangements',
  'Rajesh Kumar', 'rajesh@grandballroom.com', '+91 98765 43210',
  'Morning (9 AM - 12 PM)', 'www.grandballroom.com', 'approved'
),
(
  'Garden Vista Resort', 'Resort', 
  'Sprawling resort with lush gardens and multiple event spaces. Ideal for destination weddings and multi-day celebrations.',
  2015,
  '456 Park Road', 'Pune', 'Maharashtra', '411001', 'Near Aga Khan Palace',
  100, 1000, 8000, 15000,
  ARRAY['Parking', 'Multiple Halls', 'Kitchen', 'Swimming Pool', 'Accommodation'],
  ARRAY['Wi-Fi', 'Spa', 'Game Zone', 'Outdoor Stage', 'Helipad'],
  '₹1,00,000 - ₹5,00,000', 100000,
  'Venue rental, basic decoration, and standard amenities',
  'Full-service catering, accommodation packages, spa services',
  'Priya Sharma', 'priya@gardenvista.com', '+91 98765 43211',
  'Evening (5 PM - 8 PM)', 'www.gardenvista.com', 'approved'
),
(
  'Heritage Palace', 'Heritage Property', 
  'A 200-year-old palace converted into a luxury event venue. Experience royal grandeur with modern comforts.',
  1824,
  '789 Palace Road', 'Jaipur', 'Rajasthan', '302001', 'Near City Palace',
  75, 300, 10000, 20000,
  ARRAY['Parking', 'Royal Dining Hall', 'Courtyard', 'Museum', 'Heritage Rooms'],
  ARRAY['Traditional Decor', 'Folk Performances', 'Royal Cuisine', 'Elephant Rides', 'Vintage Car Service'],
  '₹2,00,000 - ₹10,00,000', 200000,
  'Heritage venue, traditional welcome, basic royal decoration',
  'Royal catering, cultural programs, luxury accommodation',
  'Maharaj Singh', 'info@heritagepalace.com', '+91 98765 43212',
  'Afternoon (2 PM - 5 PM)', 'www.heritagepalace.com', 'approved'
),
(
  'Beachside Pavilion', 'Beach Venue', 
  'Stunning beachfront property with panoramic ocean views. Perfect for intimate beach weddings and sunset ceremonies.',
  2018,
  '321 Coastal Road', 'Goa', 'Goa', '403001', 'Near Calangute Beach',
  25, 200, 3000, 5000,
  ARRAY['Beach Access', 'Parking', 'Bar', 'Changing Rooms', 'Gazebo'],
  ARRAY['Beach Decor', 'Bonfire Setup', 'Water Sports', 'Live Music', 'Sunset View'],
  '₹75,000 - ₹3,00,000', 75000,
  'Beach setup, basic tropical decoration, sound system',
  'Seafood catering, beach activities, photography, fireworks',
  'Carlos D''Souza', 'carlos@beachsidepavilion.com', '+91 98765 43213',
  'Morning (9 AM - 12 PM)', 'www.beachsidepavilion.com', 'approved'
);

-- Create storage bucket for venue photos
INSERT INTO storage.buckets (id, name, public) VALUES ('venue-photos', 'venue-photos', true);

-- Create storage policies
CREATE POLICY "Public can view venue photos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'venue-photos');

CREATE POLICY "Anyone can upload venue photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'venue-photos');