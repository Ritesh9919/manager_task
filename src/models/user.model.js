import {DataTypes} from 'sequelize'
import {sequelize} from '../config/database.js'
import bcrypt from 'bcryptjs'





  export const User = sequelize.define('User', {
    username:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    password:{
     type:DataTypes.STRING,
     allowNull:false
    }
}, {
  hooks:{
    beforeCreate:async(user)=> {
     user.password = await bcrypt.hash(user.password, 10);
    }
  }
}
)

User.prototype.isPasswordCurrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}





