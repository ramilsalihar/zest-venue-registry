import { Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function FeaturedEvents() {
  const events = [
    {
      id: 1,
      title: "Грандиозная Свадебная Выставка",
      date: "15 Марта 2025",
      location: "Москва, Крокус Экспо",
      attendees: "5000+",
      category: "Свадьба",
      description: "Крупнейшая свадебная выставка с участием лучших площадок и поставщиков услуг",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Фестиваль Культурных Традиций",
      date: "22 Апреля 2025",
      location: "Санкт-Петербург, Экспофорум",
      attendees: "3000+",
      category: "Культура",
      description: "Уникальное мероприятие, объединяющее традиции разных культур",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Корпоративный Саммит",
      date: "10 Мая 2025",
      location: "Казань, Казань Экспо",
      attendees: "1500+",
      category: "Корпоратив",
      description: "Встреча лидеров индустрии событий и корпоративных заказчиков",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&h=300&fit=crop"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-primary">Предстоящие События</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Присоединяйтесь к нашим эксклюзивным мероприятиям и расширяйте свою сеть контактов
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <Badge variant="secondary">{event.category}</Badge>
              </div>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="w-4 h-4 mr-2" />
                  {event.attendees} участников
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={() => window.location.href = '/event-registration'}
              >
                Зарегистрироваться
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          Посмотреть Все События
        </Button>
      </div>
    </div>
  );
}