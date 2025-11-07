import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search } from "lucide-react";
import "../styles/ProductsPage.css";

// Import vegetable images
import tomatoImg from "../assets/tomato.png";
import potatoImg from "../assets/potato.png";
import onionImg from "../assets/onion.png";
import beansImg from "../assets/beans.png";
import beetrootImg from "../assets/beetroot.png";
import bittermelonImg from "../assets/bittermelon.png";
import bottlegourdImg from "../assets/bottlegourd.png";
import brinjalImg from "../assets/brinjal.png";
import broccoliImg from "../assets/broccoli.png";
import cabbageImg from "../assets/cabbage.png";
import capsicumImg from "../assets/capsicum.png";
import carrotImg from "../assets/carrot_image.png";
import cauliflowerImg from "../assets/cauliflower.png";
import cocoyamImg from "../assets/cocoyam.png";
import corianderImg from "../assets/coriander.png";
import cucumberImg from "../assets/cucumber.png";
import curryleavesImg from "../assets/curry-leaves.png";
import drumstickImg from "../assets/drumstick.png";
import greenchilliImg from "../assets/greenchilli.png";
import ladyfingerImg from "../assets/ladyfinger.png";
import methiImg from "../assets/methi.png";
import mintImg from "../assets/mint.png";
import mushroomImg from "../assets/mushroom.png";
import peasImg from "../assets/peas.png";
import radishImg from "../assets/radish.png";
import ridgegourdImg from "../assets/ridgeguord.png";
import smallbittergourdImg from "../assets/smallbitterguord.png";
import spinachImg from "../assets/spinach.png";
import springonionImg from "../assets/springonion.png";
import sweetpotatoImg from "../assets/sweetpotato.png";
import tindoraImg from "../assets/tindora.png";
import whiteonionImg from "../assets/whiteonion.png";
import yamImg from "../assets/yam.png";

// ... import all other images similarly

const products = [
  { id: 1, name: "Tomato", telugu: "(టమాటో)", image: tomatoImg, price: 25 },
  { id: 2, name: "Potato", telugu: "(బంగాళాదుంప)", image: potatoImg, price: 30 },
  { id: 3, name: "Onion", telugu: "(ఈరుకాయ)", image: onionImg, price: 35 },
   { id: 4, name: "Beans", telugu: "(బీన్స్)", image: beansImg, price: 40 },
  { id: 5, name: "Beetroot", telugu: "(బీట్రూట్)", image: beetrootImg, price: 45 },
  { id: 6, name: "Bittermelon", telugu: "(కర్ర)", image: bittermelonImg, price: 50 },
  { id: 7, name: "Bottle Gourd", telugu: "(సొరకాయ)", image: bottlegourdImg, price: 55 },
  { id: 8, name: "Brinjal", telugu: "(వంకాయ)", image: brinjalImg, price: 60 },
  { id: 9, name: "Broccoli", telugu: "(బ్రోకోలి)", image: broccoliImg, price: 65 },
  { id: 10, name: "Cabbage", telugu: "(గోబీ)", image: cabbageImg, price: 30 },
  { id: 11, name: "Capsicum", telugu: "(క్యాప్సికం)", image: capsicumImg, price: 70 },
  { id: 12, name: "Carrot", telugu: "(గాజర్)", image: carrotImg, price: 40 },
  { id: 13, name: "Cauliflower", telugu: "(గోబీ)", image: cauliflowerImg, price: 50 },
  { id: 14, name: "Cocoyam", telugu: "(కొకోయం)", image: cocoyamImg, price: 35 },
  { id: 15, name: "Coriander", telugu: "(కొత్తిమీర)", image: corianderImg, price: 25 },
  { id: 16, name: "Cucumber", telugu: "(సంకరకాయ)", image: cucumberImg, price: 30 },
  { id: 17, name: "Curry Leaves", telugu: "(కరివేపాకు)", image: curryleavesImg, price: 20 },
  { id: 18, name: "Drumstick", telugu: "(మునగాయ)", image: drumstickImg, price: 40 },
  { id: 19, name: "Green Chilli", telugu: "(పచ్చిమిర్చి)", image: greenchilliImg, price: 25 },
  { id: 20, name: "Lady Finger", telugu: "(బెండకాయ)", image: ladyfingerImg, price: 35 },
  { id: 21, name: "Methi", telugu: "(మెంతులు)", image: methiImg, price: 20 },
  { id: 22, name: "Mint", telugu: "(పుదీనా)", image: mintImg, price: 25 },
  { id: 23, name: "Mushroom", telugu: "(కూదుప్పు)", image: mushroomImg, price: 70 },
  { id: 24, name: "Peas", telugu: "(పచ్చిపప్పు)", image: peasImg, price: 40 },
  { id: 25, name: "Radish", telugu: "(ముల్లంగి)", image: radishImg, price: 30 },
  { id: 26, name: "Ridge Gourd", telugu: "(పొరెలకాయ)", image: ridgegourdImg, price: 35 },
  { id: 27, name: "Small Bitter Gourd", telugu: "(చిన్నకర్ర)", image: smallbittergourdImg, price: 45 },
  { id: 28, name: "Spinach", telugu: "(కోస)", image: spinachImg, price: 20 },
  { id: 29, name: "Spring Onion", telugu: "(వసంత ముల్లంగి)", image: springonionImg, price: 25 },
  { id: 30, name: "Sweet Potato", telugu: "(చీను గుడ్లు)", image: sweetpotatoImg, price: 50 },
  { id: 31, name: "Tindora", telugu: "(తిండోర)", image: tindoraImg, price: 40 },
  { id: 32, name: "White Onion", telugu: "(తెల్లఈరుకాయ)", image: whiteonionImg, price: 35 },
  { id: 33, name: "Yam", telugu: "(యాము)", image: yamImg, price: 60 },

  // ... all other products
];

