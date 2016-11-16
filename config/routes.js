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
  .put(secureRoute, boardsController.update)
  .delete(secureRoute, boardsController.delete);

//PIN ROUTES
router.route('/pins')
  .get(pinsController.index)
  .post(secureRoute, pinsController.create);

router.route('/pins/:id')
  .get(pinsController.show)
  .put(secureRoute, pinsController.update)
  .delete(secureRoute, pinsController.delete);

//USER ROUTES
router.route('/users')
  .get(usersController.index);

router.route('/users/:id')
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.delete);

module.exports = router;
