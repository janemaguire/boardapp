const router = require('express').Router();
const authController = require('../controllers/auth');
const boardsController = require('../controllers/boards');
const usersController = require('../controllers/users');
const oauthController = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute');

router
  .post('/login', authController.login)
  .post('/register', authController.register)
  .post('/auth/facebook', oauthController.facebook)
  .post('/auth/instagram', oauthController.instagram);

//BOARD ROUTES
router.route('/boards')
  .get(boardsController.index)
  .post(secureRoute, boardsController.create);

router.route('/boards/:id')
  .get(boardsController.show)
  .put(secureRoute, boardsController.update)
  .delete(secureRoute, boardsController.delete);

router.route('/boards/:id/pins')
  .get(boardsController.pinIndex)
  .post(boardsController.pinCreate);

router.route('/boards/:id/pins/:pinId')
  .get(boardsController.pinShow)
  .put(boardsController.pinUpdate)
  .post(boardsController.pinCreate)
  .delete(boardsController.pinDelete);

//USER ROUTES
router.route('/users')
  .get(secureRoute, usersController.index);

router.route('/users/:id')
  .get(secureRoute, usersController.show)
  .put(secureRoute, usersController.update)
  .delete(secureRoute, usersController.delete);

module.exports = router;
