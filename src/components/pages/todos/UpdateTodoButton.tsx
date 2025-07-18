import { Button } from "@/components/ui/button";
import React from "react";

interface UpdateTodoButtonProps {
  updateTodo: () => void;
  isDisabled: boolean;
  isLoading?: boolean;
}

const UpdateTodoButtonComponent: React.FC<UpdateTodoButtonProps> = ({
  updateTodo,
  isDisabled,
  isLoading = false,
}: UpdateTodoButtonProps) => {
  return (
    <Button onClick={updateTodo} disabled={isDisabled} variant="outline">
      {isLoading ? "Updating..." : "Update"}
    </Button>
  );
};

export default UpdateTodoButtonComponent;
