import express from "express";
import dotenv from "dotenv";
import stripe from "stripe";

// Load environment variables
dotenv.config();

const app = express();
const stripeGateway = stripe(process.env.STRIPE_SECRET);
const DOMAIN = process.env.DOMAIN;

app.use(express.static("public"));
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

// Success route
app.get("/success", (req, res) => {
  res.sendFile("success.html", { root: "public" });
});

// Cancel route
app.get("/cancel", (req, res) => {
  res.sendFile("cancel.html", { root: "public" });
});

// Stripe checkout route
app.post("/stripe-checkout", async (req, res) => {
  const { items } = req.body;

  const lineItems = items.map((item) => {
    const unitAmount = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * 100;
    console.log("Item price:", item.price);
    console.log("Unit amount:", unitAmount);

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.productImg],
        },
        unit_amount: unitAmount,
      },
      quantity: item.quantity,
    };
  });

  console.log("Line items:", lineItems);

  try {
    const session = await stripeGateway.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${DOMAIN}/success`,
      cancel_url: `${DOMAIN}/cancel`,
      line_items: lineItems,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// import express from "express";
// import dotenv from "dotenv";
// import stripe from 'stripe';
// //load variable
// dotenv.config();

// const app = express();

// app.use(express.static("public"));
// app.use(express.json());

// // home route
// app.get("/", (req, res) => {
//   res.sendFile("index.html", { root: "public" });
// });

// // success
// app.get("/", (req, res) => {
//   res.sendFile("success.html", { root: "public" });
// });

// // cancel
// app.get("/", (req, res) => {
//   res.sendFile("cancel.html", { root: "public" });
// });

// //stripe
// let stripeGateway = stripe(process.env.stripe_api);
// let DOMAIN = process.env.DOMAIN;

// app.post('/stripe-checkout', async (req, res) => {
//     const lineItems = req.body.items.map((item)=> {
//         const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, "") * 100);
//         console.log("item-price:", item.price);
//         console.log("unitAmount:" unitAmount);
//         return {
//             price_data: {
//                 currency: "usd",
//                 product_data: {
//                     name: item.title,
//                     images: [item.productImg]
//                 },
//                 unit_amount: unitAmount,
//             },
//             quantity: item.quantity,

//         };

//     })
//     console.log("lineItems:", lineItems);

//     const session = await stripeGateway.checkout.sessions.create({
//         payment_method_type: ["card"],
//         mode: "payment",
//         success_url: "${DOMAIN}/success",
//         cancel_url: "${DOMAIN}/cancel",
//         line_items: lineItems,
//     })
//     res.json(session.url);
// })

// app.listen(3000, () => {
//   console.log("listening on port 3000;");
// });
