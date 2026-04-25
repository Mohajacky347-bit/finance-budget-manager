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