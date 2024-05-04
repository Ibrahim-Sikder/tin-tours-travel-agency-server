import { ITour } from '../interface/tour.interface'
import { Booking } from '../models/booking.model'

const createBookingIntoDB = async (reviewData: ITour) => {
  const result = await Booking.create(reviewData)
  return result
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
  const result = await Booking.find({
    user: id,
  })
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
