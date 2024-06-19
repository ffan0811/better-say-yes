import type { Stripe } from "stripe";
import Link from "next/link";

import { stripe } from "@/lib/stripe/stripe";
import Layout from "@/components/Layout";
import ResponsiveWrapper from "@/components/ResponsiveWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
// import DonationDetector from "@/app/_components/donationDetector";

export default async function PaymentCompleted({
  searchParams,
}: {
  searchParams: { session_id: string };
}): Promise<JSX.Element> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Cannot find user data. Please login again.");
  }

  if (!searchParams.session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent"],
    });

  const paymentIntent: {
    id: string;
    amount: number;
    amount_received: number;
    currency: string;
    created: number;
    status: string;
  } = checkoutSession.payment_intent as Stripe.PaymentIntent;

  const contentId = checkoutSession?.client_reference_id || "undefined";

  const { data, error } = await supabase
    .from("contents")
    .update({ status: "active" })
    .eq("id", contentId);

  const { error: storePaymentError } = await supabase.from("payments").upsert({
    stripe_id: paymentIntent.id,
    amount: paymentIntent.amount_received,
  });

  console.log("error", error, storePaymentError);

  const isError = error || storePaymentError;

  return (
    <Layout>
      <ResponsiveWrapper>
        <Card>
          <CardHeader>
            <CardTitle>
              {isError ? "Failed" : "Success! Your Custom Page is Ready"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              {isError
                ? "Your payment was successful! Unfortunately, the page didn't go live. Please refresh and try again. If the issue persists, contact us with your Order ID."
                : "Thank you for your purchase! Your custom page is now live. Click the button below to open and share it."}
            </p>
            {!isError && (
              <div className="mt-4 text-center">
                <Link
                  href={`/my/${contentId}`}
                  target="_blank"
                  className={buttonVariants({ variant: "default" })}
                >
                  Open and Enjoy!
                </Link>
              </div>
            )}
            <p className="mt-10 opacity-70">
              If you encounter any issues or have any questions, please don't
              hesitate to contact our support team. Make sure to include your
              Order ID for faster assistance.
            </p>
            <p>Your Order ID: {`${paymentIntent.id}`}</p>
            {/* {userId && <DonationDetector userId={userId} data={paymentIntent} />} */}
            {/* <p>{JSON.stringify(paymentIntent)}</p> */}
          </CardContent>
        </Card>
      </ResponsiveWrapper>
    </Layout>
  );
}
