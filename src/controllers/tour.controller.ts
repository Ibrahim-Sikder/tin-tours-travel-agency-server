/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { tourServices } from '../services/tour.services'

const createTour = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tourData = req.body

    const result = await tourServices.createTourIntoDB(tourData)
    res.status(200).json({
      success: 'true',
      message: 'tour create successfully!',
      data: result,
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
}
const getAllTour = async (req: Request, res: Response) => {
  try {
    const query = req.query
    console.log(query)
    const result = await tourServices.getAllTourFromDB(query)
    res.status(200).json({
      status: 'success',
      message: 'Tour are retrieve successfully !',
      data: result,
    })
  } catch (err: any) {
    console.log(err)
    res.status(500).json({
      status: 'fail',
      message: err.message || 'something went to wrong ',
    })
  }
}
const getSingleTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await tourServices.getSingleTourFromDB(id)
    res.status(200).json({
      status: 'success',
      message: 'Single tour is successfully !',
      data: result,
    })
  } catch (err: any) {
    console.log(err)
    res.status(500).json({
      status: 'fail',
      message: err.message || 'something went to wrong ',
      error: err,
    })
  }
}
const updateTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const userData = req.body
    const result = await tourServices.updateTourIntoDB(id, userData)
    res.status(200).json({
      status: 'success',
      message: 'Tour update successfully !',
      data: result,
    })
  } catch (err: any) {
    console.log(err)
    res.status(500).json({
      status: 'fail',
      message: err.message || 'something went to wrong ',
    })
  }
}
const deleteTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await tourServices.deleteTourIntoDB(id)
    res.status(200).json({
      status: 'success',
      message: 'Tour delete successfully !',
      data: result,
    })
  } catch (err: any) {
    console.log(err)
    res.status(500).json({
      status: 'fail',
      message: err.message || 'something went to wrong ',
    })
  }
}
const getNextSchedule = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await tourServices.getNextSchedule(id)
    res.status(200).json({
      status: 'success',
      message: 'Next Schedule fetched successfully',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}

export const tourControllers = {
  createTour,
  getAllTour,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
