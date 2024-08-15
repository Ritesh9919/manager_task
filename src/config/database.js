import {Sequelize} from 'sequelize'
import dotenv from 'dotenv';
dotenv.config()


const sequelize = new Sequelize(process.env.POSTGRES_URI);


 
sequelize.authenticate()
  .then(() => {
    console.log('Connection to PostgreSQL has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



export {sequelize}