import { Op } from "sequelize";
import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const createTask = async(req, res, next)=> {
    try {
    const { title, description, status, priority, due_date} = req.body;
    const task = await Task.create(
        {
            title, 
            description, 
            status, 
            priority, 
            due_date,
            userId:req.user.id
        })

        return res.status(201).json(new ApiResponse(true, "Task created", task));

    } catch (error) {
        console.log("error in taskController createTask api", error);
        next(error);
    }
}


export const getTasks = async(req, res, next)=> {
    try {
        let {status, priority, dueDate, search, limit, offset } = req.query;
        limit = +limit || 10;
        offset = +offset || 1;
        let filter = {userId:11}
        if(status) {
            filter.status = status;
        }
        if(priority) {
            filter.priority = priority;
        }
        if(dueDate) {
            filter.dueDate = dueDate;
        }
        const where = search ? {title:{[Op.like]:`%${search}%` },...filter}:filter;
        const tasks = await Task.findAll({where, limit:limit, offset:offset});
        
        return res.status(200).json(new ApiResponse(true, "Tasks fetched successfully", tasks));

    } catch (error) {
        console.log("error in taskController getTask api", error);
        return next(error);
    }
}


export const updateTask = async(req, res, next)=> {
    try {
        const {taskId} = req.params;
        const {title, description, status, priority} = req.body;
        const task = await Task.findOne({where:{id:taskId, userId:req.user.id}});
        if(!task) {
            return next(new ApiError("Task not found", 404));
        }
        await task.update({title, description, status, priority});
        return res.status(200).json(new ApiResponse(true, "Task updated", task));
    } catch (error) {
        console.log("error in taskController updateTask api", error);
        return next(error);
    }
}


export const deleteTask = async(req, res, next)=> {
    try {
        const {taskId} = req.params;
        const task = await Task.findOne({where:{id:taskId, userId:req.user.id}});
        if(!task) {
            return next(new ApiError("Task not found", 404));
        }
        await task.destroy()
        return res.status(200).json(new ApiResponse(true, "Task deleted"));
    } catch (error) {
        console.log("error in taskController deleteTask api", error);
        return next(error);
    }
}