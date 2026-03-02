import React from "react";

function Input({ label, error, icon, className = "", ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}
        <input
          className={`w-full rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-600 focus:border-primary-500 ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 ${
            error ? "border-red-400 focus:ring-red-300" : ""
          }`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

export default Input;
