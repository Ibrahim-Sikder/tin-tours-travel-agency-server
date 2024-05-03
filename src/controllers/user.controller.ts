/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { userServices } from "../services/user.services";


const createUser = async (req:Request, res:Response)=>{
    try{

        const userData = req.body;
        const result = await userServices.createUserIntoDB(userData)
        res.status(200).json({
            status: 'success',
            message: 'User create successfully !',
            data: result,
        })

    }catch(err:any){
        console.log(err)
        res.status(500).json({
            status: 'fail',
            message: err.message || 'something went to wrong '
        })
    }

}
const getAllUser = async (req:Request, res:Response)=>{
    try{

       
        const result = await userServices.getAllUserFromDB()
        res.status(200).json({
            status: 'success',
            message: 'User are retrieve successfully !',
            data: result,
        })

    }catch(err:any){
        console.log(err)
        res.status(500).json({
            status: 'fail',
            message: err.message || 'something went to wrong '
        })
    }

}
const getSingleUser = async (req:Request, res:Response)=>{
    try{

       const id = req.params.id
        const result = await userServices.getSingleUserFromDB(id)
        res.status(200).json({
            status: 'success',
            message: 'Single User is successfully !',
            data: result,
        })

    }catch(err:any){
        console.log(err)
        res.status(500).json({
            status: 'fail',
            message: err.message || 'something went to wrong '
        })
    }

}
const updateUsers = async (req:Request, res:Response)=>{
    try{
        const id = req.params.id
       const userData = req.body;
        const result = await userServices.updateUserIntroDB(id, userData)
        res.status(200).json({
            status: 'success',
            message: 'User update successfully !',
            data: result,
        })

    }catch(err:any){
        console.log(err)
        res.status(500).json({
            status: 'fail',
            message: err.message || 'something went to wrong '
        })
    }

}
const deleteUsers = async (req:Request, res:Response)=>{
    try{

        const id = req.params.id
        const result = await userServices.deleteUserIntroDB(id)
        res.status(200).json({
            status: 'success',
            message: 'User delete successfully !',
            data: result,
        })

    }catch(err:any){
        console.log(err)
        res.status(500).json({
            status: 'fail',
            message: err.message || 'something went to wrong '
        })
    }

}


export const userController = {
    createUser,
    getAllUser,
    updateUsers,
    deleteUsers,
    getSingleUser,
}