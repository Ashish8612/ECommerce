import Razorpay from "razorpay";

function checkEnv(name: string): string {
  const extractValue = process.env[name];

  if (!extractValue) {
    // Return a dummy non-empty string to satisfy Razorpay SDK validation at startup
    return `dummy_${name.toLowerCase()}`;
  }

  return extractValue;
}

export const razorpay = new Razorpay({
  key_id: checkEnv("RAZORPAY_KEY_ID"),
  key_secret: checkEnv("RAZORPAY_KEY_SECRET"),
});

export function toSubUnits(amount: number) {
  return Math.round(amount * 100);
}
