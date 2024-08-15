import { where } from 'sequelize';
import {User} from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from "jsonwebtoken"



export const register = async(req, res, next)=> {
    try {
        const {username, password} = req.body;
        if(!username || !password) {
            return next(new ApiError("username and password is required", 400));
        }
        const existingUser = await User.findOne({where:{username:username}});
        if(existingUser) {
            return next(new ApiError("user already exist", 409));
        }
        const user = await User.create({username, password});
        const registeredUser = await User.findByPk(user.id, {
            attributes:{
                exclude:["password"]
            }
        })
        return res.status(201).json(new ApiResponse(true, "user registered", registeredUser));
    } catch (error) {
        console.log("error in authController register api", error.message);
        return next(error);
    }
}


export const login = async(req, res, next)=> {
    try {
        const {username, password} = req.body;
        if(!username || !password) {
            return next(new ApiError("username and password is required", 400));
        }

        const user = await User.findOne({where:{username:username}});
    
        if(!user) {
            return next(new ApiError("user not found", 404));
        }

        const isPasswordCurrect = await user.isPasswordCurrect(password);
        if(!isPasswordCurrect) {
            return next(new ApiError("password is incurrect", 401));
        }
        console.log(user.id);
        const token = await jwt.sign({userId:user.id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_SECRET_EXPIRY});
        
        const loginUser = await User.findByPk(user.id, {
            attributes:{exclude:["password"]}
        })

        return res.status(200).json(new ApiResponse(true, "login successfully", {loginUser, token}))
    } catch (error) {
        console.log("error in authController login api", error);
        return next(error);
    }
}




