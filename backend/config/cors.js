const cors = require('cors');
const allowedDomain = process.env.ROOT_DOMAIN;
const corsOptions = {
    // origin: (origin, callback) => {
    //     // if (!origin) {
    //     //     // Allow requests with no origin if and only if you have a strong reason
    //     //     // to do so. Be aware of the security implications.
    //     //     const error = new Error('No origin not allowed by CORS');
    //     //     error.status = 403; // Set the desired status code
    //     //     return callback(error, false);
    //     // }

    //     const allowedDomains = ['localhost:1337', 'pabbly.com'];
    //     const regex = new RegExp(`^https?://([a-zA-Z0-9-]+\\.)*(${allowedDomains.join('|').replace(/\./g, '\\.')})$`);
    //     if (regex.test(origin)) {
    //         return callback(null, true);
    //     } else {
    //         const error = new Error('Not allowed by CORS');
    //         error.status = 403; // Set the desired status code
    //         return callback(error, false);
    //     }
    // },
    origin: "*",
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Content-Length, Accept-Encoding, X-Requested-With, Authorization',
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;