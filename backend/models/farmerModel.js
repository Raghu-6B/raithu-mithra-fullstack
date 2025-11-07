// backend/models/farmerModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Farmer = sequelize.define("Farmer", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
});

export default Farmer;
