'use strict';
const md5 = require('md5')

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

    await queryInterface.bulkInsert("Users",[{
      name:"Aries Dimas Yudhistira",
      email:'ariesdimasy@gmail.com',
      password:md5('999999'),
      createdAt:new Date(),
      updatedAt:new Date(),
    },{
      name:'Muhammad Abdul',
      email:'muhammad.abdul@email.com',
      password:md5('guest'),
      createdAt:new Date(),
      updatedAt:new Date(),
    }] )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
