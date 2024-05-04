/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { bookingServices } from '../services/booking.services'
import { catchAsync } from '../utils/catchAsync'
import { sendSuccessResponse } from '../utils/sendResponse'

const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tourData = req.body
    const result = await bookingServices.createBookingIntoDB(tourData)
    res.status(200).json({
      success: 'true',
      message: 'Booking create successfully!',
      data: result,
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
}
const getAllBooking = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId
  const result = await bookingServices.getAllBookingOfUser(userId)
  sendSuccessResponse(res, {
    statusCode: 200,
    message: 'All booking of user fetched successfully!',
    data: result,
  })
})
const getAllBookingOfUser = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getAllBookingFromDB()
    res.status(200).json({
      status: 'success',
      message: 'Booking are retrieve successfully !',
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
const getSingleBooking = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await bookingServices.getSingleBookingFromDB(id)
    res.status(200).json({
      status: 'success',
      message: 'Single Booking is successfully !',
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
const updateBooking = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const userData = req.body
    const result = await bookingServices.updateBookingIntoDB(id, userData)
    res.status(200).json({
      status: 'success',
      message: 'Booking update successfully !',
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
const deleteBooking = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await bookingServices.deleteBookingIntoDB(id)
    res.status(200).json({
      status: 'success',
      message: 'Booking delete successfully !',
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

export const tourControllers = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  deleteBooking,
  updateBooking,
  getAllBookingOfUser,
}
