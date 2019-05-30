const db = require('./database')

// Project.belongsToMany(Robot, {through: 'assignments'})
// Robot.belongsToMany(Project, {through: 'assignments'})


module.exports = {
  // Include your models in this exports object as well!
  db,
  // Project,
  // Robot,
}
