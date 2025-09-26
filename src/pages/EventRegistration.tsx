import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EventRegistration() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    eventType: "",
    participationType: "",
    dietaryRequirements: "",
    specialRequests: "",
    marketingConsent: false,
    termsAccepted: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, примите условия участия",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Here you would normally save to database
    // For now, just simulate success
    setTimeout(() => {
      toast({
        title: "Успешная регистрация!",
        description: "Мы отправили подтверждение на вашу электронную почту",
      });
      setLoading(false);
      navigate("/");
    }, 1500);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Вернуться на главную
        </Button>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">Регистрация на Мероприятие</h1>
            <p className="text-lg text-muted-foreground">
              Заполните форму для участия в мероприятиях Zest Events
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Информация об Участнике</CardTitle>
              <CardDescription>
                Пожалуйста, предоставьте ваши контактные данные
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Полное имя *</Label>
                    <Input
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => updateFormData("fullName", e.target.value)}
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Электронная почта *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="ivan@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Компания</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => updateFormData("company", e.target.value)}
                      placeholder="Название компании"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="position">Должность</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => updateFormData("position", e.target.value)}
                      placeholder="Менеджер по продажам"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventType">Тип мероприятия *</Label>
                    <Select 
                      value={formData.eventType}
                      onValueChange={(value) => updateFormData("eventType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Свадебная выставка</SelectItem>
                        <SelectItem value="cultural">Культурный фестиваль</SelectItem>
                        <SelectItem value="corporate">Корпоративный саммит</SelectItem>
                        <SelectItem value="networking">Нетворкинг</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Participation Type */}
                <div>
                  <Label>Тип участия *</Label>
                  <RadioGroup 
                    value={formData.participationType}
                    onValueChange={(value) => updateFormData("participationType", value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="visitor" id="visitor" />
                      <Label htmlFor="visitor">Посетитель</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="exhibitor" id="exhibitor" />
                      <Label htmlFor="exhibitor">Экспонент</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="speaker" id="speaker" />
                      <Label htmlFor="speaker">Спикер</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="partner" id="partner" />
                      <Label htmlFor="partner">Партнер</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Additional Information */}
                <div>
                  <Label htmlFor="dietaryRequirements">Диетические предпочтения</Label>
                  <Input
                    id="dietaryRequirements"
                    value={formData.dietaryRequirements}
                    onChange={(e) => updateFormData("dietaryRequirements", e.target.value)}
                    placeholder="Вегетарианец, без глютена и т.д."
                  />
                </div>

                <div>
                  <Label htmlFor="specialRequests">Особые пожелания</Label>
                  <Textarea
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={(e) => updateFormData("specialRequests", e.target.value)}
                    placeholder="Дополнительные комментарии или запросы"
                    rows={3}
                  />
                </div>

                {/* Consents */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketingConsent"
                      checked={formData.marketingConsent}
                      onCheckedChange={(checked) => updateFormData("marketingConsent", checked)}
                    />
                    <Label htmlFor="marketingConsent" className="text-sm">
                      Я согласен получать маркетинговые материалы от Zest Events
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="termsAccepted"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => updateFormData("termsAccepted", checked)}
                    />
                    <Label htmlFor="termsAccepted" className="text-sm">
                      Я принимаю условия участия и политику конфиденциальности *
                    </Label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Отправка..." : "Зарегистрироваться на Мероприятие"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}