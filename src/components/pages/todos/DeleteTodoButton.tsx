import { Button } from "@/components/ui/button";
import { Todo } from "@/lib/feature/todo/todo.types";
import React from "react";

interface DeleteTodoButtonProps {
  todo: Todo;
  deleteTodo: (id: string) => Promise<void>;
  isLoading: boolean;
}

const DeleteTodoButtonComponent: React.FC<DeleteTodoButtonProps> = ({
  todo,
  deleteTodo,
  isLoading,
}: DeleteTodoButtonProps) => {
  return (
    <Button
      variant="outline"
      disabled={isLoading}
      onClick={() => {
        deleteTodo(todo.id)
          .then(() => {
            console.log("Todo Deleted");
          })
          .catch((error) => {
            console.error("Failed to delete todo:", error);
          });
      }}
    >
      X Delete
    </Button>
  );
};

export default DeleteTodoButtonComponent;
