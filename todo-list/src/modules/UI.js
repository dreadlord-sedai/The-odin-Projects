const UI = (() => {
  const projectList = document.getElementById('project-list');
  const todoList = document.getElementById('todo-list');

  const renderProjects = (projects, activeIndex) => {
    projectList.innerHTML = '';
    projects.forEach((project, index) => {
      const btn = document.createElement('button');
      btn.textContent = project.name;
      btn.classList.toggle('active', index === activeIndex);
      btn.addEventListener('click', () => {
        UI.renderTodos(project);
        UI.setActiveProject(index);
      });
      projectList.appendChild(btn);
    });
  };

  const renderTodos = (project) => {
    todoList.innerHTML = '';
    project.todos.forEach((todo, index) => {
      const item = document.createElement('div');
      item.className = `todo ${todo.priority}`;
      item.innerHTML = `
        <h4>${todo.title}</h4>
        <p>Due: ${todo.dueDate}</p>
        <button data-index="${index}" class="delete">🗑️</button>
      `;
      todoList.appendChild(item);
    });
  };

  const setActiveProject = (index) => {
    const buttons = projectList.querySelectorAll('button');
    buttons.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
  };

  return {
    renderProjects,
    renderTodos,
    setActiveProject,
  };
})();

export default UI;
