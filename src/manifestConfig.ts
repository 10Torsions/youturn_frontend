interface Icon {
  src: string;
  sizes: string;
  type: string;
  purpose: string;
}

interface Manifest {
  name: string;
  short_name: string;
  description: string;
  icons: Icon[];
  theme_color: string;
  background_color: string;
  display: "standalone" | "fullscreen" | "minimal-ui" | "browser";
  scope: string;
  start_url: string;
  orientation:
    | "any"
    | "natural"
    | "landscape"
    | "landscape-primary"
    | "landscape-secondary"
    | "portrait"
    | "portrait-primary"
    | "portrait-secondary";
}

interface ManifestForPlugIn {
  registerType: "prompt" | "autoUpdate";
  includeAssets: string[];
  manifest: Manifest;
}

export const manifestForPlugIn: ManifestForPlugIn = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Youturn",
    short_name: "youturn-rotation-app",
    description: "Youturn - Rotation manager",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon"
      },
      {
        src: "/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    theme_color: "#171717",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait"
  }
};
