"use client";

import { useState } from "react";
import { leastSquares, movingAverage } from "../lib/math";

export default function Home() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<number[]>([]);
  const regression = data.length > 1 ? leastSquares(data) : null;

  const handleConvert = () => {
    const values = input
      .split(",")
      .map((v) => parseFloat(v.trim()))
      .filter((v) => !isNaN(v));

    setData(values);
  };

  const ma = data.length >= 3 ? movingAverage(data, 3) : [];

  return (
    <div style={{ padding: 20 }}>
      <h1>Prévision budgétaire</h1>

      <h2>Entrer les données</h2>
      <input
        type="text"
        placeholder="Ex: 30, 35, 40, 45"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "300px", padding: "5px" }}
      />

      <button onClick={handleConvert}>Valider</button>

      <h2>Données</h2>
      <pre>{JSON.stringify(data)}</pre>

      <h2>Moyenne mobile</h2>
      <pre>{JSON.stringify(ma)}</pre>

      <h2>Moindres carrés (régression)</h2>
{regression ? (
  <p>
    y = {regression.a.toFixed(2)}x + {regression.b.toFixed(2)}
  </p>
) : (
  <p>Pas assez de données</p>
)}
    </div>
  );
}