/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import { ITour } from '../interface/tour.interface'
import { Booking } from '../models/booking.model'
import Tour from '../models/tour.model'

const createBookingIntoDB = async (bookingData: ITour) => {
  const session = await mongoose.startSession()

  session.startTransaction()
  try {
    const booking = await Booking.create([bookingData], { session })
    if (!booking) {
      throw new Error('Booking Failed')
    }
    const tour = await Tour.findByIdAndUpdate(
      booking[0].tour,
      {
        $inc: { availableSeats: -booking[0].bookedSlots },
      },
      {
        session,
      },
    )
    if (!tour) {
      throw new Error('Booking failed')
    }
    await session.commitTransaction()
    await session.endSession()
    return booking[0]
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
    console.log(err)
  }
}
const getAllBookingFromDB = async () => {
  const result = Booking.find()
  return result
}
const getAllBookingOfUser = async (id: string) => {
  const result = Booking.find({
    user: id,
  })
  return result
}
const getSingleBookingFromDB = async (id: string) => {
  const result = await Booking.findById(id)
  return result
}
const updateBookingIntoDB = async (id: string, reviewData: ITour) => {
  const result = Booking.findByIdAndUpdate(id, reviewData, {
    new: true,
    runValidators: true,
  })
  return result
}
const deleteBookingIntoDB = async (id: string) => {
  const result = Booking.findByIdAndDelete(id)
  return result
}

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getSingleBookingFromDB,
  deleteBookingIntoDB,
  updateBookingIntoDB,
  getAllBookingOfUser,
}
