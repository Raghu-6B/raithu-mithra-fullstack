// List of products in the store
const productsList = [
  {
    id: 1,
    name: "Spinach",
    price: 25,
    category: "Leafy",
    freshness: 98,
    stock: 40,
    image: "/images/spinach_image_1.png" // image path from public folder
  },
  {
    id: 2,
    name: "Tomato",
    price: 30,
    category: "Fruit",
    freshness: 95,
    stock: 60,
    image: "/images/tomato.png"
  },
  {
    id: 3,
    name: "Potato",
    price: 35,
    category: "Root",
    freshness: 90,
    stock: 50,
    image: "/images/potato_image_1.png"
  },
  {
    id: 4,
    name: "Onion",
    price: 35,
    category: "Root",
    freshness: 90,
    stock: 40,
    image: "/images/onion_image_1.png"
  }
];

// Export the products so other files can use it
export default productsList;
