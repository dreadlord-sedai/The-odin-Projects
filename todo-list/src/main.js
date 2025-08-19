import App from './App';
import './styles.css';
import Todo from './Todo.js';
import UI from './UI.js';

const todo = new Todo();
todo.render();


const ui = new UI();
ui.renderTodos();

const app = new App();
app.render();