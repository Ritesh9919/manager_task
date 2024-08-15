import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';


export const verifyJWT = async(req, res, next)=> {
    try {
        const token = req.headers['authorization'].split(' ')[1];

        console.log(token);
        if(!token) {
            return next(new ApiError("Unauthorized request", 401));
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId,{
            attributes:{
                exclude:["password"]
            }
        })
        if(!user) {
            return next(new ApiError("Invalid token or exipired", 401));
        }
        req.user = user;
        next()
    } catch (error) {
        console.log(error);
        next(error);
    }
}