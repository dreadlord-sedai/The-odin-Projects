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
    const todo = new Todo(...todoData);
    projects[activeProjectIndex].addTodo(todo);
    Storage.saveProjects(projects);
    UI.renderTodos(projects[activeProjectIndex]);
  };

  return {
    init,
    addProject,
    addTodoToActiveProject,
  };
})();

export default App;
