import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Optional: Seed sample products (run once)
export const seedProducts = async (req, res) => {
  try {
    const data = [
      { name: "Tomato", telugu: "(టమాటో)", price: 25, image: "tomato.png" },
      { name: "Onion", telugu: "(ఈరుకాయ)", price: 30, image: "onion.png" },
    ];
    await Product.bulkCreate(data);
    res.status(200).json({ message: "Products seeded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error seeding products", error });
  }
};
