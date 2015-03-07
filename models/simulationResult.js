"use strict";
module.exports = function(sequelize, DataTypes) {
  var SimulationResult = sequelize.define("SimulationResult", {
    resultData: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          this.belongsTo(models.Simulation);
      }
    }
  });
  return SimulationResult;
};