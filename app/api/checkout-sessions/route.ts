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

    const { contentId, priceId } = await request.json();

    if (!contentId || !priceId) {
      return NextResponse.json({ message: "bad request" }, { status: 400 });
    }

    const customers = await stripe.customers.search({
      query: `email:\'${user.email}\'`,
    });

    let customerId = "";
    if (customers.data.length === 0) {
      const customer = await stripe.customers.create({
        email: user.email,
      });
      customerId = customer.id;
    } else if (customers.data.length === 1) {
      customerId = customers.data[0].id;
    }

    const stripeParams = {
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      client_reference_id: contentId || undefined,
      success_url: `${headers().get(
        "origin"
      )}/payment/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headers().get("origin")}/create?id=${contentId}`,
      allow_promotion_codes: true,
      customer: customerId || undefined,
      invoice_creation: {
        enabled: true,
      },
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
