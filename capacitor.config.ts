import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "farm-fencing-app",
  webDir: "dist",
  ios: {
    contentInset: "always",
  },
};

export default config;
