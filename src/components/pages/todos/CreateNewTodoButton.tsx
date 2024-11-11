import { Button } from "@/components/ui/button";
import { TodoCreate } from "@/lib/feature/todo/todo.types";
import React from "react";

interface CreateNewTodoButtonProps {
  createTodo: (todoCreate: TodoCreate) => void;
}

const CreateNewTodoButtonComponent: React.FC<CreateNewTodoButtonProps> = ({
  createTodo,
}: CreateNewTodoButtonProps) => {
  return (
    <Button
      className="w-full"
      onClick={() => {
        createTodo({
          text: "New Todo",
        });
      }}
    >
      + Create New Todo
    </Button>
  );
};

export default CreateNewTodoButtonComponent;
