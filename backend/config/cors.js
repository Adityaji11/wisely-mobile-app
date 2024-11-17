const cors = require('cors');

const allowedDomains = ['http://localhost:3000', 'http://localhost:9000'];
const regex = new RegExp(`^https?://([a-zA-Z0-9-]+\\.)*(${allowedDomains.join('|').replace(/\./g, '\\.')})$`);

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g., Postman or server-to-server requests)
        if (!origin) {
            return callback(null, true);
        }

        if (regex.test(origin)) {
            return callback(null, true);
        } else {
            const error = new Error('Not allowed by CORS');
            error.status = 403; // Set the desired status code
            return callback(error, false);
        }
    },
    origin: true, // Temporarily allow all origins
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    allowedHeaders: 'Content-Type, Content-Length, Accept-Encoding, X-Requested-With, Authorization , x-csrf-token',
    credentials: true, // Include credentials
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
