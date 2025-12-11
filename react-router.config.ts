import { vercelPreset } from '@vercel/react-router/vite';
import type { Config } from '@react-router/dev/config';

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  basename: "/app", // Now the React Router app will be mounted on /app
  ssr: true,
  presets: [vercelPreset()],
} satisfies Config;