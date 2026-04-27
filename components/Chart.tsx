"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

type Props = {
  tableData: {
    xi: number;
    yi: number; // données réelles
    moyenne: number | null;
    adjusted: number | null;
  }[];
};

export default function Chart({ tableData }: Props) {
  return (
    <LineChart width={800} height={400} data={tableData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="xi" />
      <YAxis />
      <Tooltip />
      <Legend />

      {/* 🔵 Données réelles */}
      <Line
        dataKey="yi"
        name="Données réelles"
        stroke="#2563eb"
        strokeWidth={2}
      />

      {/* 🟢 Moyenne mobile */}
      <Line
        dataKey="moyenne"
        name="Moyenne mobile"
        stroke="#16a34a"
        strokeWidth={2}
      />

      {/* 🔴 Régression */}
      <Line
        dataKey="adjusted"
        name="Régression"
        stroke="#dc2626"
        strokeWidth={2}
      />
    </LineChart>
  );
}