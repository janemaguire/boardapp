const router = require('express').Router();
const authController = require('../controllers/auth');
const boardsController = require('../controllers/boards');
const pinsController = require('../controllers/pins');

router
  .post('/login', authController.login)
  .post('/register', authController.register);

//BOARD ROUTES
router.route('/boards')
  .get(boardsController.index)
  .post(boardsController.create);

router.route('/boards/:id')
  .get(boardsController.show)
  .put(boardsController.update)
  .delete(boardsController.delete);

//PIN ROUTES
router.route('/pins')
  .get(pinsController.index)
  .post(pinsController.create);

router.route('/pins/:id')
  .get(pinsController.show)
  .put(pinsController.update)
  .delete(pinsController.delete);

module.exports = router;
