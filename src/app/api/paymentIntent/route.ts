import { getSession } from "@lib/session";
import { fetch_gateway } from "@src/actions";
import { NextResponse } from "next/server";
import Stripe from "stripe";
export async function POST(req: Request) {
  try {
    // 1. Get Stripe keys from your backend get_gateway API
      const stripe_cradencial=await fetch_gateway();
   const stripe = new Stripe(stripe_cradencial.secret_key, {
      apiVersion: stripe_cradencial.version || "2024-06-20",
    });
       // 2. Get user payment values
        const userinfo = (await getSession()) as any;
    const user_id = userinfo?.user?.user_id ?? "";
    const { amount, currency, email ,booking_ref_no, module_type} = await req.json();
    // 3. Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
    });
      // 3. Create token (like PHP)
    const invoiceUrl = `https://toptiertravel.vercel.app/hotel/invoice/${booking_ref_no}`;
    const tokenData = {
      booking_ref_no:booking_ref_no,
      price: amount,
      currency:currency,
      invoice_url:invoiceUrl,
      module_type:"hotels",
      user_id:user_id,
     client_email:email
    };
    const token = Buffer.from(JSON.stringify(tokenData)).toString("base64");

    // 4. Create success URL
    const root = process.env.NEXT_PUBLIC_BASE_URL || "https://toptiertravel.vercel.app/";
    const success_url = `${root}payment/success/?token=${token}&gateway=stripe&type=0&key=&trx_id=${paymentIntent.id}`;

    // 5. Send response
    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentId: paymentIntent.id,
      success_url,
      token,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}