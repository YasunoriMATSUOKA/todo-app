import { Todo, TodoCreate, TodoUpdate } from "@/lib/feature/todo/todo.types";
import { useState } from "react";

const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  function getTodo(id: string) {
    return todos.find((todo) => todo.id === id);
  }

  function listTodos() {
    return todos;
  }

  function searchTodosByText(searchText: string) {
    return todos.filter((todo) => todo.text.includes(searchText));
  }

  function searchTodosByStatus(done: boolean) {
    return todos.filter((todo) => todo.done === done);
  }

  function createTodo(todoCreate: TodoCreate) {
    const newTodo: Todo = {
      id: `dummyId${Math.random()}`,
      text: todoCreate.text,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  }

  function updateTodo(todoUpdate: TodoUpdate) {
    const index = todos.findIndex((todo) => todo.id === todoUpdate.id);
    if (index === -1) {
      throw Error("Todo not found");
    }
    const updatedTodo: Todo = {
      ...todos[index],
      ...todoUpdate,
      updatedAt: new Date(),
    };
    const newTodos = todos.map((todo) => {
      if (todo.id === todoUpdate.id) {
        return updatedTodo;
      }
      return todo;
    });
    setTodos(newTodos);
  }

  function deleteTodo(id: string) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return {
    todos,
    createTodo,
    getTodo,
    listTodos,
    updateTodo,
    deleteTodo,
    searchTodosByText,
    searchTodosByStatus,
  };
};

export default useTodo;
