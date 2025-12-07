import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.route.tsx"),
    route("/checkout/:productId", "routes/checkout.route.tsx"),
    route("/payment-intent/:productId", "routes/payment-intent.route.tsx"),
] satisfies RouteConfig;
