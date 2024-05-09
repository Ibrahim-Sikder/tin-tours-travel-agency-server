/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Query, Schema, model } from "mongoose";
import { IUser } from "../interface/user.interface";
import { ACCOUNT_STATUS, USER_ROLE } from "../constant/user.constant";


const userSchema = new Schema<IUser>({
    name: {
      type: String,
      required: [true, 'Please tell us your name'],
    },
    age: {
      type: Number,
      required: [true, 'Please tell us your age'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please tell us your email'],
      lowercase: true,
    },
    photo: String,
    role: {
      type: String,
      enum: Object.values(USER_ROLE), // ['user', 'admin']
      default: USER_ROLE.user,
    },
    userStatus: {
      type: String,
      enum: Object.values(ACCOUNT_STATUS),
      default: ACCOUNT_STATUS.active, // ['active', 'inactive']
    },
    password: {
      type: String,
      required: [true, 'Please provide password '],
      select:0,
    },
    passwordChangeAt: {
      type: Date,
      default: null
    }
  },{
    timestamps: true
  })

  // userSchema.pre(/^find/, function(this:Query<IUser, Document>, next){
  //   this.find({userStatus:{$eq:'active'}})
  //   next()
  // })   

  // userSchema.pre('find', function(next){
  //   this.find({userStatus:{$eq:'active'}})
  //   next()
  // })
  // userSchema.pre('find', function(next){
  //   this.findOne({userStatus:{$eq:'active'}})
  //   next()
  // })

  export const User = model<IUser>('User', userSchema)