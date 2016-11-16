const router = require('express').Router();
const authController = require('../controllers/auth');
const pinsController = require('../controllers/pins');

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

module.exports = router;
