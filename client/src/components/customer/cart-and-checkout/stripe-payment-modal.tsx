import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCustomerCartAndCheckoutStore } from "@/features/customer/cart-and-checkout/store";
import { confirmStripeCheckout } from "@/features/customer/cart-and-checkout/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Load Stripe once outside of render to avoid reloading it on every change
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

interface StripePaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientSecret: string;
  paymentIntentId: string;
  orderId: string;
}

export function StripePaymentModal({
  open,
  onOpenChange,
  clientSecret,
  paymentIntentId,
  orderId,
}: StripePaymentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
        </DialogHeader>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            orderId={orderId}
            paymentIntentId={paymentIntentId}
            onClose={() => onOpenChange(false)}
          />
        </Elements>
      </DialogContent>
    </Dialog>
  );
}

interface CheckoutFormProps {
  orderId: string;
  paymentIntentId: string;
  onClose: () => void;
}

function CheckoutForm({ orderId, paymentIntentId, onClose }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { clearStripeCheckout, setOpen: setDrawerOpen, setCart } = useCustomerCartAndCheckoutStore();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    const toastId = toast.loading("Processing payment...");

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-success`,
        },
        redirect: "if_required",
      });

      if (error) {
        toast.error(error.message || "Payment failed", { id: toastId });
        setProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        // Call backend to verify and confirm payment status
        const result = await confirmStripeCheckout({
          orderId,
          paymentIntentId,
        });

        if (result._id) {
          toast.success("Payment successful! Your order has been placed.", { id: toastId });
          clearStripeCheckout();
          setDrawerOpen(false);
          setCart({ items: [], totalQuantity: 0 }); // Clear client-side cart
          navigate("/order-success");
        } else {
          throw new Error("Failed to verify order on server");
        }
      } else {
        toast.error("Payment status is: " + (paymentIntent?.status || "unknown"), { id: toastId });
        setProcessing(false);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "An unexpected error occurred during confirmation.", { id: toastId });
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={processing}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!stripe || processing}
        >
          {processing ? "Processing..." : "Pay Now"}
        </Button>
      </div>
    </form>
  );
}
