const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/backend/UsersController');

router.post('/', UsersController.create);
router.get('/', UsersController.getAll);
router.get('/:user_id', UsersController.getOne);
router.put('/:user_id', UsersController.updateOne);
router.delete('/:user_id', UsersController.deleteOne);

module.exports = router;