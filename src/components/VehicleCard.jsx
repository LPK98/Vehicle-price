import React from "react";
import { useNavigate } from "react-router-dom";

function VehicleCard({ vehicle }) {
  const navigate = useNavigate();
  const { id, image, model, brand, year, price } = vehicle;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {image && (
        <img
          src={image}
          alt={`${brand} ${model}`}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg">
          {brand} {model}
        </h3>
        <p className="text-sm text-gray-600">Year: {year}</p>
        <p className="text-sm text-gray-600">Price: LKR {price}</p>
        <button
          className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
          onClick={() => navigate(`/vehicle/${id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default VehicleCard;
