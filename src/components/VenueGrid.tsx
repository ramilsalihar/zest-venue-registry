import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Building, Trees, Phone, Mail, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Venue {
  id: string;
  venue_name: string;
  venue_type: string;
  description: string;
  city: string;
  state: string;
  min_capacity: number | null;
  max_capacity: number | null;
  indoor_area: number | null;
  outdoor_area: number | null;
  starting_price: number | null;
  price_range: string | null;
  contact_phone: string;
  contact_email: string;
  website: string | null;
  venue_photos?: { photo_url: string; is_primary: boolean }[];
}

export default function VenueGrid() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const { data, error } = await supabase
        .from('venues')
        .select(`
          *,
          venue_photos (
            photo_url,
            is_primary
          )
        `)
        .eq('status', 'approved')
        .limit(6);

      if (error) throw error;
      setVenues(data || []);
    } catch (error) {
      console.error('Error fetching venues:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPrimaryPhoto = (venue: Venue) => {
    const primaryPhoto = venue.venue_photos?.find(p => p.is_primary);
    return primaryPhoto?.photo_url || venue.venue_photos?.[0]?.photo_url || '/placeholder.svg';
  };

  if (loading) {
    return (
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Избранные Площадки</h2>
            <p className="text-lg text-muted-foreground">Откройте для себя наши премиальные площадки для мероприятий</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (venues.length === 0) {
    return (
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Избранные Площадки</h2>
            <p className="text-lg text-muted-foreground mb-8">На данный момент площадки недоступны</p>
            <p className="text-muted-foreground">Пожалуйста, проверьте позже или зарегистрируйте свою площадку!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Избранные Площадки</h2>
          <p className="text-lg text-muted-foreground">Откройте для себя наши премиальные площадки для мероприятий</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden bg-muted">
                <img 
                  src={getPrimaryPhoto(venue)} 
                  alt={venue.venue_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{venue.venue_name}</CardTitle>
                  <Badge variant="secondary">{venue.venue_type}</Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {venue.city}, {venue.state}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {venue.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {venue.description}
                  </p>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {venue.max_capacity && (
                    <Badge variant="outline" className="text-xs">
                      <Users className="h-3 w-3 mr-1" />
                      До {venue.max_capacity} гостей
                    </Badge>
                  )}
                  {venue.indoor_area && (
                    <Badge variant="outline" className="text-xs">
                      <Building className="h-3 w-3 mr-1" />
                      {venue.indoor_area} кв. фт
                    </Badge>
                  )}
                  {venue.outdoor_area && venue.outdoor_area > 0 && (
                    <Badge variant="outline" className="text-xs">
                      <Trees className="h-3 w-3 mr-1" />
                      Открытая площадка
                    </Badge>
                  )}
                </div>

                {venue.starting_price && (
                  <div className="pt-2 border-t">
                    <p className="text-sm font-semibold text-primary">
                      От ₹{venue.starting_price.toLocaleString()}
                    </p>
                    {venue.price_range && (
                      <p className="text-xs text-muted-foreground">{venue.price_range}</p>
                    )}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  {venue.contact_phone && (
                    <a 
                      href={`tel:${venue.contact_phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Call venue"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  )}
                  {venue.contact_email && (
                    <a 
                      href={`mailto:${venue.contact_email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Email venue"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                  {venue.website && (
                    <a 
                      href={venue.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Visit website"
                    >
                      <Globe className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}