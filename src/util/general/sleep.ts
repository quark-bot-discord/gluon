export default function sleep(period: any) {
  return new Promise((resolve, reject) => setTimeout(resolve, period));
}
