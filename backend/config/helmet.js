const crypto = require('crypto');
const helmet = require('helmet');


const helmetMiddleware = (req, res, next) => {

    // Generate a random nonce value
    const nonce = crypto.randomBytes(16).toString('base64');
    res.locals.nonce = nonce;

    helmet({
        xPoweredBy: false,
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                defaultSrc: ["'self'"],//This means that resources can only be loaded from the same domain as the web page.
                "style-src": ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`, 'maxcdn.bootstrapcdn.com', "cdn.jsdelivr.net"],// Here we're passing nonce and some white listed hosts.
                "font-src": ["'self'", "use.fontawesome.com", "*.cloudfront.net"],
                "form-action": ["'self'", "accounts.pabbly.com", "payments.pabbly.com", "connect.pabbly.com", "emails.pabbly.com", "forms.pabbly.com", "verify.pabbly.com", "cdn.heapanalytics.com"],
                "frame-src": ["'self'"],
            },
        },
    })(req, res, next);
};

module.exports = helmetMiddleware;