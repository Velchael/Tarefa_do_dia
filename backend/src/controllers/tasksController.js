const tasksModel = require('../models/tasksModel');

const getAll = async (request, response) => {
  const { registeruser } = request.params;

  const tasks = await tasksModel.getAll(registeruser);
  //return response.status(200).json(tasks);

  if (tasks && tasks.length > 0) {
    return response.status(200).json(tasks); // 200 OK con la información del usuario
  } else {
    return response.status(404).json({ message: 'Tarefa not found' }); // 404 Not Found si el usuario no existe
  }
};

const createTask = async (request, response) => {
  const { registeruser, title } = request.body; 
  const createdTask = await tasksModel.createTask({ registeruser, title }); // Pasa userId a tasksModel
  return response.status(201).json(createdTask);
};

const deleteTask = async (request, response) => {
  const { id } = request.params;

  await tasksModel.deleteTask(id);
  return response.status(204).json();
};

const updateTask = async (request, response) => {
  const { id } = request.params;

  await tasksModel.updateTask(id, request.body);
  return response.status(204).json();
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
