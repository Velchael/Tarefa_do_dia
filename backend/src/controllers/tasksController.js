const tasksModel = require('../models/tasksModel');

const getAll = async (_request, response) => {
  return response.status(200).json({ message: 'controller esta tudo bem'});
};

module.exports = {
  getAll,
};