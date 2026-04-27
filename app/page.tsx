"use client";

import { useState } from "react";
import {
  movingAverageAligned,
  leastSquaresFromMovingAverage
} from "../lib/math";
import Chart from "../components/Chart";

export default function Home() {
  const [input, setInput] = useState("");
  const [windowSize, setWindowSize] = useState(5);
  const [data, setData] = useState<number[]>([]);

  const handleConvert = () => {
    const values = input
      .split(",")
      .map((v) => parseFloat(v.trim()))
      .filter((v) => !isNaN(v));

    setData(values);
  };

  const movingAvg =
    data.length >= windowSize
      ? movingAverageAligned(data, windowSize)
      : [];

  const regression =
    movingAvg.length > 0
      ? leastSquaresFromMovingAverage(movingAvg)
      : null;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const tableData = data.map((value, index) => {
    const xi = index + 1;
    const yi = movingAvg[index];

    let Xi = null;
    let XiYi = null;
    let Xi2 = null;
    let adjusted = null;

    if (regression && yi !== null) {
      const validIndex = regression.validPoints.findIndex(
        (p) => p.x === xi
      );

      if (validIndex !== -1) {
        Xi = regression.X[validIndex];
        XiYi = Xi * yi;
        Xi2 = Xi * Xi;
        adjusted = regression.a * Xi + regression.b;
      }
    }

    let trendPoint = "-";
    if (yi !== null) {
      const letter = letters[index] || "?";
      trendPoint = `${letter}(${xi}, ${yi.toFixed(1)})`;
    }

    return {
      xi,
      production: value,
      yi,
      Xi,
      XiYi,
      Xi2,
      trendPoint,
      adjusted
    };
  });

  const ecarts = [3, 9].map((mois) => {
    const row = tableData.find((r) => r.xi === mois);
    if (!row || row.yi === null || row.adjusted === null)
      return null;

    return {
      mois,
      ecart: row.yi - row.adjusted
    };
  });

  return (
    <div style={{ maxWidth: 1100, margin: "auto", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>
        📊 Prévision budgétaire
      </h1>

      {/* INPUTS */}
      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          marginBottom: 20
        }}
      >
        <input
          type="text"
          placeholder="Ex: 45,47,45,44..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: 10,
            width: 350,
            borderRadius: 8,
            border: "1px solid #ccc"
          }}
        />

        <input
          type="number"
          value={windowSize}
          onChange={(e) =>
            setWindowSize(Number(e.target.value))
          }
          style={{
            padding: 10,
            width: 80,
            borderRadius: 8,
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={handleConvert}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer"
          }}
        >
          Valider
        </button>
      </div>

      {/* TABLEAU */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white"
          }}
        >
          <thead style={{ background: "#2563eb", color: "white" }}>
            <tr>
              <th>xi</th>
              <th>Production</th>
              <th>Yi (MM)</th>
              <th>Xi</th>
              <th>XiYi</th>
              <th>Xi²</th>
              <th>Trend</th>
              <th>Ajusté</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((row, i) => (
              <tr key={i} style={{ textAlign: "center" }}>
                <td>{row.xi}</td>
                <td>{row.production}</td>
                <td>{row.yi?.toFixed(2) ?? "-"}</td>
                <td>{row.Xi ?? "-"}</td>
                <td>{row.XiYi?.toFixed(2) ?? "-"}</td>
                <td>{row.Xi2 ?? "-"}</td>
                <td>{row.trendPoint}</td>
                <td>{row.adjusted?.toFixed(2) ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* GRAPH */}
      {tableData.length > 0 && (
        <>
          <h2 style={{ marginTop: 30 }}>Graphique</h2>
          <Chart
            tableData={tableData.map((r) => ({
              xi: r.xi,
              yi: r.production,
              moyenne: r.yi,
              adjusted: r.adjusted
            }))}
          />
        </>
      )}

      {/* ECARTS */}
      <h2>Écarts</h2>
      <ul>
        {ecarts.map(
          (e, i) =>
            e && (
              <li key={i}>
                Mois {e.mois} : {e.ecart.toFixed(3)}
              </li>
            )
        )}
      </ul>

      {/* EQUATION */}
      {regression && (
        <h2>
          Équation : y = {regression.a.toFixed(3)}X +{" "}
          {regression.b.toFixed(3)}
        </h2>
      )}
    </div>
  );
}