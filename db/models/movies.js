import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/sequelize.js";

export class movies extends Model {
  static associate(models) {
    movies.hasMany(models.watched, {
      foreignKey: "movieId"
    });
  }
}


movies.init(
  {
    imdbID: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      Title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      Type:{
        allowNull: false,
        type: DataTypes.STRING
      },
      Poster: {
        allowNull: false,
        type: DataTypes.STRING
      },
      Country : {
        allowNull: false,
        type: DataTypes.STRING
      },
      Language: {
        allowNull: false,
        type: DataTypes.STRING
      },
      Plot: {
        allowNull: false,
        type: DataTypes.STRING
      },
      Writer: {
        allowNull: false,
        type: DataTypes.STRING
      },
      Director: {
        allowNull: false,
        type: DataTypes.STRING
      },
      Genre:{
        allowNull: false,
        type: DataTypes.STRING
      },
      Runtime: {
        allowNull: false,
        type: DataTypes.STRING
      },
      Rated : {
        allowNull: false,
        type: DataTypes.STRING
      }, 
      Released : {
        allowNull: false,
        type: DataTypes.STRING
      },
      Year: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'movies', // We need to choose the model name
  },
);