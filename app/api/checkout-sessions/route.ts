import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
// import * as Sentry from "@sentry/nextjs";

import type { Stripe } from "stripe";

import { stripe } from "@/lib/stripe/stripe";
import { handleError } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ message: "please login" }, { status: 400 });
    }

    const { contentId } = await request.json();

    if (!contentId) {
      return NextResponse.json({ message: "bad request" }, { status: 400 });
    }

    const stripeParams = {
      mode: "payment",
      line_items: [
        {
          price:
            process.env.VERCEL_ENV === "production"
              ? "price_1PQ2fBHszNRPHNEwcGLBaZwR"
              : "price_1PQ5kNHszNRPHNEwWjWhhSpJ",
          quantity: 1,
        },
      ],
      client_reference_id: contentId || undefined,
      success_url: `${headers().get(
        "origin"
      )}/payment/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headers().get("origin")}/create?id=${contentId}`,
    };

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(
        stripeParams as Stripe.Checkout.SessionCreateParams
      );
    return NextResponse.json({ data: checkoutSession });
  } catch (e) {
    const err = handleError(e);
    return NextResponse.json(err, { status: 500 });
  }
}
