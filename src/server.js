
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv';
import {sequelize} from './config/database.js' // Import Sequelize instance
const PORT = process.env.PORT || 3000;
dotenv.config();

import { errorHandlerMiddleware } from './middlewares/error_handler.middleware.js';
import { notFoundMiddleware } from './middlewares/not_found.middleware.js';

import authRouter from './routes/auth.route.js'
import taskRouter from './routes/task.route.js'


const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());



app.get('/', (req, res)=> {
  res.send("Hello World");
})

// routers
app.use('/api/users', authRouter);
app.use('/api/tasks', taskRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

    sequelize.sync()
    .then(()=>{
      console.log('Database synchronized');
      app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
      })
    })
    
  

    


