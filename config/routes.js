const router = require('express').Router();
const authController = require('../controllers/auth');
const boardsController = require('../controllers/boards');

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

module.exports = router;
