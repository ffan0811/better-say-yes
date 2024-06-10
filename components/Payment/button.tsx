"use client";
import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import getStripe from "@/lib/stripe/get-stripe";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export default function PaymentButton() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  const handlePayment = async () => {
    if (!user) {
      alert("Please log in");
    }
    try {
      const stripe = await getStripe();

      const res = await fetch(`/api/checkout-sessions`, {
        method: "POST",
        body: JSON.stringify({
          userId: user.id,
        }),
      });
      if (!res.ok) {
        throw Error(res.statusText);
      }
      const { data } = await res.json();

      const { error } = await stripe!.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: data.id,
      });
      if (error) {
        throw Error(error.message);
      }
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
    } catch (e) {
      console.error("checkoutSession", e);
      // error = e;
      // toast(`${FAIL_PAYMENT}: ${error.message}`, {
      //   type: "error",
      // });
    }
  };

  return (
    <Button className="w-full" onClick={handlePayment}>
      Pay and Launch
    </Button>
  );
}
