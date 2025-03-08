export function sleep(period: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, period));
}
