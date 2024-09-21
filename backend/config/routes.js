const fs = require('fs');
const path = require('path');
const sessionAuth = require('../src/middlewares/sessionAuth');
const basicAuth = require('../src/middlewares/basicAuth');
const jwtAuth = require('../src/middlewares/jwtAuth');

const csrf = require('csurf');
// CSRF protection middleware
const csrfProtection = csrf({ cookie: true });

function loadRoutes(app) {
    // Read the routes directory
    const routesDir = path.join(__dirname, '../src/routes');
    const routeFiles = fs.readdirSync(routesDir);

    // Dynamically import and bind routes
    routeFiles.forEach(file => {
        if (file.endsWith('.js')) {

            const moduleName = file.split('.')[0];//Getting name of the file
            const routePath = `/${moduleName}`;//File name will be the prefix of the routes mentioned inside the file.
            const routeModule = require(path.join(routesDir, file));
            const excludeSessionRoutes = ["/auth"];//You can mention here public route which should work without session authentication.

            /**
             * Setting meta data for router controllers
             * Here we're setting the route prefix (File Name)
             * Which will gonna used to create a activity log
             */
            const setRouteOptions = (req, res, next) => {
                req.routeOptions = {
                    module_name: moduleName
                };
                next();
            };

            if (moduleName === "api") {
                /**
                * For REST API's
                */
                return app.use(`${routePath}/v1`, setRouteOptions, basicAuth, routeModule);

                /**
                 * JWT auth example
                 * Just replace the basicAuth middleware to the jwtAuth middleware.
                 * app.use(`/v1${routePath}`, setRouteOptions, jwtAuth, routeModule);
                 */
            }


            /**
            * Excluding public routes
            */
            if (excludeSessionRoutes.includes(routePath)) {
                return app.use(routePath, routeModule);
            }

            /**
             * For session based authentication.
             */
            return app.use(routePath, setRouteOptions, sessionAuth, csrfProtection, routeModule);
        }
    });
}

module.exports = loadRoutes;