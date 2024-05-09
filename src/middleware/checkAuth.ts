import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../utils/catchAsync'
import { User } from '../models/user.model'
import { USER_ROLE } from '../constant/user.constant'

export const checkAuth = (...roles: Array<keyof typeof USER_ROLE>)=>{
   return  catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const email = req.body.email
      const password = req.body.password
      const user = await User.findOne({ email, password })
      if (!user) {
        throw new Error('Invalid email or password')
      }
      if (!roles.includes(user?.role)) {
        throw new Error('You are not authorized')
      }
      next()
    },
  )
}
