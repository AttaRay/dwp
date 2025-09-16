const dns = require('dns');
const https = require('https');

function checkInternetConnectivity() {
    return new Promise((resolve) => {
        dns.lookup('api.telegram.org', (err) => {
            if (err) {
                console.error('DNS lookup failed:', err);
                resolve(false);
            } else {
                // Try to connect to Telegram API
                const req = https.get('https://api.telegram.org', (res) => {
                    resolve(true);
                    res.resume();
                });

                req.on('error', (err) => {
                    console.error('HTTPS connection failed:', err);
                    resolve(false);
                });

                req.end();
            }
        });
    });
}

module.exports = {
    checkInternetConnectivity
};
