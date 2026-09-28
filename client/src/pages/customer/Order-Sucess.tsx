
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

/* Confetti dot config */
const confettiDots = [
  { color: "bg-yellow-400", top: "8%",  left: "10%", size: "h-4 w-4", anim: "animate-bounce" },
  { color: "bg-pink-400",   top: "12%", left: "80%", size: "h-3 w-3", anim: "animate-ping"   },
  { color: "bg-blue-400",   top: "20%", left: "5%",  size: "h-2 w-2", anim: "animate-bounce" },
  { color: "bg-green-400",  top: "6%",  left: "55%", size: "h-3 w-3", anim: "animate-ping"   },
  { color: "bg-purple-400", top: "15%", left: "90%", size: "h-4 w-4", anim: "animate-bounce" },
  { color: "bg-orange-400", top: "75%", left: "8%",  size: "h-3 w-3", anim: "animate-ping"   },
  { color: "bg-red-400",    top: "80%", left: "85%", size: "h-4 w-4", anim: "animate-bounce" },
  { color: "bg-teal-400",   top: "85%", left: "50%", size: "h-2 w-2", anim: "animate-ping"   },
  { color: "bg-indigo-400", top: "70%", left: "92%", size: "h-3 w-3", anim: "animate-bounce" },
  { color: "bg-rose-400",   top: "5%",  left: "35%", size: "h-2 w-2", anim: "animate-ping"   },
  { color: "bg-cyan-400",   top: "90%", left: "20%", size: "h-4 w-4", anim: "animate-bounce" },
  { color: "bg-lime-400",   top: "60%", left: "3%",  size: "h-3 w-3", anim: "animate-ping"   },
];

export default function CustomerOrderSuccessPage() {
  const [orderNumber] = useState(
    () => `#CC-${Math.floor(100000 + Math.random() * 900000)}`
  );

  return (
    /* Page wrapper with gradient */
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4">

      {/* Confetti dots */}
      {confettiDots.map((dot, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute rounded-full opacity-70 ${dot.color} ${dot.size} ${dot.anim}`}
          style={{ top: dot.top, left: dot.left }}
        />
      ))}

      {/* Card */}
      <div className="relative z-10 w-full max-w-xl space-y-7 rounded-2xl border border-border bg-card/90 p-10 text-center shadow-2xl backdrop-blur-sm">

        {/* Pulsing success icon */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          {/* Outer ping ring */}
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-25" />
          {/* Inner solid circle */}
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 animate-bounce text-green-600" />
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">🎉</span>
            <h1 className="text-2xl font-bold text-foreground">Order Placed Successfully!</h1>
            <span className="text-2xl">🎉</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your payment is complete and your order is confirmed.
          </p>
        </div>

        {/* Order details */}
        <div className="rounded-xl border border-dashed border-green-300 bg-green-50 px-6 py-4 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600">
            Order Number
          </p>
          <p className="text-xl font-bold text-green-700">{orderNumber}</p>
          <p className="text-xs text-muted-foreground mt-1">
            📦 Estimated delivery:{" "}
            <span className="font-medium text-foreground">3–5 business days</span>
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            render={<Link to="/collections" />}
            className="rounded-full px-6"
          >
            Continue Shopping
          </Button>
          <Button
            render={<Link to="/" />}
            variant="outline"
            className="rounded-full px-6"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
