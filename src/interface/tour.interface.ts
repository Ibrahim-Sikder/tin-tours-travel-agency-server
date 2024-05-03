import { Model } from "mongoose"


interface ITour {
    name: string
    durationHours: number
    ratingAverage: number
    ratingQuantity: number
    price: number
    imageCover: string
    images: string[]
    createdAt: Date
    startDates: Date[]
    startLocation: string
    locations: string[]
    slug: string
  }

 
  
  interface ITourMethods {
    getNextNearestStartDateAndEndDate(): {
      nearestStartDate: Date | null
      estimatedEndDate: Date | null
    }
  }

 export type TTourModel = Model<ITour, Record<string, never>, ITourMethods>;

export {ITour, ITourMethods }

