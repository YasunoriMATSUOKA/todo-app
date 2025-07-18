import { Button } from "@/components/ui/button";
import { Todo, TodoCreate } from "@/lib/feature/todo/todo.types";
import React from "react";

interface CreateNewTodoButtonProps {
  createTodo: (todoCreate: TodoCreate) => Promise<Todo>;
  isLoading: boolean;
}

const CreateNewTodoButtonComponent: React.FC<CreateNewTodoButtonProps> = ({
  createTodo,
  isLoading,
}: CreateNewTodoButtonProps) => {
  return (
    <Button
      className="w-full"
      disabled={isLoading}
      onClick={() => {
        createTodo({
          text: "New Todo",
        })
          .then((todo) => {
            console.log("Todo Created", todo);
          })
          .catch((error) => {
            console.error("Failed to create todo:", error);
          });
      }}
    >
      {isLoading ? "Creating New Todo..." : "Create New Todo"}
    </Button>
  );
};

export default CreateNewTodoButtonComponent;
