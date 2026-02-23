import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import PriceChart from "../components/PriceChart";

function VehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/vehicles/${id}`)
      .then((r) => setVehicle(r.data))
      .catch(() => setError("Failed to load vehicle"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!vehicle) return null;

  return (
    <div className="bg-white shadow rounded p-6">
      {vehicle.image && (
        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-64 object-cover mb-4 rounded"
        />
      )}
      <h1 className="text-2xl font-semibold">
        {vehicle.brand} {vehicle.model}
      </h1>
      <p>Year: {vehicle.year}</p>
      <p>Price: LKR {vehicle.price}</p>
      <p>Fuel: {vehicle.fuel}</p>
      <p>Description: {vehicle.description}</p>
      {vehicle.priceHistory && (
        <div className="mt-6">
          <h2 className="text-xl mb-2">Price History</h2>
          <PriceChart data={vehicle.priceHistory} />
        </div>
      )}
    </div>
  );
}

export default VehicleDetails;
