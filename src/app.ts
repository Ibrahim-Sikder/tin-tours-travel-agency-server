/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import { notFound } from './middleware/notFound'
import { globalError } from './middleware/globaleError'
import globalRoute from './routes'
import cookieParser from 'cookie-parser'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())


app.use('/api/v1', globalRoute)



app.get('/', (req, res) => {
  res.send('Hello word')
})

app.use(globalError)

// app.all('/*', notFound)
app.use('/*', notFound)

export default app
