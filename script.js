
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

var svgNS = 'http://www.w3.org/2000/svg';

function createPencilIcon() {
  var svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.className = 'task-list__item-icon';
  var path = document.createElementNS(svgNS, 'path');
  path.setAttribute('fill', 'currentColor');
  path.setAttribute('d', 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z');
  svg.appendChild(path);
  return svg;
}

function createTrashIcon() {
  var svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.className = 'task-list__item-icon';
  var path = document.createElementNS(svgNS, 'path');
  path.setAttribute('fill', 'currentColor');
  path.setAttribute('d', 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z');
  svg.appendChild(path);
  return svg;
}

function createCheckIcon() {
  var svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.className = 'task-list__item-icon';
  var path = document.createElementNS(svgNS, 'path');
  path.setAttribute('fill', 'currentColor');
  path.setAttribute('d', 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z');
  svg.appendChild(path);
  return svg;
}

function formatTaskText(title, date) {
  return title + (date ? ' - ' + date : '');
}

function createTaskItem(title, date) {
  const taskItem = document.createElement('li');
  taskItem.className = 'task-list__item';
  taskItem.dataset.title = title;
  taskItem.dataset.date = date || '';

  const doneCheckbox = document.createElement('input');
  doneCheckbox.className = 'task-list__item-done';
  doneCheckbox.setAttribute('type', 'checkbox');
  doneCheckbox.setAttribute('aria-label', 'Отметить как выполненную');
  doneCheckbox.addEventListener('change', function () {
    taskItem.classList.toggle('task-list__item--done', doneCheckbox.checked);
  });
  taskItem.appendChild(doneCheckbox);

  const contentSlot = document.createElement('div');
  contentSlot.className = 'task-list__item-content';

  const taskText = document.createElement('span');
  taskText.className = 'task-list__item-text';
  taskText.textContent = formatTaskText(title, date || '');
  contentSlot.appendChild(taskText);
  taskItem.appendChild(contentSlot);

  const editBtn = document.createElement('button');
  editBtn.className = 'task-list__item-edit';
  editBtn.setAttribute('type', 'button');
  editBtn.setAttribute('aria-label', 'Изменить задачу');
  editBtn.appendChild(createPencilIcon());
  editBtn.addEventListener('click', function () {
    var currentTitle = taskItem.dataset.title || '';
    var currentDate = taskItem.dataset.date || '';
    var editTitleInput = document.createElement('input');
    editTitleInput.className = 'task-list__item-edit-input';
    editTitleInput.setAttribute('type', 'text');
    editTitleInput.value = currentTitle;
    var editDateInput = document.createElement('input');
    editDateInput.className = 'task-list__item-edit-input';
    editDateInput.setAttribute('type', 'date');
    editDateInput.value = currentDate;
    var saveBtn = document.createElement('button');
    saveBtn.className = 'task-list__item-save';
    saveBtn.setAttribute('type', 'button');
    saveBtn.setAttribute('aria-label', 'Сохранить');
    saveBtn.appendChild(createCheckIcon());
    var editWrap = document.createElement('div');
    editWrap.className = 'task-list__item-edit-form';
    editWrap.appendChild(editTitleInput);
    editWrap.appendChild(editDateInput);
    editWrap.appendChild(saveBtn);
    contentSlot.innerHTML = '';
    contentSlot.appendChild(editWrap);
    editTitleInput.focus();
    function saveEdit() {
      var newTitle = editTitleInput.value.trim();
      var newDate = editDateInput.value;
      taskItem.dataset.title = newTitle;
      taskItem.dataset.date = newDate || '';
      contentSlot.innerHTML = '';
      var newTaskText = document.createElement('span');
      newTaskText.className = 'task-list__item-text';
      newTaskText.textContent = formatTaskText(newTitle || 'Задача', newDate || '');
      contentSlot.appendChild(newTaskText);
    }
    saveBtn.addEventListener('click', saveEdit);
    editTitleInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') saveEdit();
    });
  });
  taskItem.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'task-list__item-delete';
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.setAttribute('aria-label', 'Удалить задачу');
  deleteBtn.appendChild(createTrashIcon());
  deleteBtn.addEventListener('click', function () {
    taskItem.remove();
  });
  taskItem.appendChild(deleteBtn);

  return taskItem;
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const date = dateInput.value;
  if (!title) return;

  const taskItem = createTaskItem(title, date);
  taskList.appendChild(taskItem);

  titleInput.value = '';
  dateInput.value = '';
});
