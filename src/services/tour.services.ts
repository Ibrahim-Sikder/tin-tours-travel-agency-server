/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Query } from 'mongoose'
import { ITour } from '../interface/tour.interface'
import Tour from '../models/tour.model'
import { filter } from '../helpers/filterHelper'
import { TQueryObj } from '../types/TQueryObj'
import { search } from '../helpers/searchHelper'
import { sort } from '../helpers/sortHelper'
import { paginate } from '../helpers/paginateHelper'
import { field } from '../helpers/fieldHelper'
import { getQuery } from '../helpers/getQuery'

const createTourIntoDB = async (tourData: ITour) => {
  const result = await Tour.create(tourData)
  return result
}

const getAllTourFromDB = async (query: TQueryObj) => {

//   const filterQuery = filter(Tour.find(), query)
//   const searchQuery = search(filterQuery, query)
//   const sortQuery = sort(searchQuery, query)
//   const paginateQuery = paginate(sortQuery, query)
//   const fieldQuery = field(paginateQuery, query)

  const result = await getQuery(Tour.find(), query)

  return result
}
const getSingleTourFromDB = async (id: string) => {
  const result = Tour.findById(id).populate('reviews')
  return result
}
const updateTourIntoDB = async (id: string, tourData: ITour) => {
  const result = Tour.findByIdAndUpdate(id, tourData, {
    new: true,
    runValidators: true,
  })
  return result
}
const deleteTourIntoDB = async (id: string) => {
  const result = Tour.findByIdAndDelete(id)
  return result
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
  getNextSchedule,
}
