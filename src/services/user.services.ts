import { IUser } from "../interface/user.interface";
import { User } from "../models/user.model";



const createUserIntoDB = async(userData:IUser)=>{
    const result = await User.create(userData);
    return result;
}
const getAllUserFromDB = async()=>{
    const result = await User.find();
    return result;
}
const getSingleUserFromDB = async(id:string)=>{
    const result = await User.findById(id);
    return result;
}
const updateUserIntroDB = async(id:string, userData: IUser )=>{
    const result = await User.findByIdAndUpdate(id, userData,{
        new:true,
        runValidator:true
    });
    return result;
}
const deleteUserIntroDB = async(id:string)=>{
    const result = await User.findByIdAndDelete(id);
    return result;
}

export const userServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    deleteUserIntroDB,
    updateUserIntroDB
}