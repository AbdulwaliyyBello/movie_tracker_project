'use strict';

const { movies } = require('../models/movies');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('feedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "id"
        }
      },
      rating: {
        type: Sequelize.NUMBER,
        validate: {
            min: 1,
            max: 5
        },
        allowNull: false
      },
      review: {
        type: Sequelize.STRING,
        allowNull: false
      },
      imbdID: {
        type: Sequelize.STRING,
        references: {
          model: "movies",
          key: 'imdbID'
        },
        allowNull: false
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
    await queryInterface.dropTable('feedbacks');
  }
};