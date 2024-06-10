import type { Stripe } from "stripe";
import Link from "next/link";

import { stripe } from "@/lib/stripe/stripe";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import Layout from "@/components/Layout";
import ResponsiveWrapper from "@/components/ResponsiveWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button/utils";
// import DonationDetector from "@/app/_components/donationDetector";

export default async function PaymentCompleted({
  searchParams,
}: {
  searchParams: { session_id: string };
}): Promise<JSX.Element> {
  if (!searchParams.session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent"],
    });

  const paymentIntent: {
    id: string;
    amount: number;
    currency: string;
    created: number;
    status: string;
  } = checkoutSession.payment_intent as Stripe.PaymentIntent;

  const userId = checkoutSession.client_reference_id;

  console.log("userId", userId);

  return (
    <Layout hasGap>
      <ResponsiveWrapper>
        <Card>
          <CardHeader>
            <CardTitle>Success! Your Custom Page is Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Thank you for your purchase. Your custom page has been
              successfully created and is now live. You can open and share your
              custom page by clicking the button below.
            </p>
            <div className="mt-4 text-center">
              <Link href="/" className={buttonVariants({ variant: "default" })}>
                Open and Enjoy!
              </Link>
            </div>
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
