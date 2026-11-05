// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-btn');
  const todoForm = document.getElementById('todo-form');
  const todoList = document.getElementById('todo-list');
  const errorMsg = document.getElementById('error-msg');
  const counter = document.getElementById('counter');
  
  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterDone = document.getElementById('filter-done');

  let currentFilter = 'all';

  function updateCounter() {
    if (!counter || !todoList) return;
    const items = todoList.querySelectorAll('li');
    let left = 0;
    items.forEach(li => {
      if (!li.classList.contains('completed')) {
        left++;
      }
    });
    counter.textContent = `${left} item(s) left`;
  }

  function applyFilter() {
    if (!todoList) return;
    const items = todoList.querySelectorAll('li');
    items.forEach(li => {
      const isCompleted = li.classList.contains('completed');
      if (currentFilter === 'all') {
        li.style.display = '';
      } else if (currentFilter === 'active') {
        li.style.display = isCompleted ? 'none' : '';
      } else if (currentFilter === 'done') {
        li.style.display = isCompleted ? '' : 'none';
      }
    });
  }

  function addItem(text) {
    if (!todoList) return;
    const li = document.createElement('li');
    li.textContent = text;

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'Delete';
    li.appendChild(delBtn);

    todoList.appendChild(li);
    applyFilter();
    updateCounter();
  }

  function handleSubmit(e) {
    if (e) e.preventDefault();
    if (!todoInput) return;
    const text = todoInput.value.trim();

    if (text === '') {
      if (errorMsg) {
        errorMsg.classList.remove('hidden');
        errorMsg.style.display = '';
      }
      return;
    }

    if (errorMsg) {
      errorMsg.classList.add('hidden');
      errorMsg.style.display = 'none';
    }
    addItem(text);
    todoInput.value = '';
    todoInput.focus();
  }

  if (todoForm) {
    todoForm.addEventListener('submit', handleSubmit);
  } else if (addBtn) {
    addBtn.addEventListener('click', handleSubmit);
  }

  if (todoInput) {
    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleSubmit(e);
      }
    });
  }

  if (todoList) {
    todoList.addEventListener('click', (e) => {
      const delBtn = e.target.closest('.delete-btn');
      if (delBtn) {
        const li = delBtn.closest('li');
        if (li) {
          li.remove();
          updateCounter();
        }
        return;
      }

      const li = e.target.closest('li');
      if (li) {
        li.classList.toggle('completed');
        applyFilter();
        updateCounter();
      }
    });
  }

  if (filterAll) {
    filterAll.addEventListener('click', () => {
      currentFilter = 'all';
      filterAll.classList.add('active');
      if (filterActive) filterActive.classList.remove('active');
      if (filterDone) filterDone.classList.remove('active');
      applyFilter();
    });
  }

  if (filterActive) {
    filterActive.addEventListener('click', () => {
      currentFilter = 'active';
      if (filterAll) filterAll.classList.remove('active');
      filterActive.classList.add('active');
      if (filterDone) filterDone.classList.remove('active');
      applyFilter();
    });
  }

  if (filterDone) {
    filterDone.addEventListener('click', () => {
      currentFilter = 'done';
      if (filterAll) filterAll.classList.remove('active');
      if (filterActive) filterActive.classList.remove('active');
      filterDone.classList.add('active');
      applyFilter();
    });
  }

  updateCounter();
});