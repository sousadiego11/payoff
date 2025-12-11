import { Hono } from "hono";
import { createHonoServer } from "react-router-hono-server/node";
import { api } from "./server/api";

const app = new Hono()
app.route('/api', api);
export default createHonoServer({
    app
})