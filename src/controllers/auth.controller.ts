/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { authServices } from '../services/auth.services'
import { sendSuccessResponse } from '../utils/sendResponse'
import { catchAsync } from '../utils/catchAsync'

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.register(req.body)

  sendSuccessResponse(res, {
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  })
})



const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
   
    const result = await authServices.login()
    res.status(200).json({
      status: 'success',
      message: 'User login successfully !',
      data: result,
    })
  } catch (err: any) {
    next(err)
  }
}

export const authController = {
  register,
  login,
}
