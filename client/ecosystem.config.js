let deploy = {};
try {
    deploy = require('./ecosystem.deploy');
} catch (err) {
    console.log('No deploy loaded');
}

module.exports = {
    apps : [{
        name: 'web',
        script: 'src/index.js',

        // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
        // args: 'one two',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '500M',
        env: {
            NODE_ENV: 'development',
        },
        env_production: {
            NODE_ENV: 'production',
        }
    }],

    deploy
};
