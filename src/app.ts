/* eslint-disable no-undef */
import cors from 'cors';
import express, { Application } from 'express';
import { userRouters } from './routes/user.route';
import { tourRoutes } from './routes/tour.route';
import { reviewRouters } from './routes/review.route';

const app: Application = express();
app.use(cors())
app.use(express.json())



app.use('/api/v1/users', userRouters)
app.use('/api/v1/tours', tourRoutes)
app.use('/api/v1/reviews', reviewRouters)

app.get('/api/v1/users', (req, res)=>{
    res.send('Hello all users')
})

app.get('/', (req, res)=>{
    res.send('Hello word')
})



export default app;