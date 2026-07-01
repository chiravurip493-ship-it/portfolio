import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/lemonsqueezy/portal")({
  POST: async ({ request }) => {
    try {
      const { email } = await request.json();

      if (!email) {
        return new Response(JSON.stringify({ error: "Email is required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
      const storeId = process.env.LEMON_SQUEEZY_STORE_ID;

      if (!apiKey || !storeId) {
        return new Response(
          JSON.stringify({ error: "Lemon Squeezy credentials are not configured" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // 1. Fetch user's subscriptions from Lemon Squeezy to find a direct portal link
      // Lemon Squeezy API supports filtering subscriptions by email
      const subsResponse = await fetch(`https://api.lemonsqueezy.com/v1/subscriptions?filter[email]=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          "Accept": "application/vnd.api+json",
          "Authorization": `Bearer ${apiKey}`,
        },
      });

      let portalUrl = "";

      if (subsResponse.ok) {
        const subsData = await subsResponse.json();
        // If they have an active subscription, extract the customer_portal URL
        if (subsData.data && subsData.data.length > 0) {
          portalUrl = subsData.data[0].attributes?.urls?.customer_portal;
        }
      }

      // 2. Fallback: If no active subscription or direct portal URL is found,
      // redirect them to the general Store-wide billing portal.
      // Customers can enter their email there, and Lemon Squeezy will email them a secure portal link.
      if (!portalUrl) {
        // You can set VITE_LEMON_SQUEEZY_STORE_NAME in env, or build it using the Store ID.
        // Let's use the Store ID or fallback to standard sub-domain billing.
        const storeName = process.env.LEMON_SQUEEZY_STORE_NAME || "my-store";
        portalUrl = `https://${storeName}.lemonsqueezy.com/billing`;
      }

      return new Response(JSON.stringify({ url: portalUrl }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      console.error("Error creating portal redirect:", err);
      return new Response(JSON.stringify({ error: err.message || "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
});
