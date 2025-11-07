import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [form, setForm] = useState({ name: "", location: "", crop: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000/api/farmers";

  // ✅ Fetch all farmers from backend
  const fetchFarmers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setFarmers(res.data || []);
      setError("");
    } catch (err) {
      setError("Failed to load farmers. Please check your backend connection.");
      console.error("Error fetching farmers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add new farmer to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.location || !form.crop) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(API_URL, form);
      setFarmers((prev) => [...prev, res.data]);
      setForm({ name: "", location: "", crop: "" });
      setError("");
    } catch (err) {
      setError("Error adding farmer. Check your backend console.");
      console.error("Error adding farmer:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-8">
        🌾 Registered Farmers
      </h1>

      {/* Error & Loading */}
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      {loading && <div className="text-center text-gray-600">Loading...</div>}

      <div className="max-w-3xl mx-auto">
        {/* ✅ Farmers List */}
        {farmers.length === 0 ? (
          <p className="text-center text-gray-500">No farmers yet.</p>
        ) : (
          <ul className="space-y-3">
            {farmers.map((f) => (
              <li
                key={f.id || f.ID || Math.random()}
                className="bg-white p-4 rounded-lg shadow-sm border border-green-200"
              >
                <p className="text-lg font-semibold text-green-800">{f.name}</p>
                <p className="text-gray-700">
                  📍 {f.location} — 🌱 {f.crop}
                </p>
              </li>
            ))}
          </ul>
        )}

        {/* ✅ Add Farmer Form */}
        <h3 className="text-2xl font-semibold text-green-800 mt-10 mb-4 text-center">
          ➕ Add New Farmer
        </h3>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 bg-white p-6 rounded-lg shadow-md"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="border border-green-300 p-2 rounded"
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="border border-green-300 p-2 rounded"
          />
          <input
            name="crop"
            value={form.crop}
            onChange={handleChange}
            placeholder="Crop"
            required
            className="border border-green-300 p-2 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Adding..." : "Add Farmer"}
          </button>
        </form>
      </div>
    </div>
  );
}
