const connection = require('./connection');

const createUsers = async (users) => {
  const { username, email, password } = users;
  const query = 'INSERT INTO users(username, email, password) VALUES (?,?,?)';
  
  try {
    const [createdUsers] = await connection.execute(query, [username, email, password]);
    return { message: 'Usuario registrado con éxito', insertId: createdUsers.insertId };
  } catch (error) {
    // Manejar errores aquí, por ejemplo, si hubo un problema con la inserción en la base de datos
    console.error('Error al registrar el usuario:', error);
    throw error; // Puedes lanzar el error para que sea manejado en el nivel superior
  }
};

const getUserByUsername = async (username) => {
//console.log('Nombre de usuario:', user.username);
  const [user] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
  return user;
};

module.exports = {
  createUsers,
  getUserByUsername,
};