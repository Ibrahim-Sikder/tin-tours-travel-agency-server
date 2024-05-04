import { Model, Schema } from "mongoose"


interface IReview {
    review: string
    rating: number
    createdAt: Date
    tour: Schema.Types.ObjectId
    user: Schema.Types.ObjectId
  }


  interface IReviewMode extends Model<IReview> {
    calcAverageRatings(): Promise<void>;
  }


  export {IReview, IReviewMode}