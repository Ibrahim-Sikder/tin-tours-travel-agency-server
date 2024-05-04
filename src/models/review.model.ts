import mongoose, { Schema, model } from "mongoose";
import { IReview } from "../interface/review.interface";
import Tour from "./tour.model";

const reviewSchema = new Schema<IReview>(
    {
      review: {
        type: String,
        required: [true, 'Please tell us your review'],
      },
      rating: {
        type: Number,
        required: [true, 'Please tell us your rating'],
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      tour: {
        type: Schema.Types.ObjectId,
        ref: 'Tour',
        required: [true, 'Please tell us your tour'],
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please tell us your user'],
      },
    }
  )


  reviewSchema.statics.calcAverageRatings = async function (tourId:mongoose.Types.ObjectId){
    const stats = await this.aggregate([
      {
        $match: tourId
      },
      {
        $group: {
          _id: '$tour',
          numberRatings: {$sum:1},
          avgRating: {$avg: '$rating'}
        }
      }
    ])

    if(stats.length > 0 ){
      await Tour.findByIdAndUpdate(tourId,{
        ratingAverage: stats[0].numberRatings,
        ratingQuantity: stats[0].avgRating
      })
    }else{
      await Tour.findByIdAndUpdate(tourId, {
        ratingAverage: 0,
        ratingQuantity: 0
      })
    }

  }

 
  

  export const Review = model<IReview>('Review', reviewSchema)