import express from 'express';
import { tourControllers } from '../controllers/tour.controller';

const router = express.Router()

router.post('/create-tour', tourControllers.createTour )
router.get('/', tourControllers.getAllTour )
router.get('/:id', tourControllers.getSingleTour )
router.patch('/:id', tourControllers.updateTour )
router.delete('/:id', tourControllers.deleteTour )
router.get('/:id/next-schedule', tourControllers.getNextSchedule)

export const tourRoutes = router;