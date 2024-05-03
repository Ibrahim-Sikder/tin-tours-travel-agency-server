/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { reviewServices } from "../services/review.services";




const createReview = async(req:Request, res:Response)=>{
   try{
    const reviewData = req.body;
    const result = await reviewServices.createReviewIntoDB(reviewData)
    res.status(200).json({
        success: 'true',
        message: 'Review create successfully!',
        data: result
    })
   }catch(err){
    console.log(err)
    res.status(200).json({
        success: 'false',
        message: 'Review create failed!',
        data: err
    })
   }
}
const getAllReview = async (req:Request, res:Response)=>{
    try{

       
        const result = await reviewServices.getAllReviewFromDB()
        res.status(200).json({
            status: 'success',
            message: 'Review are retrieve successfully !',
            data: result,
        })

    }catch(err:any){
        console.log(err)
        res.status(500).json({
            status: 'fail',
            message: err.message || 'something went to wrong '
        })
    }

}
const getSingleReview = async (req:Request, res:Response)=>{
    try{

       const id = req.params.id
        const result = await reviewServices.getSingleReviewFromDB(id)
        res.status(200).json({
            status: 'success',
            message: 'Single Review retrieve is successfully !',
            data: result,
        })

    }catch(err:any){
        console.log(err)
        res.status(500).json({
            status: 'fail',
            message: err.message || 'something went to wrong '
        })
    }

}
const updateReview = async (req:Request, res:Response)=>{
    try{
        const id = req.params.id
       const userData = req.body;
        const result = await reviewServices.updateReviewIntoDB(id, userData)
        res.status(200).json({
            status: 'success',
            message: 'Review update successfully !',
            data: result,
        })

    }catch(err:any){
        console.log(err)
        res.status(500).json({
            status: 'fail',
            message: err.message || 'something went to wrong '
        })
    }

}
const deleteReview = async (req:Request, res:Response)=>{
    try{

        const id = req.params.id
        const result = await reviewServices.deleteReviewIntoDB(id)
        res.status(200).json({
            status: 'success',
            message: 'Review delete successfully !',
            data: result,
        })

    }catch(err:any){
        console.log(err)
        res.status(500).json({
            status: 'fail',
            message: err.message || 'something went to wrong '
        })
    }

}


export const reviewController = {
    createReview,
    getSingleReview,
    getAllReview,
    updateReview,
    deleteReview
}