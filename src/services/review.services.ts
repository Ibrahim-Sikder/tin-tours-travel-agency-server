import { ITour } from "../interface/tour.interface"
import { Review } from "../models/review.model";



const createReviewIntoDB = async (reviewData:ITour)=>{
    const result = await Review.create(reviewData)
    return result;

}
const getAllReviewFromDB = async ()=>{
const result = Review.find().populate('user');
return result;
}
const getSingleReviewFromDB = async (id:string)=>{
    const result = await Review.findById(id);
    return result;
}
const updateReviewIntoDB = async (id:string, reviewData:ITour)=>{
    const result = Review.findByIdAndUpdate(id, reviewData,{
        new: true,
        runValidators:true
    });
    return result;
}
const deleteReviewIntoDB = async (id:string)=>{
    const result = Review.findByIdAndDelete(id);
    return result;
}


export const reviewServices = {
   createReviewIntoDB,
   getAllReviewFromDB,
   getSingleReviewFromDB,
   updateReviewIntoDB,
   deleteReviewIntoDB,

}