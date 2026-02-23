import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import VehicleCard from "../components/VehicleCard";
import FilterBar from "../components/FilterBar";

function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("/vehicles")
      .then((res) => {
        setVehicles(res.data);
        setFiltered(res.data);
      })
      .catch((err) => setError("Failed to load vehicles"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let v = vehicles;
    if (filters.search) {
      v = v.filter((x) =>
        x.model.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }
    if (filters.brand) {
      v = v.filter((x) => x.brand === filters.brand);
    }
    if (filters.fuel) {
      v = v.filter((x) => x.fuel === filters.fuel);
    }
    if (filters.minPrice) {
      v = v.filter((x) => x.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      v = v.filter((x) => x.price <= Number(filters.maxPrice));
    }
    setFiltered(v);
  }, [filters, vehicles]);

  return (
    <div>
      <FilterBar onFilterChange={setFilters} />
      {loading && <p>Loading vehicles...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((v) => (
          <VehicleCard key={v._id} vehicle={v} />
        ))}
      </div>
    </div>
  );
}

export default Home;
