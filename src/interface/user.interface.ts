interface IUser {
  name: string
  age: number
  email: string
  photo?: string
  role: 'user' | 'admin'
  userStatus: 'active' | 'inactive'
  password: string
  passwordChangeAt: Date
}

interface ILogin {
  email: string
  password: string
}

interface IRegister
  extends Omit<IUser, 'userStatus' | 'role' | 'passwordChangedAt'> {}


export { IUser, ILogin, IRegister }


