'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movies', {
      imdbID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      Title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Type:{
        allowNull: false,
        type: Sequelize.STRING
      },
      Poster: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Country : {
        allowNull: false,
        type: Sequelize.STRING
      },
      Language: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Plot: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Writer: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Director: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Genre:{
        allowNull: false,
        type: Sequelize.STRING
      },
      Runtime: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Rated : {
        allowNull: false,
        type: Sequelize.STRING
      }, 
      Released : {
        allowNull: false,
        type: Sequelize.STRING
      },
      Year: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movies');
  }
};