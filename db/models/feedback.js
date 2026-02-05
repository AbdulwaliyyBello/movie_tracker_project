import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/sequelize.js";

export class feedback extends Model {}

movies.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: "Users",
          key: "id"
        }
      },
      rating: {
        type: DataTypes.NUMBER,
        validate: {
            min: 1,
            max: 5
        },
        allowNull: false
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imbdID: {
        type: DataTypes.STRING,
        references: {
          model: "movies",
          key: 'imdbID'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }
      ,
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'feedback', // We need to choose the model name
  },
);