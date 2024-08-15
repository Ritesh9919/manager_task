import express from 'express';
const router = express.Router();
import {createTask, getTasks, updateTask, deleteTask} from '../controllers/task.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

router.post('/', verifyJWT, createTask);
router.get('/', verifyJWT,getTasks);
router.put('/:taskId', verifyJWT,updateTask);
router.delete('/:taskId', verifyJWT,deleteTask);

export default router;