import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { priceId, userId } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
      },
      success_url: "https://SEU-APP.vercel.app/sucesso.html",
      cancel_url: "https://SEU-APP.vercel.app/cancelado.html",
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Erro ao criar checkout" });
  }
}
