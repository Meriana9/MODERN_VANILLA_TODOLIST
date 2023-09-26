import "../styles.scss";
import TodoList from "./components/todoList/TodoList";

//Instancier une nouvelle todolist
//en lui envoyant l'élément DOM sur lequel se greffer
// e l'URL de l'API à utiliser : https://6501f8dc736d26322f5c93c6.mockapi.io/

new TodoList({
  apiURL: "https://6501f8dc736d26322f5c93c6.mockapi.io/",
  domELT: "#app",
});
