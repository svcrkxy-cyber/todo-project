const formElement = document.querySelector('.to-do__form');
const inputElement = document.querySelector('.to-do__input');
const listElement = document.querySelector('.to-do__list');
const templateElement = document.querySelector('#to-do__item-template');

const initialTasks = [
  'Помыть посуду',
  'Сделать домашнее задание',
  'Купить продукты',
  'Погулять с собакой',
  'Прочитать книгу',
  'Позвонить другу'
];

function loadTasks() {
  const savedTasks = localStorage.getItem('todoTasks');
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  return initialTasks;
}

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
  const tasks = [];
  itemsNamesElements.forEach(function (element) {
    tasks.push(element.textContent);
  });
  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function createItem(item) {
  const clone = templateElement.content.cloneNode(true);
  const textElement = clone.querySelector('.to-do__item-text');
  const deleteButton = clone.querySelector('.to-do__item-button_type_delete');
  const duplicateButton = clone.querySelector('.to-do__item-button_type_duplicate');
  const editButton = clone.querySelector('.to-do__item-button_type_edit');

  textElement.textContent = item;

  deleteButton.addEventListener('click', function () {
    const taskElement = deleteButton.closest('.to-do__item');
    taskElement.remove();
    const tasks = getTasksFromDOM();
    saveTasks(tasks);
  });

  duplicateButton.addEventListener('click', function () {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    const tasks = getTasksFromDOM();
    saveTasks(tasks);
  });

  editButton.addEventListener('click', function () {
    textElement.setAttribute('contenteditable', 'true');
    textElement.focus();
  });

  textElement.addEventListener('blur', function () {
    textElement.setAttribute('contenteditable', 'false');
    const tasks = getTasksFromDOM();
    saveTasks(tasks);
  });

  return clone;
}

const tasks = loadTasks();

tasks.forEach(function (item) {
  const taskElement = createItem(item);
  listElement.append(taskElement);
});

formElement.addEventListener('submit', function (event) {
  event.preventDefault();
  const taskText = inputElement.value.trim();

  if (taskText) {
    const taskElement = createItem(taskText);
    listElement.prepend(taskElement);
    const newTasks = getTasksFromDOM();
    saveTasks(newTasks);
    inputElement.value = '';
  }
});
