import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/sequelize.js";

export class watched extends Model {

  static associate(models) {
    watched.belongsTo(models.movies, {
      foreignKey: "imdbId"
    });
  }
}
watched.init(
  {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    userId: {
        type: DataTypes.STRING,
        references: {
          model: "Users",
          key: "id"
        },
        allowNull: false
      },
      movieId: {
        type: DataTypes.STRING,
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
  },
  {
    
    sequelize, 
    modelName: 'watched', 
  },
);