import TodoListItemComponent from "@/components/pages/todos/TodoListItem";
import { Todo, TodoUpdate } from "@/lib/feature/todo/todo.types";
import React from "react";

interface TodoListProps {
  todos: Todo[];
  updateTodo: (todoUpdate: TodoUpdate) => void;
  deleteTodo: (id: string) => void;
}

const TodoListComponent: React.FC<TodoListProps> = ({
  todos,
  updateTodo,
  deleteTodo,
}: TodoListProps) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoListItemComponent
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </>
  );
};

export default TodoListComponent;
