import Project from './Project.js';
import Todo from './Todo.js';
import Storage from './Storage.js';
import UI from './UI.js';

const App = (() => {
  let projects = [];
  let activeProjectIndex = 0;

  const init = () => {
    const rawData = Storage.loadProjects();
    projects = rawData.map(p => {
      const project = new Project(p.name);
      p.todos.forEach(t => {
        const todo = new Todo(t.title, t.description, t.dueDate, t.priority, t.notes, t.checklist);
        todo.completed = t.completed;
        project.addTodo(todo);
      });
      return project;
    });

    if (projects.length === 0) {
      projects.push(new Project('Default'));
    }

    UI.renderProjects(projects, activeProjectIndex);
    UI.renderTodos(projects[activeProjectIndex]);
  };

  const addProject = (name) => {
    projects.push(new Project(name));
    Storage.saveProjects(projects);
    UI.renderProjects(projects, projects.length - 1);
    activeProjectIndex = projects.length - 1;
    UI.renderTodos(projects[activeProjectIndex]);
  };

  const addTodoToActiveProject = (todoData) => {
    // Using an object is more robust than an array with spread syntax.
    // It avoids issues if the order of parameters changes.
    const todo = new Todo(
      todoData.title,
      todoData.description,
      todoData.dueDate,
      todoData.priority,
      todoData.notes,
      todoData.checklist
    );
    projects[activeProjectIndex].addTodo(todo);
    Storage.saveProjects(projects);
    UI.renderTodos(projects[activeProjectIndex]);
  };

  const setActiveProject = (index) => {
    if (index >= 0 && index < projects.length) {
      activeProjectIndex = index;
      UI.renderProjects(projects, activeProjectIndex);
      UI.renderTodos(projects[activeProjectIndex]);
    }
  };

  const deleteProject = (index) => {
    if (index < 0 || index >= projects.length) return;

    projects.splice(index, 1);

    if (projects.length === 0) {
      projects.push(new Project('Default'));
      activeProjectIndex = 0;
    } else if (activeProjectIndex >= index) {
      activeProjectIndex = Math.max(0, activeProjectIndex - 1);
    }

    Storage.saveProjects(projects);
    setActiveProject(activeProjectIndex);
  };

  const deleteTodo = (todoIndex) => {
    projects[activeProjectIndex]?.removeTodo(todoIndex);
    Storage.saveProjects(projects);
    UI.renderTodos(projects[activeProjectIndex]);
  };

  const toggleTodoComplete = (todoIndex) => {
    const todo = projects[activeProjectIndex]?.todos[todoIndex];
    if (todo) {
      todo.toggleComplete();
      Storage.saveProjects(projects);
      UI.renderTodos(projects[activeProjectIndex]);
    }
  };

  return {
    init,
    addProject,
    addTodoToActiveProject,
    setActiveProject,
    deleteProject,
    deleteTodo,
    toggleTodoComplete,
  };
})();

export default App;
