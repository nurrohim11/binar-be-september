'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const encryptedPassword = bcrypt.hashSync('password', 10)
    return queryInterface.bulkInsert('users', [{
      name:'Rohim',
      email:'rohim@gmail.com',
      is_verified:true,
      role:'admin',
      password:encryptedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }],{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
