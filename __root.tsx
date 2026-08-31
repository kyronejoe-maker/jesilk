import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteShell } from "@/components/layout/site-shell";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "Jesilk";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: "Jesilk — luxury vintage and premium silk scarves. Timeless beauty. Pure silk. 90 × 90 cm." },
      { name: "theme-color", content: "#f5f2ec" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <SiteShell>
            <Outlet />
          </SiteShell>
          <Toaster
            position="bottom-center"
            toastOptions={{
              className: "font-sans text-sm",
              style: { background: "#212121", color: "#f5f2ec", border: "none" },
            }}
          />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
