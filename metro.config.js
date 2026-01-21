// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('glb', 'gltf', 'png', 'jpg');

// Resolver para evitar duplicados de three.js
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
};

module.exports = config;