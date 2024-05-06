/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITour } from "../interface/tour.interface"
import Tour from "../models/tour.model";


const createTourIntoDB = async (tourData:ITour)=>{
    const result = await Tour.create(tourData)
    return result;

}
const getAllTourFromDB = async (query:any)=>{
    console.log(query, 'before delete')

    const queryObj = {...query }

    const excludeField =  [
        'page',
        'searchTerm',
        'limit',
        'sort',
        'sortBy',
        'sortOrder',
        'fields'
    ]

    excludeField.forEach((keyword)=>delete queryObj[keyword])
    console.log(queryObj, 'after delete ')

const result = Tour.find(queryObj).populate('reviews');
return result;
}
const getSingleTourFromDB = async (id:string)=>{


    const result = Tour.findById(id).populate('reviews');
    return result;
}
const updateTourIntoDB = async (id:string, tourData:ITour)=>{
    const result = Tour.findByIdAndUpdate(id, tourData,{
        new: true,
        runValidators:true
    });
    return result;
}
const deleteTourIntoDB = async (id:string)=>{
    const result = Tour.findByIdAndDelete(id);
    return result;
}
const getNextSchedule = async (id: string) => {
    const tour = await Tour.findById(id)
    const nextSchedule = tour?.getNextNearestStartDateAndEndDate()
  
    return {
      tour,
      nextSchedule,
    }
  }

export const tourServices = {
    createTourIntoDB,
    getAllTourFromDB,
    getSingleTourFromDB,
    updateTourIntoDB,
    deleteTourIntoDB,
    getNextSchedule
}