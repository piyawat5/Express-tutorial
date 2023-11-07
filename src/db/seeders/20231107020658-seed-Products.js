"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    data = data.map((item) => ({
      ...item,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("Products", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};

let data = [
  {
    name: "Bonzai",
    image: "",
    stock: 8,
    price: 1234,
  },
];
