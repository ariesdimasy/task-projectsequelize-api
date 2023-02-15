'use strict';

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

    await queryInterface.bulkInsert('Tasks', [{
       title: 'Learning Dart Programming',
       desc: 'Learning Dart before Flutter',
       done:false,
       userId:1,
     },{
      title: 'Learning PHP Programming',
      desc: 'Learning Dart before Codeigniter',
      done:false,
      userId:2,
    },{
      title: 'Cleaning Desk no. 13',
      desc: 'Desk no. 13 is so dirty , please clean it',
      done:false,
      userId:1,
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
