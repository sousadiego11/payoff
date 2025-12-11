import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { reactRouterHonoServer } from "react-router-hono-server/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vercelPreset } from '@vercel/react-router/vite';

export default defineConfig({
  plugins: [tailwindcss(), reactRouterHonoServer(), reactRouter(), tsconfigPaths(), vercelPreset()],
});
