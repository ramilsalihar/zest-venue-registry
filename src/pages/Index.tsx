import Hero from "@/components/Hero";
import VenueGrid from "@/components/VenueGrid";
import FeaturedEvents from "@/components/FeaturedEvents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <Tabs defaultValue="venues" className="container mx-auto px-4 py-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="venues">Площадки</TabsTrigger>
          <TabsTrigger value="events">События</TabsTrigger>
        </TabsList>
        
        <TabsContent value="venues">
          <VenueGrid />
        </TabsContent>
        
        <TabsContent value="events">
          <FeaturedEvents />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
