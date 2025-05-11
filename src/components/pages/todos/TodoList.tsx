import TodoListItemComponent from "@/components/pages/todos/TodoListItem";
import { Todo, TodoUpdate } from "@/lib/feature/todo/todo.types";
import React from "react";

interface TodoListProps {
  isLoading: boolean;
  todos: Todo[];
  updateTodo: (todoUpdate: TodoUpdate) => Promise<Todo>;
  deleteTodo: (id: string) => Promise<void>;
}

const TodoListComponent: React.FC<TodoListProps> = ({
  isLoading,
  todos,
  updateTodo,
  deleteTodo,
}: TodoListProps) => {
  if (isLoading) {
    return null;
  }
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
