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
  registrationMessagedos.textContent = '';
  inputName.value = '';
  event.preventDefault();
  // Crear el objeto user con los valores de los inputs
  const user = { username: inputLoginName.value };
try {
   const response = await fetch(`http://localhost:3307/users/username/${user.username}`, {
    method: 'get',
  });

  if (response.ok) {
    registrationMessage.textContent = 'Usuario existe, Iniciar Sesión';
    registrationMessage.style.color = 'green';
    registrationMessage.style.display = 'block';

    var tarefauser = inputLoginName.value;
    usertarefa.innerHTML = 'Seja bem-vindo: <span style="color: black;">' + tarefauser + '</span>';
    usertarefa.style.color = 'green';
    usertarefa.style.display = 'block';

} else {
    registrationMessage.textContent = 'Usuario não existe. faça de novo.';
    registrationMessage.style.color = 'red';
    registrationMessage.style.display = 'block';
    usertarefa.innerHTML = ''
   }
} catch (error) {
  registrationMessage.textContent = 'Erro de conexão. faça mais tarde';
  registrationMessage.style.color = 'red';
  registrationMessage.style.display = 'block';
  usertarefa.innerHTML = ''
}
loadTasks();
};

loginform.addEventListener('submit', loginUser);

const userExists = async (email) => {
  try {
    const response = await fetch(`http://localhost:3307/users/email/${email}`);
    if (response.ok) {
      const user = await response.json();
      return !!user; // Regresa true si el usuario existe, false en caso contrario
    }
    return false;
  } catch (error) {
    console.error('Erro: al verificar el usuario:', error);
    return false;
  }
};

const registerUser = async (event) => {
  registrationMessage.textContent = '';
  registrationMessagedos.textContent = '';
  inputLoginName.value = '';
  usertarefa.innerHTML = '';
  event.preventDefault();
  // Crear el objeto user con los valores de los inputs
  const user = { username: inputName.value, email: inputEmail.value, password: inputPassword.value };
 
  if (await userExists(user.email)) {
    registrationMessagedos.textContent = 'Erro: O usuario ja foi registrado';
    registrationMessagedos.style.color = 'red';
    registrationMessagedos.style.display = 'block';
    inputEmail.value = '';
    inputPassword.value = '';
    return;
  }

  try {
    const response = await fetch('http://localhost:3307/users', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    if (response.ok) {
      registrationMessagedos.textContent = 'O registro foi feito com exito';
      registrationMessagedos.style.color = 'green';
      registrationMessagedos.style.display = 'block';
    } else {
      registrationMessagedos.textContent = 'Erro: ao registra';
      registrationMessagedos.style.color = 'red';
      registrationMessagedos.style.display = 'block';
    }
  } catch (error) {
    registrationMessagedos.textContent = 'Erro: de conexão, tente mais tarde';
    registrationMessagedos.style.color = 'red';
    registrationMessagedos.style.display = 'block';
  }
inputName.value = '';
inputEmail.value = '';
inputPassword.value = '';
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

window.addEventListener('load', () => {
  let lon;
  let lat;
  let temperaturaValor = document.getElementById('temperatura-valor');
  let temperaturaDescripcion = document.getElementById('temperatura-descripcion');
  let ubicacion = document.getElementById('ubicacion');
  let iconoAnimado = document.getElementById('icono-animado');
  let vientoVelocidad = document.getElementById('viento-velocidad');
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(posicion => {
          lon = posicion.coords.longitude;
          lat = posicion.coords.latitude;
          // Consultar la API utilizando la ubicación actual
          const apiKey = '8b12dff123a0cfc07e1d6a853eb3c5bd'; // Reemplaza con tu clave de API real
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=${apiKey}`;
          fetch(url)
              .then(response => response.json())
              .then(data => {
                  let temp = Math.round(data.main.temp);
                  temperaturaValor.textContent = `${temp} ° C`;
                  let desc = data.weather[0].description;
                  temperaturaDescripcion.textContent = desc.toUpperCase();
                  ubicacion.textContent = data.name;
                  vientoVelocidad.textContent = `${data.wind.speed} m/s`;
                  // Para iconos dinámicos
                  switch (data.weather[0].main) {
                      case 'Thunderstorm':
                          iconoAnimado.src = 'animated/thunder.svg';
                          break;
                      case 'Drizzle':
                          iconoAnimado.src = 'animated/rainy-2.svg';
                          break;
                      case 'Rain':
                          iconoAnimado.src = 'animated/rainy-7.svg';
                          break;
                      case 'Snow':
                          iconoAnimado.src = 'animated/snowy-6.svg';
                          break;
                      case 'Clear':
                          iconoAnimado.src = 'animated/day.svg';
                          break;
                      case 'Atmosphere':
                          iconoAnimado.src = 'animated/weather.svg';
                          break;
                      case 'Clouds':
                          iconoAnimado.src = 'animated/cloudy-day-1.svg';
                          break;
                      default:
                          iconoAnimado.src = 'animated/cloudy-day-1.svg';
                  }
              })
              .catch(error => {
                  console.log(error);
              });
      });
  }
});