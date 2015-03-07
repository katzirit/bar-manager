"use strict";
module.exports = function(sequelize, DataTypes) {
  var Simulation = sequelize.define("Simulation", {
    data: DataTypes.TEXT,
    numOfRuns: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          this.belongsTo(models.User);
          this.hasMany(models.SimulationResult);
      }
    }
  });
  return Simulation;
};