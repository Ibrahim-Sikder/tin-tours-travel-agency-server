
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../utils/catchAsync'

import { USER_ROLE } from '../constant/user.constant'
import { User } from '../models/user.model';
import { jwtHelper } from '../helpers/jwtHelper';
import config from '../config';
import { JwtPayload } from 'jsonwebtoken';

export const checkAuth = (...roles: Array<keyof typeof USER_ROLE>)=>{
   return  catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

      const token = req.headers.authorization
      if(!token){
        throw new Error('Invalid token')
      }
      const decodedToken = jwtHelper.verifyToken(token, config.jwt_access_token)

      req.user = decodedToken as JwtPayload
      
      const {email } = decodedToken
      const user = await User.findOne({email})

      if(!user){
        throw new Error('Invalid email or password')
      }

      if(!roles.includes(user?.role)){
        throw new Error ('You are not authorized to create user.')
      }


      // const email = req.body.email
      // const password = req.body.password
      // const user = await User.findOne({ email, password })
      // if (!user) {
      //   throw new Error('Invalid email or password')
      // }
      // if (!roles.includes(user?.role)) {
      //   throw new Error('You are not authorized')
      // }
      next()
    },
  )
}
