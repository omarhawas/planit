// config/webpack/environment.js

const { environment } = require('@rails/webpacker');

environment.config.set('node', {
  __dirname: true,
  __filename: true,
  global: true,
  // Remove unsupported properties like dgram, fs, etc.
});

module.exports = environment;
