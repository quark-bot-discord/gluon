export default function sleep(period) {
  return new Promise((resolve, reject) => setTimeout(resolve, period));
}
