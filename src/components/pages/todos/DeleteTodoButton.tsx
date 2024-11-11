import { Button } from "@/components/ui/button";
import { Todo } from "@/lib/feature/todo/todo.types";
import React from "react";

interface DeleteTodoButtonProps {
  todo: Todo;
  deleteTodo: (id: string) => void;
}

const DeleteTodoButtonComponent: React.FC<DeleteTodoButtonProps> = ({
  todo,
  deleteTodo,
}: DeleteTodoButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={() => {
        deleteTodo(todo.id);
      }}
    >
      X Delete
    </Button>
  );
};

export default DeleteTodoButtonComponent;
