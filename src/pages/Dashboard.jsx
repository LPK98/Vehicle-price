import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    fuel: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadVehicles = () => {
    setLoading(true);
    axios
      .get("/vehicles")
      .then((r) => setVehicles(r.data))
      .catch((e) => setError("Failed to load vehicles"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user?.role === "admin") {
      loadVehicles();
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios
        .put(`/vehicles/${editingId}`, form)
        .then(() => {
          setForm({
            brand: "",
            model: "",
            year: "",
            price: "",
            fuel: "",
            image: "",
          });
          setEditingId(null);
          loadVehicles();
        })
        .catch(() => setError("Update failed"));
    } else {
      axios
        .post("/vehicles", form)
        .then(() => {
          setForm({
            brand: "",
            model: "",
            year: "",
            price: "",
            fuel: "",
            image: "",
          });
          loadVehicles();
        })
        .catch(() => setError("Creation failed"));
    }
  };

  const handleEdit = (v) => {
    setEditingId(v._id);
    setForm({
      brand: v.brand,
      model: v.model,
      year: v.year,
      price: v.price,
      fuel: v.fuel,
      image: v.image,
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`/vehicles/${id}`)
      .then(() => loadVehicles())
      .catch(() => setError("Delete failed"));
  };

  if (user?.role !== "admin") {
    return <p>Access denied</p>;
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-4 mb-6 space-y-4"
      >
        <input
          placeholder="Brand"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
        <input
          placeholder="Model"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
        <input
          placeholder="Fuel"
          value={form.fuel}
          onChange={(e) => setForm({ ...form, fuel: e.target.value })}
          className="w-full border rounded p-2"
        />
        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          {editingId ? "Update" : "Add"} Vehicle
        </button>
      </form>
      {loading && <p>Loading vehicles...</p>}
      <div className="space-y-4">
        {vehicles.map((v) => (
          <div
            key={v._id}
            className="bg-white shadow rounded p-4 flex justify-between items-center"
          >
            <span>
              {v.brand} {v.model} ({v.year})
            </span>
            <div>
              <button
                onClick={() => handleEdit(v)}
                className="mr-2 text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(v._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
