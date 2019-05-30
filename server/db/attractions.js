const Sequelize = require('sequelize');
const db = require('./db');

const Attractions = db.define('attractions',{
  name:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      notEmpty:true
    }
  }
});

module.exports= Attractions;
