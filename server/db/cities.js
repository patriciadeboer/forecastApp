const Sequelize = require('sequelize');
const db = require('./db');

const Cities = db.define('cities',{
  city:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
      notEmpty:true
    }
  },
  country:{
    type:Sequelize.STRING,
    defaultValue:'US'
  }
});

module.exports= Cities;
