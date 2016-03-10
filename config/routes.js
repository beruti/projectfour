var express = require('express'),
    router  = express.Router();

var usersController = require('../controllers/usersController');
var contactsController = require('../controllers/contactsController');
var authenticationsController = require('../controllers/authenticationsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex)
 
router.route('/users')
  .get(usersController.usersIndex)
//   .post(usersController.usersCreate)

router.route('/users/:id') 
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete)

router.route('/contacts')
  .get(contactsController.contactsIndex)
  .post(contactsController.contactsCreate)

router.route('/contacts/:id') 
  .get(contactsController.contactsShow)
  .patch(contactsController.contactsUpdate)
  .delete(contactsController.contactsDelete)

module.exports = router;