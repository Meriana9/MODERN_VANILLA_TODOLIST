// Création de la classe TodoList
// Avec comme propriétés:
// - elt, todos qui doit contenir des objets de type Todo
import getTemplate from "./template";

import DB from "../../DB";
import Todo from "../todo/Todo";

export default class {
  constructor(data) {
    DB.setApiURL(data.apiURL);
    this.elt = document.querySelector(data.domELT);
    this.todo_list = null;
    this.newTodoInput = null;
    this.todos = [];
    this.loadTodos();
  }

  async loadTodos() {
    const todos = await DB.findAll();
    this.todos = todos.map((todo) => new Todo(todo));
    this.render();
  }

  render() {
    this.elt.innerHTML = getTemplate(this);
    this.todo_list = this.elt.querySelector(".todo-list");

    //.todo-list existe
    this.todos.forEach((todo) => {
      todo.render(this.todo_list);
    });
    this.activateElements();
    this.renderTodoscount();
  }
  renderTodoscount() {
    this.elt.querySelector(".todo-count strong").innerHTML = this.todos.filter(
      (todo) => {
        return !todo.completed;
      }
    ).length;
  }
  activateElements() {
    this.newTodoInput = this.elt.querySelector(".new-todo");
    this.newTodoInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter" && this.newTodoInput.value !== "") {
        this.add();
      }
    });
  }
  /*
  activateElements() {
    this.new_todo = this.elt.querySelector(".new-todo");
    this.new_todo.onkeyup = (e) => {
      if (e.code === "Enter" && this.new_todo.value !== "") {
        this.add();
      }
    };
  }
     async addTodo() {
    const todo = await DB.addOne({
      content: this.new_todo.value,
      completed: false,
    });
    const newTodo = new Todo(todo);
    this.todos.unshift(newTodo);
    newTodo.render(this.todo_list);
    this.new_todo.value = "";
  } */

  add() {
    // 1. Ajout de la todo dans le this.todos
    const todo = {
      id: new Date(),
      content: this.newTodoInput.value,
      completed: false,
    };
    const newTodo = new Todo(todo);
    this.todos.unshift(newTodo);
    // 2. Ajout de la todo dans le DOM
    // this.elt.querySelector('.todo-list').innerHTML =
    // newTodo.render() + this.elt.querySelector('.todo-list').innerHTML;

    // Créer l'élément
    // Mettre le render dedans
    // faire un insertBefore
    const newTodoElement = document.createElement("div");
    document
      .querySelector(".todo-list")
      .insertBefore(
        newTodoElement,
        document.querySelector(".todo-list").children[0]
      );
    newTodoElement.outerHTML = newTodo.render();

    // 3. Ajout de la todo dans l'API
    DB.addOne(todo);

    // vider l'input
    this.newTodoInput.value = "";
  }
}
