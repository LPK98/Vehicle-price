import React, { useState, useEffect } from "react";
import { getVehicles } from "../services/vehicleService";
import VehicleCard from "../components/VehicleCard";
import FilterBar from "../components/FilterBar";
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getVehicles()
      .then((res) => {
        setVehicles(res.data);
        setFiltered(res.data);
      })
      .catch(() => setError("Failed to load vehicles"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let v = vehicles;
    if (filters.search) {
      v = v.filter((x) =>
        `${x.brand} ${x.model}`
          .toLowerCase()
          .includes(filters.search.toLowerCase()),
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 dark:from-gray-900 dark:via-primary-950 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-primary-100 text-sm font-medium rounded-full mb-6">
              Sri Lanka&apos;s Premier Vehicle Marketplace
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-accent-400 to-yellow-300 bg-clip-text text-transparent">
                Vehicle Today
              </span>
            </h1>
            <p className="mt-6 text-lg text-primary-100 max-w-xl mx-auto">
              Browse thousands of vehicles from trusted sellers. Get the best
              price with our transparent pricing and detailed history.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#listings"
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all text-sm"
              >
                Browse Vehicles
              </a>
              <a
                href="#listings"
                className="w-full sm:w-auto px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-sm"
              >
                Sell Your Vehicle
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { value: "500+", label: "Listed Vehicles" },
              { value: "1.2K", label: "Happy Buyers" },
              { value: "50+", label: "Trusted Sellers" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center bg-white/10 backdrop-blur-sm rounded-xl py-4 px-2"
              >
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-primary-200 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section
        id="listings"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn"
      >
        <FilterBar onFilterChange={setFilters} />

        {loading && <LoadingSpinner text="Loading vehicles..." />}
        {error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-16">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
              No vehicles found
            </h3>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Try adjusting your filters
            </p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {filtered.length}
                </span>{" "}
                vehicle{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Home;
