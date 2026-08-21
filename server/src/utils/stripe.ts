import Stripe from "stripe";

function checkEnv(name: string): string {
  const extractValue = process.env[name];

  if (!extractValue) {
    return `dummy_${name.toLowerCase()}`;
  }

  return extractValue;
}

export const stripe = new Stripe(checkEnv("STRIPE_SECRET_KEY"));
