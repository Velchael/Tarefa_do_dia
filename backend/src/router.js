const express = require('express')
const router = express.Router();
const tasksController = require('./controllers/tasksController');
const tasksMiddleware = require('./middlewares/tasksMiddleware');
const usersController = require('./controllers/usersController');
router.get('/tasks/:registeruser', tasksController.getAll);
router.post('/tasks', tasksMiddleware.validateFieldTitle,tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id',
  tasksMiddleware.validateFieldTitle,
  tasksMiddleware.validateFieldStatus,
  tasksController.updateTask,
);
router.post('/users', usersController.createUsers);
router.get('/users/username/:username', usersController.getUserByUsername);
router.get('/users/email/:email', usersController.getUserByEmail);
module.exports = router;