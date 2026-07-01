import { createAPIFileRoute } from "@tanstack/react-start/api";
import crypto from "crypto";

export const APIRoute = createAPIFileRoute("/api/lemonsqueezy/webhook")({
  POST: async ({ request }) => {
    try {
      const signature = request.headers.get("x-signature");

      if (!signature) {
        return new Response(JSON.stringify({ error: "Missing x-signature header" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

      if (!webhookSecret) {
        return new Response(
          JSON.stringify({ error: "Webhook secret is not configured on this server." }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Read raw request body to verify Lemon Squeezy signature
      const rawBody = await request.text();

      // Verify HMAC-SHA256 signature
      const hmac = crypto.createHmac("sha256", webhookSecret);
      const digest = hmac.update(rawBody).digest("hex");

      if (signature !== digest) {
        console.error("Lemon Squeezy webhook signature verification failed!");
        return new Response(JSON.stringify({ error: "Invalid webhook signature" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const event = JSON.parse(rawBody);
      const eventName = event.meta?.event_name;
      const attributes = event.data?.attributes;
      const customData = attributes?.custom_data;

      // Extract user details
      const customerEmail = attributes?.user_email || customData?.email;
      const plan = customData?.plan;

      console.log(`[Lemon Squeezy Webhook] Event: ${eventName} for ${customerEmail}`);

      switch (eventName) {
        case "order_created":
        case "subscription_created":
        case "subscription_payment_success": {
          if (customerEmail) {
            console.log(`[Lemon Squeezy Webhook] Provisioning PRO access to user ${customerEmail}.`);
            // TODO: INTEGRATE YOUR DATABASE HERE
            // Example:
            // await db.user.update({
            //   where: { email: customerEmail },
            //   data: { tier: 'pro', lemonsqueezyCustomerId: event.data.attributes.customer_id }
            // });
          }
          break;
        }

        case "subscription_cancelled":
        case "subscription_expired":
        case "subscription_payment_failed": {
          if (customerEmail) {
            console.log(`[Lemon Squeezy Webhook] Revoking PRO access from user ${customerEmail}.`);
            // TODO: INTEGRATE YOUR DATABASE HERE
            // Example:
            // await db.user.update({
            //   where: { email: customerEmail },
            //   data: { tier: 'free' }
            // });
          }
          break;
        }

        default:
          console.log(`[Lemon Squeezy Webhook] Event ${eventName} is unhandled.`);
      }

      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      console.error("Webhook processing error:", error);
      return new Response(JSON.stringify({ error: "Webhook handler failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
});
