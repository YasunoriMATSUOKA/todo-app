import TodoListItemComponent from "@/components/pages/todos/TodoListItem";
import TodoListSkeleton from "@/components/pages/todos/TodoListSkeleton";
import { Todo, TodoUpdate } from "@/lib/feature/todo/todo.types";
import React from "react";

interface TodoListProps {
  isLoading: boolean;
  todos: Todo[];
  updateTodo: (todoUpdate: TodoUpdate) => Promise<Todo>;
  deleteTodo: (id: string) => Promise<void>;
  updatingIds: Set<string>;
  deletingIds: Set<string>;
}

const TodoListComponent: React.FC<TodoListProps> = ({
  isLoading,
  todos,
  updateTodo,
  deleteTodo,
  updatingIds,
  deletingIds,
}: TodoListProps) => {
  if (isLoading) {
    return <TodoListSkeleton />;
  }
  return (
    <>
      {todos.map((todo) => (
        <TodoListItemComponent
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          isUpdating={updatingIds.has(todo.id)}
          isDeleting={deletingIds.has(todo.id)}
        />
      ))}
    </>
  );
};

export default TodoListComponent;
