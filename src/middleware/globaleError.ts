
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { TErrorResponse } from '../types/TErrorResponse'

export const globalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // let statusCode = err.statusCode || 500
  // let message = `${err.message} global error ` || 'Something went to wrong!'
  // const status = err.status || 'error'

  const errorResponse: TErrorResponse = {
    statusCode: err.statusCode || 500,
    status: err.status || 'error',
    message: err.message || 'something went wrong',
    issues: err.issues || [],
  }

  if (err instanceof mongoose.Error.ValidationError) {
    errorResponse.statusCode = 400
    errorResponse.message = err.message
    errorResponse.status = 'error'
    const errorValues = Object.values(err.errors)
    errorValues.forEach(
      (errObj: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        errorResponse.issues.push({
          path: errObj.path,
          message: errObj.message,
        })
      },
    )
  }

  res.status(errorResponse.statusCode).json({
    status: errorResponse.status,
    message: errorResponse.message,
    issues: errorResponse.issues,
    // error: err,
  })
}
