import { data } from "../data/dataset";
import { movingAverage } from "../lib/math";

export default function Home() {
  const ma = movingAverage(data, 3);

  return (
    <div style={{ padding: 20 }}>
      <h1>Prévision budgétaire</h1>

      <h2>Données</h2>
      <pre>{JSON.stringify(data)}</pre>

      <h2>Moyenne mobile</h2>
      <pre>{JSON.stringify(ma)}</pre>
    </div>
  );
}