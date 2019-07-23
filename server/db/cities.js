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

Cities.beforeValidate((cities) => {
  cities.city = `${cities.city[0].toUpperCase()}${cities.city.slice(1)}`
})


module.exports= Cities;
