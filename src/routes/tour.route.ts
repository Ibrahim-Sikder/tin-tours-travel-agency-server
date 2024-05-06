import express from 'express';
import { tourControllers } from '../controllers/tour.controller';
import { validateRequest } from '../middleware/validateRequest';
import { validation } from '../controllers/tour.validation';

const router = express.Router()

router.post('/create-tour', validateRequest(validation.createTourValidationSchema), tourControllers.createTour )
router.get('/', tourControllers.getAllTour )
router.get('/:id', tourControllers.getSingleTour )
router.patch('/:id', tourControllers.updateTour )
router.delete('/:id', tourControllers.deleteTour )
router.get('/:id/next-schedule', tourControllers.getNextSchedule)

export const tourRoutes = router;