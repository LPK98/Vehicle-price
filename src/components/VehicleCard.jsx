import React from "react";
import { useNavigate } from "react-router-dom";

function VehicleCard({ vehicle }) {
  const navigate = useNavigate();
  const { id, image, model, brand, year, price, fuel } = vehicle;

  return (
    <div
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
      onClick={() => navigate(`/vehicle/${id}`)}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        {image ? (
          <img
            src={image}
            alt={`${brand} ${model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-300"
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
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-primary-700 font-bold px-3 py-1.5 rounded-xl text-sm shadow-sm">
          LKR {Number(price).toLocaleString()}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
          {brand} {model}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          {/* Year Badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
            <svg
              className="w-3.5 h-3.5"
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
            {year}
          </span>
          {/* Fuel Badge */}
          {fuel && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent-50 text-accent-600 rounded-lg text-xs font-medium">
              <svg
                className="w-3.5 h-3.5"
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
              {fuel}
            </span>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <button
            className="w-full py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/vehicle/${id}`);
            }}
          >
            View Details &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;
