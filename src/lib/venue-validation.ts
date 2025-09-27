import { z } from "zod";

// Venue type options
export const VENUE_TYPES = [
  "Банкетные залы",
  "Гостиничные банкетные залы",
  "Банкетные залы ресторанов",
  "VIP-залы в ресторанах",
  "Открытые террасы",
  "Виллы / частные дома",
  "Рестораны в стиле сад",
  "Люкс / премиум площадки для мероприятий",
  "Конференц-залы",
  "Переговорные комнаты"
] as const;

export const venueFormSchema = z.object({
  // Venue Details - all required
  venueName: z.string()
    .trim()
    .min(3, "Название площадки должно содержать минимум 3 символа")
    .max(100, "Название площадки не должно превышать 100 символов"),
  
  venueType: z.string()
    .min(1, "Пожалуйста, выберите тип площадки")
    .refine(
      (val) => VENUE_TYPES.includes(val as any),
      "Пожалуйста, выберите корректный тип площадки"
    ),
  
  description: z.string()
    .trim()
    .min(50, "Описание должно содержать минимум 50 символов")
    .max(1000, "Описание не должно превышать 1000 символов"),
  
  yearEstablished: z.string()
    .regex(/^\d{4}$/, "Год должен состоять из 4 цифр")
    .refine(
      (val) => {
        const year = parseInt(val);
        const currentYear = new Date().getFullYear();
        return year >= 1900 && year <= currentYear;
      },
      {
        message: `Год должен быть между 1900 и ${new Date().getFullYear()}`
      }
    ),
  
  // Location - all required
  address: z.string()
    .trim()
    .min(5, "Адрес должен содержать минимум 5 символов")
    .max(200, "Адрес не должен превышать 200 символов"),
  
  city: z.string()
    .trim()
    .min(2, "Название города должно содержать минимум 2 символа")
    .max(50, "Название города не должно превышать 50 символов"),
  
  state: z.string()
    .trim()
    .min(2, "Название региона должно содержать минимум 2 символа")
    .max(50, "Название региона не должно превышать 50 символов"),
  
  zipCode: z.string()
    .regex(/^\d{5,6}$/, "Почтовый индекс должен содержать 5-6 цифр"),
  
  landmark: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  
  // Capacity & Facilities - required
  minCapacity: z.string()
    .regex(/^\d+$/, "Минимальная вместимость должна быть числом")
    .refine((val) => parseInt(val) > 0, "Минимальная вместимость должна быть больше 0")
    .refine((val) => parseInt(val) <= 10000, "Минимальная вместимость не может превышать 10000"),
  
  maxCapacity: z.string()
    .regex(/^\d+$/, "Максимальная вместимость должна быть числом")
    .refine((val) => parseInt(val) > 0, "Максимальная вместимость должна быть больше 0")
    .refine((val) => parseInt(val) <= 10000, "Максимальная вместимость не может превышать 10000"),
  
  indoorArea: z.string()
    .regex(/^\d*$/, "Площадь помещения должна быть числом")
    .optional()
    .transform(val => val || ""),
  
  outdoorArea: z.string()
    .regex(/^\d*$/, "Площадь открытой территории должна быть числом")
    .optional()
    .transform(val => val || ""),
  
  facilities: z.array(z.string())
    .min(1, "Выберите хотя бы одно удобство"),
  
  amenities: z.array(z.string())
    .min(1, "Выберите хотя бы одну услугу"),
  
  // Pricing - required
  priceRange: z.string()
    .min(1, "Пожалуйста, выберите ценовой диапазон"),
  
  startingPrice: z.string()
    .regex(/^\d+(\.\d{1,2})?$/, "Начальная цена должна быть числом")
    .refine((val) => parseFloat(val) > 0, "Начальная цена должна быть больше 0"),
  
  priceIncludes: z.string()
    .trim()
    .min(20, "Опишите, что включено в базовую цену (минимум 20 символов)")
    .max(500, "Описание не должно превышать 500 символов"),
  
  additionalServices: z.string()
    .trim()
    .optional(),
  
  // Photos - at least one required
  photos: z.array(z.instanceof(File))
    .min(1, "Загрузите хотя бы одну фотографию")
    .max(10, "Максимум 10 фотографий"),
  
  // Contact - all required
  contactName: z.string()
    .trim()
    .min(2, "Имя контактного лица должно содержать минимум 2 символа")
    .max(100, "Имя не должно превышать 100 символов"),
  
  contactEmail: z.string()
    .trim()
    .email("Введите корректный email адрес")
    .max(255, "Email не должен превышать 255 символов"),
  
  contactPhone: z.string()
    .regex(/^[\d\s\-\+\(\)]+$/, "Телефон может содержать только цифры, пробелы, +, -, ( и )")
    .min(10, "Телефон должен содержать минимум 10 цифр")
    .max(20, "Телефон не должен превышать 20 символов"),
  
  alternatePhone: z.string()
    .regex(/^[\d\s\-\+\(\)]*$/, "Телефон может содержать только цифры, пробелы, +, -, ( и )")
    .optional()
    .transform(val => val || ""),
  
  preferredContactTime: z.string()
    .min(1, "Пожалуйста, выберите предпочтительное время для связи"),
  
  website: z.string()
    .trim()
    .url("Введите корректный URL сайта")
    .optional()
    .or(z.literal(""))
    .transform(val => val || ""),
});

export type VenueFormSchema = z.infer<typeof venueFormSchema>;

// Validation for each step
export const validateStep = (step: number, data: any) => {
  switch (step) {
    case 1: // Venue Details
      return venueFormSchema.pick({
        venueName: true,
        venueType: true,
        description: true,
        yearEstablished: true,
      }).safeParse(data);
    
    case 2: // Location
      return venueFormSchema.pick({
        address: true,
        city: true,
        state: true,
        zipCode: true,
        landmark: true,
      }).safeParse(data);
    
    case 3: // Facilities
      return venueFormSchema.pick({
        minCapacity: true,
        maxCapacity: true,
        indoorArea: true,
        outdoorArea: true,
        facilities: true,
        amenities: true,
      }).refine(
        (data) => parseInt(data.maxCapacity) >= parseInt(data.minCapacity),
        {
          message: "Максимальная вместимость должна быть больше или равна минимальной",
          path: ["maxCapacity"],
        }
      ).safeParse(data);
    
    case 4: // Pricing
      return venueFormSchema.pick({
        priceRange: true,
        startingPrice: true,
        priceIncludes: true,
        additionalServices: true,
      }).safeParse(data);
    
    case 5: // Photos
      return venueFormSchema.pick({
        photos: true,
      }).safeParse(data);
    
    case 6: // Contact
      return venueFormSchema.pick({
        contactName: true,
        contactEmail: true,
        contactPhone: true,
        alternatePhone: true,
        preferredContactTime: true,
        website: true,
      }).safeParse(data);
    
    default:
      return { success: true };
  }
};