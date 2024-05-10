import { passwordHelpers } from './../helpers/passwordHelper'
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILogin, IRegister } from '../interface/user.interface'
import { User } from '../models/user.model'
import { JwtPayload } from 'jsonwebtoken'
import { jwtHelper } from '../helpers/jwtHelper'
import config from '../config'
import { passwordHelpers } from '../helpers/passwordHelper'

const register = async (payload: IRegister[]) => {
  // const user = await User.findOne({email: payload}).select('+password')

  // console.log(user)

  // if(!user){
  //   throw new Error('Invalid credentials ')
  // }

  //   const plainTextPassword = payload.password
  //   const hashedPassword  = user.password ;

  //  const isCorrectPassword = await bcrypt.hash(password, 16);

  if (!Array.isArray(payload) || payload.length === 0) {
    throw new Error('Payload is empty or not an array')
  }

  const userPayload = payload[0]

  const result = await User.create({
    ...userPayload,
    userStatus: 'active',
    role: 'user',
  })

  return result
}

const login = async (payload: ILogin) => {
  const user = await User.findOne(payload)
  if (!user) {
    throw new Error('Invalid credentials!')
  }

  const jwtPayload: JwtPayload = {
    email: user.email,
    password: user.password,
  }

  // const accessToken = jwt.sign(jwtPayload, process.env.JWT_ACCESS_SECRETE, {
  //   expiresIn: process.env.JWT_EXPIRES_IN,
  // })

  const accessToken = jwtHelper.createToken(
    jwtPayload,
    config.jwt_access_token,
    {
      expiresIn: config.jwt_expires_in,
    },
  )
  const refreshToken = jwtHelper.createToken(
    jwtPayload,
    config.jwt_refresh_token,
    {
      expiresIn: config.jwt_refresh_expires_in,
    },
  )

  return {
    accessToken,
    refreshToken,
  }
}

const changePassword = async (
  decodedToken: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const { email } = decodedToken

  // Retrieve user data
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new Error('User not found.')
  }

  // Check if passwords are fetched properly
  if (!payload.oldPassword || !user.password) {
    throw new Error('Password data is missing.')
  }

  // Compare passwords
  const isCorrectPassword = await passwordHelpers.comparePassword(
    payload.oldPassword,
    user.password,
  )
  if (!isCorrectPassword) {
    throw new Error('Invalid credentials.')
  }

  // Hash new password
  const hashedPassword = await passwordHelpers.hashPassword(payload.newPassword)

  // Update user password
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      password: hashedPassword,
      passwordChange: new Date(),
    },
    { new: true },
  )

  return updatedUser
}

const refreshToken = async (refreshToken:string) => {
  const decodedToken = jwtHelper.verifyToken(
    refreshToken,
    config.jwt_refresh_token,
  )
  const { email } = decodedToken as JwtPayload
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Invalid token')
  }

  const jwtPayload: JwtPayload = {
    email: user.email,
    role: user.role,
  }

  const accessToken = jwtHelper.createToken(
    jwtPayload,
    config.jwt_access_token,
    {
      expiresIn: config.jwt_expires_in,
    },
  )

  return {
    accessToken,
  }
}

export const authServices = {
  register,
  login,
  changePassword,
  refreshToken,
}
