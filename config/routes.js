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
  .get(boardsController.index)
  .post(secureRoute, boardsController.create);

router.route('/boards/:id')
  .get(boardsController.show)
  .get(secureRoute, boardsController.index)
  .post(secureRoute, boardsController.create);

//PIN ROUTES
router.route('/pins')
  .get(pinsController.index)
  .post(secureRoute, pinsController.create);

router.route('/pins/:id')
  .get(pinsController.show)
  .get(secureRoute, pinsController.index)
  .post(secureRoute, pinsController.create);

//USER ROUTES
router.route('/users')
  .get(secureRoute, usersController.index);

router.route('/users/:id')
  .get(secureRoute, usersController.show)
  .put(secureRoute, usersController.update)
  .delete(secureRoute, usersController.delete);

module.exports = router;
