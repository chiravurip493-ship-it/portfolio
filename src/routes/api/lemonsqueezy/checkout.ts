import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/lemonsqueezy/checkout")({
  POST: async ({ request }) => {
    try {
      const { email, name, plan, successUrl, cancelUrl } = await request.json();

      if (!email || !plan) {
        return new Response(JSON.stringify({ error: "Email and plan are required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
      const storeId = process.env.LEMON_SQUEEZY_STORE_ID;

      if (!apiKey || !storeId) {
        return new Response(
          JSON.stringify({ error: "Lemon Squeezy API key and Store ID are not configured on the server." }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      let variantId = "";
      if (plan === "monthly") {
        variantId = process.env.LEMON_SQUEEZY_VARIANT_MONTHLY || "";
      } else if (plan === "lifetime") {
        variantId = process.env.LEMON_SQUEEZY_VARIANT_LIFETIME || "";
      }

      if (!variantId) {
        return new Response(
          JSON.stringify({ error: `Variant ID not found for plan: ${plan}. Please set LEMON_SQUEEZY_VARIANT_MONTHLY or LEMON_SQUEEZY_VARIANT_LIFETIME.` }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Call Lemon Squeezy JSON:API to create a customized checkout session
      const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
        method: "POST",
        headers: {
          "Accept": "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          data: {
            type: "checkouts",
            attributes: {
              checkout_data: {
                email: email,
                name: name || "",
                custom: {
                  email: email,
                  plan: plan,
                },
              },
              product_options: {
                redirect_url: successUrl,
                enabled_variants: [parseInt(variantId)],
              },
            },
            relationships: {
              store: {
                data: {
                  type: "stores",
                  id: storeId,
                },
              },
              variant: {
                data: {
                  type: "variants",
                  id: variantId,
                },
              },
            },
          },
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Lemon Squeezy API error response:", errText);
        throw new Error(`Lemon Squeezy API replied with status code ${response.status}`);
      }

      const resData = await response.json();
      const checkoutUrl = resData.data?.attributes?.url;

      if (!checkoutUrl) {
        throw new Error("No URL returned from Lemon Squeezy API");
      }

      return new Response(JSON.stringify({ url: checkoutUrl }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      console.error("Error creating Lemon Squeezy checkout:", err);
      return new Response(JSON.stringify({ error: err.message || "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
});
