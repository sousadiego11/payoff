import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.route.tsx"),
    route("/checkout/:productId/:userSession", "routes/checkout.route.tsx"),
    route("/payment-intent/:productId/:userSession", "routes/payment-intent.route.tsx"),
    route("/payment-processed", "routes/payment-processed.route.tsx"),
] satisfies RouteConfig;
