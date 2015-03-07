"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Simulations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      data: {
        type: DataTypes.TEXT
      },
      numOfRuns: {
        type: DataTypes.INT
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Simulations").done(done);
  }
};