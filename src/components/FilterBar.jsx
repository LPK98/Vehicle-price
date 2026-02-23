import React, { useState, useEffect } from "react";

function FilterBar({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [fuel, setFuel] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    onFilterChange({ search, brand, fuel, minPrice, maxPrice });
  }, [search, brand, fuel, minPrice, maxPrice]);

  return (
    <div className="bg-white shadow rounded p-4 mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="border rounded p-2 w-full"
      >
        <option value="">All Brands</option>
        <option value="Toyota">Toyota</option>
        <option value="Nissan">Nissan</option>
        <option value="Honda">Honda</option>
      </select>
      <select
        value={fuel}
        onChange={(e) => setFuel(e.target.value)}
        className="border rounded p-2 w-full"
      >
        <option value="">All Fuel Types</option>
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
      </select>
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="border rounded p-2 w-full"
      />
    </div>
  );
}

export default FilterBar;
