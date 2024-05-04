

import express from 'express';
import { userRouters } from './user.route';
import { tourRoutes } from './tour.route';
import { reviewRouters } from './review.route';
import { bookingRoutes } from './booking.route';


const globalRoute = express.Router()
globalRoute.use('/users', userRouters)
globalRoute.use('/tours', tourRoutes)
globalRoute.use('/reviews', reviewRouters)


const routes = [
    {
        path: '/users',
        route: userRouters,
    },
    {
        path: '/tours',
        route: tourRoutes,
    },
    {
        path: '/reviews',
        route: reviewRouters,
    },
    {
        path: '/booking',
        route: bookingRoutes,
    },
]

routes.forEach((routeObject)=>{
    globalRoute.use(routeObject.path, routeObject.route )
})



export default globalRoute;