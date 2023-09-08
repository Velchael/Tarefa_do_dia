const usersLogin = require('../models/usersLogin');

const createUsers = async (request, response) => {
  const createUsers = await usersLogin.createUsers(request.body);
  return response.status(201).json(createUsers);
};

const getUserByUsername = async (request, response) => {
  const { username } = request.params;
  const user = await usersLogin.getUserByUsername(username);
  //console.log('Información del usuario obtenida:', user);
  if (user && user.length > 0) {
    return response.status(200).json({ message: 'User ja exite' }); // 200 OK con la información del usuario
  } else {
    return response.status(404).json({ message: 'User not found' }); // 404 Not Found si el usuario no existe
  }
};

module.exports = {
  createUsers,
  getUserByUsername,
};