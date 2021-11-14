import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionicKevin',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    cleartext: true,
    allowNavigation: ["localhost:8100/*"]
  }
}

  export default config;
