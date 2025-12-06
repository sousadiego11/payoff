import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/checkout/:productId", "routes/checkout.tsx"),
    route("/payment-intent/:productId", "routes/payment-intent.tsx"),
] satisfies RouteConfig;
