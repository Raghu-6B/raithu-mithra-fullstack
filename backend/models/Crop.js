// backend/models/cropModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Farmer from "./farmerModel.js";

const Crop = sequelize.define("Crop", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cropName: { type: DataTypes.STRING, allowNull: false },
  season: { type: DataTypes.STRING },
  yield: { type: DataTypes.FLOAT },
});

Farmer.hasMany(Crop, { foreignKey: "farmerId", onDelete: "CASCADE" });
Crop.belongsTo(Farmer, { foreignKey: "farmerId" });

export default Crop;