export default function ProductsPage() {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [visibleProducts, setVisibleProducts] = useState(products);
  const [flyingImage, setFlyingImage] = useState(null);
  const cartIconRef = useRef(null);

  useEffect(() => {
    document.body.className = "products-page";
    return () => (document.body.className = "");
  }, []);

  useEffect(() => {
    let filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (sortOption === "priceLowHigh") filtered.sort((a, b) => a.price - b.price);
    else if (sortOption === "priceHighLow") filtered.sort((a, b) => b.price - a.price);
    else if (sortOption === "nameAsc") filtered.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortOption === "nameDesc") filtered.sort((a, b) => b.name.localeCompare(a.name));

    setVisibleProducts(filtered);
  }, [searchText, sortOption]);

  const addToCart = (product, e) => {
    const rect = e.target.getBoundingClientRect();
    const cartRect = cartIconRef.current.getBoundingClientRect();

    setFlyingImage({
      src: product.image,
      startX: rect.left,
      startY: rect.top,
      endX: cartRect.left,
      endY: cartRect.top,
    });

    const found = cart.find((item) => item.id === product.id);
    let updatedCart;
    if (found) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
      toast.success(`${product.name} added to cart!`);
    }
    setCart(updatedCart);
  };

  const decreaseQuantity = (product) => {
    const updatedCart = cart
      .map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  const getQuantity = (id) => cart.find((p) => p.id === id)?.quantity || 0;

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="products-container">
      <Toaster position="top-right" />

      {/* Topbar */}
      <div className="topbar">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search Vegetables..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sort By</option>
          <option value="priceLowHigh">Price ↑</option>
          <option value="priceHighLow">Price ↓</option>
          <option value="nameAsc">Name A-Z</option>
          <option value="nameDesc">Name Z-A</option>
        </select>

        <div className="cart-wrapper" ref={cartIconRef} onClick={() => navigate("/cart")}>
          <ShoppingCart size={26} />
          {totalCartItems > 0 && <span className="cart-badge">{totalCartItems}</span>}
        </div>
      </div>

      {/* Flying Image */}
      {flyingImage && (
        <motion.img
          src={flyingImage.src}
          className="flying-img"
          initial={{ x: flyingImage.startX, y: flyingImage.startY, scale: 1 }}
          animate={{ x: flyingImage.endX, y: flyingImage.endY, scale: 0.2, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          onAnimationComplete={() => setFlyingImage(null)}
        />
      )}

      {/* Products Grid */}
      <motion.div
        layout
        className="products-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AnimatePresence>
          {visibleProducts.map((product, index) => {
            const quantity = getQuantity(product.id);
            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
                className="product-card"
              >
                <span className="discount-badge">10% OFF</span>
                <img src={product.image} alt={product.name} />
                <h3>{product.name} {product.telugu}</h3>
                <p>500g</p>
                <div>
                  <span className="price">₹{product.price}</span>
                  <span className="original-price">₹{product.price + 10}</span>
                </div>

                {quantity === 0 ? (
                  <button onClick={(e) => addToCart(product, e)} className="btn-add">
                    ADD
                  </button>
                ) : (
                  <div className="quantity-control">
                    <button onClick={() => decreaseQuantity(product)}>−</button>
                    <span>{quantity}</span>
                    <button onClick={(e) => addToCart(product, e)}>+</button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
