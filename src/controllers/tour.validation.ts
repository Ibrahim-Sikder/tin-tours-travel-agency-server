/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

const parseDate = (dateStr:any) => {
  const parsedDate = new Date(dateStr);
  return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
};

const createTourValidationSchema = z.object({
    name: z.string(),
    durationHours: z.number().min(1, 'Duration should be at least 1 hour'),
    ratingAverage: z.number().default(4.5),
    ratingQuantity: z.number().default(0),
    price: z.number().min(0, 'Price should be non-negative'),
    imageCover: z.string(),
    images: z.array(z.string()),
    createdAt: z.preprocess(parseDate, z.date()).default(() => new Date()),
    startDates: z.array(z.preprocess(parseDate, z.date())),
    startLocation: z.string(),
    locations: z.array(z.string()),
    slug: z.string().optional(),
});

export const validation = { 
  createTourValidationSchema
};
