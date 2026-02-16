
const app = document.createElement('main');
app.className = 'app';

const heading = document.createElement('h1');
heading.textContent = 'To-Do List';
heading.className = 'app__heading';
app.appendChild(heading);

const form = document.createElement('form');
form.className = 'task-form';
form.setAttribute('aria-label', 'Добавление новой задачи');

const titleLabel = document.createElement('label');
titleLabel.className = 'task-form__label';
titleLabel.textContent = 'Название задачи';
titleLabel.setAttribute('for', 'task-title');

const titleInput = document.createElement('input');
titleInput.className = 'task-form__input';
titleInput.setAttribute('type', 'text');
titleInput.setAttribute('id', 'task-title');
titleInput.setAttribute('name', 'title');
titleInput.setAttribute('placeholder', 'Введите задачу');
titleInput.setAttribute('required', '');

const dateLabel = document.createElement('label');
dateLabel.className = 'task-form__label';
dateLabel.textContent = 'Дата';
dateLabel.setAttribute('for', 'task-date');

const dateInput = document.createElement('input');
dateInput.className = 'task-form__input';
dateInput.setAttribute('type', 'date');
dateInput.setAttribute('id', 'task-date');
dateInput.setAttribute('name', 'date');

const submitButton = document.createElement('button');
submitButton.className = 'task-form__submit';
submitButton.setAttribute('type', 'submit');
submitButton.textContent = 'Добавить';

form.appendChild(titleLabel);
form.appendChild(titleInput);
form.appendChild(dateLabel);
form.appendChild(dateInput);
form.appendChild(submitButton);
app.appendChild(form);

const listSection = document.createElement('section');
listSection.className = 'task-list-section';
listSection.setAttribute('aria-label', 'Список задач');

const listHeading = document.createElement('h2');
listHeading.className = 'task-list-section__heading';
listHeading.textContent = 'Список задач';

const taskList = document.createElement('ul');
taskList.className = 'task-list';
taskList.setAttribute('role', 'list');

listSection.appendChild(listHeading);
listSection.appendChild(taskList);
app.appendChild(listSection);

document.body.appendChild(app);

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const date = dateInput.value;
  if (!title) return;

  const taskItem = document.createElement('li');
  taskItem.className = 'task-list__item';

  const taskText = document.createElement('span');
  taskText.className = 'task-list__item-text';
  taskText.textContent = title + (date ? ' — ' + date : '');

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'task-list__item-delete';
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.setAttribute('aria-label', 'Удалить задачу');
  deleteBtn.textContent = 'Удалить';

  deleteBtn.addEventListener('click', function () {
    taskItem.remove();
  });

  taskItem.appendChild(taskText);
  taskItem.appendChild(deleteBtn);
  taskList.appendChild(taskItem);

  titleInput.value = '';
  dateInput.value = '';
});
