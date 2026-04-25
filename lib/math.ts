export function movingAverage(data: number[], windowSize: number): number[] {
  let result: number[] = [];

  for (let i = 0; i <= data.length - windowSize; i++) {
    let sum = 0;

    for (let j = 0; j < windowSize; j++) {
      sum += data[i + j];
    }

    result.push(sum / windowSize);
  }

  return result;
}

export function leastSquares(data: number[]) {
  const n = data.length;
  const x = Array.from({ length: n }, (_, i) => i);

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = data.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * data[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);

  const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
  const b = (sumY - a * sumX) / n;

  return { a, b };
}