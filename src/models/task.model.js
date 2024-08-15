import { DataTypes } from 'sequelize'
import {sequelize} from '../config/database.js'



  export const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM('Todo', 'In Progress', 'Done'),
      defaultValue: 'Todo'
    },
    priority: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      defaultValue: 'Medium'
    },
    due_date: {
      type: DataTypes.DATE
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull:true
    }
  });



