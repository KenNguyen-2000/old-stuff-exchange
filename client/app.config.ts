import { ExpoConfig } from 'expo/config';

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
  name: 'client',
  slug: 'client',
  extra: {
    apiUrl: process.env.API_URL,
  },
  ios: {
    infoPlist: {
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
      },
    },
    config: {
      usesNonExemptEncryption: false,
    },
  },
};

export default config;
