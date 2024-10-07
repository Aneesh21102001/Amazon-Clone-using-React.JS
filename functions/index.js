const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const {response} = require("express");
const stripe = require("stripe")("sk_test_51PxODLRtnoJXznJkxMHuUG2isJZsGodxCSiRR76IIqg3vB7nQXF6ndIQAfTMB1SrsHXmk2L3cefenvfEFnzFXNLU00wM1n5ROB");

// API

// App config
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("hello"));
app.post("/payments/create", async (request, response) =>{
  const total = request.query.total;
  console.log("Payment Request Received BOOM!!! >>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command for v2 Functions
exports.api = onRequest(app);

// http://127.0.0.1:5001/clone-5da2c/us-central1/api
