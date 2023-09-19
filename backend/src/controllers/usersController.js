const usersLogin = require('../models/usersLogin');

const createUsers = async (request, response) => {
  const createUsers = await usersLogin.createUsers(request.body);
  return response.status(201).json(createUsers);
};

const getUserByUsername = async (request, response) => {
  const { username } = request.params;
  const user = await usersLogin.getUserByUsername(username);

  if (user && user.length > 0) {
    return response.status(200).json({ message: 'User ja exite' }); // 200 OK con la información del usuario
  } else {
    return response.status(404).json({ message: 'User not found' }); // 404 Not Found si el usuario no existe
  }
};

const getUserByEmail = async (request, response) => {
  try {
    const { email } = request.params;
    const user = await usersLogin.getUserByEmail(email);
    if (user.length > 0) {
      response.status(200).json({ error: 'Email exite...' });
    } else {
      // Si el usuario no se encuentra, responder con un mensaje de error.
      response.status(404).json({ error: 'Email not found...' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createUsers,
  getUserByUsername,
  getUserByEmail,
};