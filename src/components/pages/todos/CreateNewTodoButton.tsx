import { Button } from "@/components/ui/button";
import { Todo, TodoCreate } from "@/lib/feature/todo/todo.types";
import React from "react";

interface CreateNewTodoButtonProps {
  createTodo: (todoCreate: TodoCreate) => Promise<Todo>;
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
        }).then(() => {
          console.log("Todo Created");
        });
      }}
    >
      + Create New Todo
    </Button>
  );
};

export default CreateNewTodoButtonComponent;
