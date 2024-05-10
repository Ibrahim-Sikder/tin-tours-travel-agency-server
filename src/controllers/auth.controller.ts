/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { authServices } from '../services/auth.services'
import { sendSuccessResponse } from '../utils/sendResponse'
import { catchAsync } from '../utils/catchAsync'
import { jwtHelper } from '../helpers/jwtHelper'
import config from '../config'

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

const changePassword = async(req:Request, res:Response)=>{
  // const token = req.headers.authorization
  // if(!token){
  //   throw new Error('Invalid token')
  // }

  // const decodedToken = jwtHelper.verifyToken(token, config.jwt_access_token)

  const decodedToken = req.user

  const result = await authServices.changePassword(decodedToken, req.body)

  res.status(200).json({
    success: true,
    message: 'Password change successfully!',
    data: result
  })

  return result;

}

export const authController = {
  register,
  login,
  changePassword,
}
