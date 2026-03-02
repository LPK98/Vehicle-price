import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVehicleById } from "../services/vehicleService";
import PriceChart from "../components/PriceChart";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/Button";

function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getVehicleById(id)
      .then((r) => setVehicle(r.data))
      .catch(() => setError("Failed to load vehicle"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading vehicle details..." />;

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-xl">
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
    );
  }

  if (!vehicle) return null;

  const specs = [
    {
      label: "Year",
      value: vehicle.year,
      icon: (
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: "Price",
      value: `LKR ${Number(vehicle.price).toLocaleString()}`,
      icon: (
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "Fuel Type",
      value: vehicle.fuel || "N/A",
      icon: (
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      label: "Brand",
      value: vehicle.brand,
      icon: (
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
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary-600 mb-6 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          {vehicle.image ? (
            <img
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-80 lg:h-full object-cover"
            />
          ) : (
            <div className="w-full h-80 lg:h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <svg
                className="w-24 h-24 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="mb-2">
            <span className="inline-flex px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full uppercase tracking-wider">
              {vehicle.brand}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {vehicle.brand} {vehicle.model}
          </h1>
          <p className="text-3xl font-extrabold text-primary-600 mb-6">
            LKR {Number(vehicle.price).toLocaleString()}
          </p>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="bg-gray-50 rounded-xl p-4 border border-gray-100"
              >
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  {spec.icon}
                  <span className="text-xs font-medium uppercase tracking-wider">
                    {spec.label}
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          {/* Description */}
          {vehicle.description && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Description
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {vehicle.description}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="flex gap-3">
            <Button size="lg" className="flex-1">
              Contact Seller
            </Button>
            <Button size="lg" variant="outline">
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Price History Chart */}
      {vehicle.priceHistory && vehicle.priceHistory.length > 0 && (
        <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Price History
          </h2>
          <PriceChart data={vehicle.priceHistory} />
        </div>
      )}
    </div>
  );
}

export default VehicleDetails;
