"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        name: "Guitars",
        description: "All kinds of guitars",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Keyboards",
        description: "Keyboards and pianos",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
