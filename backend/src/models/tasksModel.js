const connection = require('./connection');

const getAll = async (registeruser) => {
  const [tasks] = await connection.execute('SELECT * FROM tasks WHERE registeruser = ?', [registeruser]);
  return tasks;
};

const createTask = async (task) => {
  const { registeruser, title } = task; // Agrega userId a los datos recibidos
  const dateUTC = new Date(Date.now()).toUTCString();

  const query = 'INSERT INTO tasks(registeruser, title, status, created_at) VALUES (?, ?, ?, ?)'; // Agrega registeruser a la consulta

  const [createdTask] = await connection.execute(query, [registeruser, title, 'pendente', dateUTC]);
  return { insertId: createdTask.insertId };
};

const deleteTask = async (id) => {
  const [removedTask] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
  return removedTask;
};

const updateTask = async (id, task) => {
  const { title, status } = task;
  
  const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';

  const [updatedTask] = await connection.execute(query, [title, status, id]);
  return updatedTask;
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};