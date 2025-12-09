import { Hono } from "hono";
import { createHonoServer } from "react-router-hono-server/node";

const app = new Hono()

app.get("/api/webhook", async (c) => {
    // Handle webhook
    return c.text("Webhook received");
})

export default createHonoServer({
    app
})