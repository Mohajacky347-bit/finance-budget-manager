export function movingAverageAligned(
  data: number[],
  windowSize: number
): (number | null)[] {
  const result: (number | null)[] = Array(data.length).fill(null);
  const offset = Math.floor(windowSize / 2);

  for (let i = 0; i <= data.length - windowSize; i++) {
    let sum = 0;

    for (let j = 0; j < windowSize; j++) {
      sum += data[i + j];
    }

    result[i + offset] = sum / windowSize;
  }

  return result;
}

// 🔥 Régression sur les moyennes mobiles uniquement
export function leastSquaresFromMovingAverage(
  movingAvg: (number | null)[]
) {
  const validPoints = movingAvg
    .map((y, i) => (y !== null ? { x: i + 1, y } : null))
    .filter((p): p is { x: number; y: number } => p !== null);

  const n = validPoints.length;

  const median = Math.floor((n + 1) / 2);

  const X = validPoints.map((p, i) => i + 1 - median);
  const Y = validPoints.map((p) => p.y);

  const sumXY = X.reduce((sum, xi, i) => sum + xi * Y[i], 0);
  const sumX2 = X.reduce((sum, xi) => sum + xi * xi, 0);

  const a = sumXY / sumX2;
  const b = Y.reduce((a, b) => a + b, 0) / n;

  return { a, b, median, validPoints, X };
}