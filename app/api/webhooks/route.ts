import Stripe from "stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseBaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseServiceKey = process.env
  .NEXT_PUBLIC_SUPABASE_SERVICE_KEY as string;
const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string;
const stripeEndpointSecret = process.env
  .NEXT_PUBLIC_STRIPE_ENDPOINT_SECRET as string;

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-08-16",
  typescript: true,
});

export async function POST(request: NextRequest) {
  const reqHeaders = headers();
  const buf = await request.text();

  const webhookSignature = reqHeaders.get("stripe-signature");

  if (!webhookSignature) {
    return NextResponse.json(
      {
        error: true,
        message: "Stripe signature is missing in the request headers",
      },
      { status: 400 }
    );
  }

  let event = null;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      webhookSignature,
      stripeEndpointSecret!
    );
  } catch (error) {
    return NextResponse.json({ error: true, message: error?.message });
  }

  const supabase = createClient(supabaseBaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;
    const subscription = await stripe.subscriptions.retrieve(
      checkoutSession.subscription as string
    );
    console.log("SUBSC", subscription);
    const payload = {
      user_id: checkoutSession.client_reference_id,
      customer_id: checkoutSession.customer,
      payment_status: checkoutSession.payment_status,
      subscription_id: checkoutSession.subscription,
      current_period_start: new Date(subscription.current_period_start * 1000),
      current_period_end: new Date(subscription.current_period_end * 1000),
      subscription_status: subscription.status,
    };

    await supabase.from("subscriptions").insert(payload);
  }

  return NextResponse.json({ message: "Working" });
}
