import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function PriceChart({ data }) {
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={isDark ? "#374151" : "#f3f4f6"}
        />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: isDark ? "#9ca3af" : "#6b7280" }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: isDark ? "#9ca3af" : "#6b7280" }}
          tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#fff",
            border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
            borderRadius: "12px",
            color: isDark ? "#f3f4f6" : "#111827",
          }}
          formatter={(value) => [
            `LKR ${Number(value).toLocaleString()}`,
            "Price",
          ]}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#6366f1"
          strokeWidth={2}
          dot={{ fill: "#6366f1", r: 4 }}
          activeDot={{ r: 6, fill: "#4f46e5" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PriceChart;
