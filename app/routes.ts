import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.route.tsx"),
    route("/checkout/:productId/:userSession", "routes/checkout.route.tsx"),
    route("/payment-intent/:productId/:userSession", "routes/payment-intent.route.tsx"),
    route("/payment-processed", "routes/payment-processed.route.tsx"),
    route("/api/purchases", "routes/api.purchases.tsx"),
    route("/api/stripe/webhook", "routes/api.stripe.webhook.tsx"),
] satisfies RouteConfig;
