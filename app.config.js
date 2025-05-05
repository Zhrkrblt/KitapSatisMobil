const { resolve } = require('path');
const os = require('os');

// Local IP adresini almak için
const getLocalIp = () => {
  const interfaces = os.networkInterfaces();
  for (const ifaceName in interfaces) {
    const iface = interfaces[ifaceName];
    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return 'localhost';
};

module.exports = {
  name: "Kitap Dünyası",
  slug: "kitap-satisi",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  extra: {
    apiUrl: `http://${getLocalIp()}:3000/api`
  },
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#007AFF"
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF"
    }
  },
  web: {
    favicon: "./assets/favicon.png"
  }
}; 