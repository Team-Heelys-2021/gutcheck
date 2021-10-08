const oktaClient = require('./oktaClient');

const authController = {
  register(req, res, next) {
    console.log('checking request body: ', req.body);
    if (!req.body) return res.sendStatus(400);
    const newUser = {
      profile: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        login: req.body.email,
      },
      credentials: {
        password: {
          value: req.body.password,
        },
      },
    };
    oktaClient
      .createUser(newUser)
      .then((user) => {
        res.status(201);
        res.send(user);
      })
      .catch((err) => {
        res.status(400);
        res.send(err);
      });
  },
};

module.exports = authController;
