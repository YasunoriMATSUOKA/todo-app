import { Button } from "@/components/ui/button";
import React from "react";

interface UpdateTodoButtonProps {
  updateTodo: () => void;
  isDisabled: boolean;
}

const UpdateTodoButtonComponent: React.FC<UpdateTodoButtonProps> = ({
  updateTodo,
  isDisabled,
}: UpdateTodoButtonProps) => {
  return (
    <Button onClick={updateTodo} disabled={isDisabled} variant="outline">
      Save
    </Button>
  );
};

export default UpdateTodoButtonComponent;
