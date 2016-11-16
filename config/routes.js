const router = require('express').Router();
const authController = require('../controllers/auth');
const pinsController = require('../controllers/pins');
const usersController = require('../controller/users');

router
  .post('/login', authController.login)
  .post('/register', authController.register);

router.route('/pins')
  .get(pinsController.index)
  .post(pinsController.create);

router.route('/pins/:id')
  .get(pinsController.show)
  .put(pinsController.update)
  .delete(pinsController.delete);

router.route('/users')
  .get(usersController.index);

router.route('/users/:id')
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.delete);

module.exports = router;
