// backend/controllers/farmerController.js
import Farmer from "../models/farmerModel.js";

import Crop from "../models/crop.js";
import Product from "../models/productModel.js";

export const getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.findAll({
      include: [Crop, Product],
    });
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFarmer = async (req, res) => {
  try {
    const { name, location, contact } = req.body;
    const farmer = await Farmer.create({ name, location, contact });
    res.status(201).json(farmer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
