import axios from "axios";

// ✅ Backend API endpoint
const API_URL = "http://localhost:5000/api/farmers";

// ✅ Get all farmers (fetch from backend → MySQL)
export const getFarmers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching farmers:", error.message);
    return [];
  }
};

// ✅ Add a new farmer (send data → backend → MySQL)
export const addFarmer = async (farmerData) => {
  try {
    const response = await axios.post(API_URL, farmerData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error adding farmer:", error.message);
    return { error: "Failed to add farmer" };
  }
};
