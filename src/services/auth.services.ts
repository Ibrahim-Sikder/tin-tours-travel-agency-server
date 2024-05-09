/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILogin, IRegister } from '../interface/user.interface'
import { User } from '../models/user.model'


const register = async (payload: IRegister[]) => {

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
  const result = await User.findOne(payload)
  if (!result) {
    throw new Error('Invalid credentials!')
  }

  return null
}

export const authServices = {
  register,
  login,
}
