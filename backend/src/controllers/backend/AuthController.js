const {validationResult, body} = require('express-validator');
const {User} = require('../../models');
const Logs = require('../../utils/Logs');
const Helper = require('../../utils/Helper');
const Response = require('../../utils/Response');
const Accounts = require('../../utils/Accounts');

module.exports = {
  /**
   * This is use to login the user.
   * Only for the development
   * @param {*} req
   * @param {*} res
   */
  signin: async (req, res) => {
    try {
      const {email, password} = req.body;

      //Call signup api
      var [err, signIn] = await Helper.to(
        Accounts.singIn({
          email,
          password,
        }),
      );

      if (err) {
        throw err;
      }

      if (signIn.status === 'error') {
        throw signIn.message;
      }

      const user =
        signIn.data && signIn.data.customer ? signIn.data.customer : null;
      const token = signIn.data && signIn.data.token ? signIn.data.token : null;

      if (!user) {
        throw 'No user found!';
      }

      //Signup user if not exist.
      var [err, newUser] = await Helper.to(User.signUp(user.id));

      req.logIn(user, function (err) {
        if (err) {
          Logs.error(err);
          res.status(400).json(Response.error(err));
        }

        return res.send(Response.success('Logged in successfully', token));
      });
    } catch (err) {
      Logs.error(err);
      res.status(400).json(Response.error(err));
    }
  },

  /**
   * This is use to register the user.
   * Only for the development
   * @param {*} req
   * @param {*} res
   */

  signup: async (req, res) => {
    try {
      // Define your validation rules here
      const validationRules = [
        body('first_name', 'First name is required').notEmpty().escape(),
        body('last_name', 'Last name is required').notEmpty().escape(),
        body('email')
          .notEmpty()
          .withMessage('Email is required')
          .isEmail()
          .withMessage('Not a valid email')
          .escape(),
        body('password')
          .notEmpty()
          .withMessage('Password is required')
          .isLength({min: 6})
          .withMessage('Password must be at least 6 characters'),
      ];

      // Run the validation rules
      await Promise.all(validationRules.map(async rule => await rule.run(req)));

      // Get validation errors
      const errors = validationResult(req);

      // Check for validation errors
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json(Response.error('Fields are required.', errors.array()[0]));
      }

      // If validation passes, you can access validated data in req.body
      const {first_name, last_name, email, password} = req.body;

      //Call signup api
      var [err, signUp] = await Helper.to(
        Accounts.signUp({
          first_name,
          last_name,
          email,
          password,
          project: process.env.PROJECT_NAME,
        }),
      );

      if (err) {
        throw err;
      }

      if (signUp.status === 'error') {
        throw signUp.message;
      }

      //Call signup api
      var [err, signIn] = await Helper.to(
        Accounts.singIn({
          email,
          password,
        }),
      );

      if (err) {
        throw err;
      }

      if (signIn.status === 'error') {
        throw signIn.message;
      }

      const user =
        signIn.data && signIn.data.customer ? signIn.data.customer : null;
      const token = signIn.data && signIn.data.token ? signIn.data.token : null;

      if (!user) {
        throw 'No user found!';
      }

      //Signup user if not exist.
      var [err, newUser] = await Helper.to(User.signUp(user.id));

      req.logIn(user, function (err) {
        if (err) {
          Logs.error(err);
          res.status(400).json(Response.error(err));
        }

        // Respond with success message and created user data
        return res
          .status(201)
          .json(Response.success('User created successfully', token));
      });
    } catch (err) {
      Logs.error(err);
      res.status(400).json(Response.error(err));
    }
  },

  /**
   * This is use to logout the user.
   * @param {*} req
   * @param {*} res
   */

  logout: async (req, res) => {
    try {
      req.logout(err => {
        if (err) {
          Logs.error(err);
          res.status(400).json(Response.error(err));
        }

        req.session.destroy();
        return res.send(Response.success('Logged out successfully'));
      });
    } catch (err) {
      Logs.error(err);
      res.status(400).json(Response.error(err));
    }
  },

  /**
   * Token authentication to login user in the production.
   * @param {*} req
   * @param {*} res
   */

  tokenAuth: async function (req, res) {
    try {
      Logs.info('Token login');
      var token = req.query.token;

      if (!token) {
        throw 'Token code is required';
      }

      //Call tokenAuth api
      var [err, response] = await Helper.to(Accounts.tokenAuth(token));

      if (err) {
        throw err;
      }

      if (response.status !== 'success') {
        return res.redirect(process.env.ACCOUNT_BASE_URL);
      }

      const user = response.data;

      var [err, duser] = await Helper.to(User.findOne({user_id: user.id}));

      if (err) {
        throw err;
      }

      //Signup user if not exist.
      var [err, newUser] = await Helper.to(User.signUp(user.id));

      req.logIn(user, function (err) {
        if (err) {
          Logs.error(err);
          res.status(400).json(Response.error(err));
        }

        return res.send(Response.success('Logged in successfully'));
      });
    } catch (err) {
      Logs.error(err);
      res.status(400).json(Response.error(err));
    }
  },

  /**
   * Verify the user session
   * @param {*} req
   * @param {*} res
   * @returns
   */
  verifySession: async (req, res) => {
    try {
      // console.log('verifySession called');
      // console.log('req.user:', req.user);
      // console.log('req.session:', req.session);

      if (!req.user) {
        throw 'Invalid access';
      }
      return res.send(Response.success('Session active', req.user));
    } catch (err) {
      Logs.error(err);
      res.status(400).json(Response.error('Invalid session', err));
    }
  },
};
