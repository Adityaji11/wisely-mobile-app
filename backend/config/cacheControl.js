// cacheControlMiddleware.js
const cacheControlMiddleware = (req, res, next) => {
    const filetypes = /\.(js|css|jpg|jpeg|png|gif|ico|woff|woff2|ttf|txt|xml)$/i;
    if (filetypes.test(req.url)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // Adjust the cache duration as needed
    } else {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    }
    next();
};

module.exports = cacheControlMiddleware;