const router = require('express').Router();
const authController = require('../controllers/auth');
const boardsController = require('../controllers/boards');
const pinsController = require('../controllers/pins');
const usersController = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');

router
  .post('/login', authController.login)
  .post('/register', authController.register);

//BOARD ROUTES
router.route('/boards')
  .get(secureRoute, boardsController.index)
  .post(secureRoute, boardsController.create);

router.route('/boards/:id')
  .get(secureRoute, boardsController.show)
  .put(secureRoute, boardsController.update)
  .delete(secureRoute, boardsController.delete);

//PIN ROUTES
router.route('/pins')
  .get(secureRoute, pinsController.index)
  .post(secureRoute, pinsController.create);

router.route('/pins/:id')
  .get(secureRoute, pinsController.show)
  .put(secureRoute, pinsController.update)
  .delete(secureRoute, pinsController.delete);

router.route('/users')
  .get(secureRoute, usersController.index);

router.route('/users/:id')
  .get(secureRoute, usersController.show)
  .put(secureRoute, usersController.update)
  .delete(secureRoute, usersController.delete);

module.exports = router;
