

import express from 'express';
import { bookingController } from '../controllers/booking.controller';

const router = express.Router()

router.post('/create-booking', bookingController.createBooking )
router.get('/', bookingController.getAllBooking )
router.get('/:id', bookingController.getSingleBooking )
router.patch('/:id', bookingController.updateBooking )
router.get('/:userId/get-all-booking', bookingController.getAllBookingOfUser )
router.delete('/:id', bookingController.deleteBooking )

export const bookingRoutes = router;