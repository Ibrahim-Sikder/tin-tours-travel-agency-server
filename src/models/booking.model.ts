import  { Schema, model } from "mongoose";
import { IBooking } from "../interface/booking.interface";


const bookingSchema = new Schema<IBooking>({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tour:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  bookedSlots:{
    type: Number,
    required: [true, 'A booking must have bookedSlots ']
  },
  bookingStatus:{
    enum: ['pending', 'paid', 'cancelled']
  },
  price: {
    type: Number,
    required: [true, 'Price is required ']
  }
})

  

  export const Booking = model<IBooking>('Booking', bookingSchema)