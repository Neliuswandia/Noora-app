import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'noora.app',
  appName: 'noora-app',
  webDir: 'dist',
  plugins: {
    LiveUpdate: {
      appId: "4b78402f-ea36-4f46-8297-659a0ab076e3"
    }
  }
};

export default config;
