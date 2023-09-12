const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');
const loginform = document.querySelector('.login-form');
const inputLoginName = document.querySelector('.login-name');
const registerForm = document.querySelector('.register-form');
const inputName = document.querySelector('.register-name');
const inputEmail = document.querySelector('.register-email');
const inputPassword = document.querySelector('.register-password');
const registrationMessage = document.querySelector('#registration-message');
const registrationMessagedos = document.querySelector('#registration-messagedos');
const usertarefa = document.querySelector('#user-tarefa');

const loginUser = async (event) => {
  registrationMessage.textContent = '';
  registrationMessage.style.color = '';
  registrationMessage.style.display = '';
  inputName.value = '';
  event.preventDefault();
  // Crear el objeto user con los valores de los inputs
  const user = { username: inputLoginName.value };
try {
   const response = await fetch(`http://localhost:3307/users/${user.username}`, {
    method: 'get',
  });

  if (response.ok) {
    registrationMessage.textContent = 'Iniciar Sesión com éxito...';
    registrationMessage.style.color = 'green';
    registrationMessage.style.display = 'block';

    var tarefauser = inputLoginName.value;
    usertarefa.innerHTML = 'Seja bem-vindo: <span style="color: black;">' + tarefauser + '</span>';
    usertarefa.style.color = 'green';
    usertarefa.style.display = 'block';

} else {
    registrationMessage.textContent = 'Hubo un error la Sesion. faça de novo.';
    registrationMessage.style.color = 'red';
    registrationMessage.style.display = 'block';
   }
} catch (error) {

  registrationMessage.textContent = 'Error durante el registro. faça mais tarde...';
  registrationMessage.style.color = 'red';
  registrationMessage.style.display = 'block';
}
loadTasks();
};
// Vincular la función al evento submit del formulario
loginform.addEventListener('submit', loginUser);

const registerUser = async (event) => {
  event.preventDefault();
  // Crear el objeto user con los valores de los inputs
  const user = { username: inputName.value, email: inputEmail.value, password: inputPassword.value };
 try {
  // Hacer la petición POST para registrar el usuario
  const response = await fetch('http://localhost:3307/users', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  // Verificar si la respuesta es exitosa
  if (response.ok) {
    registrationMessagedos.textContent = 'El registro se realizó con éxito...';
    registrationMessagedos.style.color = 'green';
    registrationMessagedos.style.display = 'block';
  
  } else {
    registrationMessagedos.textContent = 'Error no registro. Faça de novo';
    registrationMessagedos.style.color = 'red';
    registrationMessagedos.style.display = 'block';
  }
} catch (error) {
  //console.error("Hubo un error en la petición:", error);
  registrationMessagedos.textContent = 'Error. Faça de novo, mais xxxx';
  registrationMessagedos.style.color = 'red';
  registrationMessagedos.style.display = 'block';
}

inputEmail.value = '';
inputPassword.value = '';
registrationMessagedos.textContent = '';
registrationMessagedos.style.color = '';
registrationMessagedos.style.display = '';
loadTasks();
}
// Vincular la función al evento submit del formulario
registerForm.addEventListener('submit', registerUser);

const fetchTasksLogin = async (username) => {
  try {
    const response = await fetch(`http://localhost:3307/tasks/${username}`);
  
    if (!response.ok) {
      throw new Error('Error al obtener tareas.');
    }

    const tasks = await response.json();
    
    return tasks;
  } catch (error) {
    console.error("Error en fetchTasksLogin:", error.message);
    return []; // Retorna un array vacío en caso de error.
  }
  
};


const addTask = async (event) => {
  event.preventDefault();
  const task = { registeruser: inputLoginName.value, title: inputTask.value };

  await fetch('http://localhost:3307/tasks', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  loadTasks();
  inputTask.value = '';
}


const deleteTask = async (id) => {
  await fetch(`http://localhost:3307/tasks/${id}`, {
    method: 'delete',
  });

  loadTasks();
}

const updateTask = async ({ id, title, status }) => {

  await fetch(`http://localhost:3307/tasks/${id}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, status }),
  });

  loadTasks();
}
const formatDate = (dateUTC) => {
  const options = { dateStyle: 'long' };
  const date = new Date(dateUTC).toLocaleString('pt-br', options);
  return date;
}

const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
}

const createSelect = (value) => {
  const options = `
    <option value="pendente">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="concluída">concluída</option>
  `;

  const select = createElement('select', '', options);

  select.value = value;

  return select;
}

const createRow = (task) => {

  const { id, title, created_at, status } = task;

  const tr = createElement('tr');
  const tdTitle = createElement('td', title);
  const tdCreatedAt = createElement('td', formatDate(created_at));
  const tdStatus = createElement('td');
  const tdActions = createElement('td');

  const select = createSelect(status);

  select.addEventListener('change', ({ target }) => updateTask({ ...task, status: target.value }));

  const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
  const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');
  
  const editForm = createElement('form');
  const editInput = createElement('input');

  editInput.value = title;
  editForm.appendChild(editInput);
  
  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    updateTask({ id, title: editInput.value, status });
  });

  editButton.addEventListener('click', () => {
    tdTitle.innerText = '';
    tdTitle.appendChild(editForm);
  });

  editButton.classList.add('btn-action');
  deleteButton.classList.add('btn-action');

  deleteButton.addEventListener('click', () => deleteTask(id));
  
  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
}

const loadTasks = async () => {
const user = { username: inputLoginName.value };
const tasks = await fetchTasksLogin(user.username);

  tbody.innerHTML = '';

  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });
  
}

addForm.addEventListener('submit', addTask);

loadTasks();
