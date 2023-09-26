import getTemplate from "./template";
export default class Todo {
  constructor(data) {
    this.id = data.id;
    this.content = data.content;
    this.completed = data.completed;
    this.createdAT = data.createdAT;
  }
  render(el) {
    /*    const newTodo = document.createElement("div");
    el.append(newTodo);
    newTodo.outerHTML = getTemplate(this); */

    return getTemplate(this);
  }
}
