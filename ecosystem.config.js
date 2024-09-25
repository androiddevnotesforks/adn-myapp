module.exports = {
  apps: [{
    name: 'myapp',
    script: './bin/www',
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};