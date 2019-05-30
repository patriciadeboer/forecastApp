const db = require('./db')
const Cities =require('./cities')
const Attractions = require('./attractions')


Attractions.belongsTo(Cities, {as:'location'})

module.exports={
  db,
  Cities,
  Attractions
}
