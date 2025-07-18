import UpdateTodoButtonComponent from "@/components/pages/todos/UpdateTodoButton";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import DeleteTodoButtonComponent from "./DeleteTodoButton";

const TodoListItemSkeleton: React.FC = () => {
  const dummyTodo = {
    id: "",
    text: "",
    done: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const noop = async () => {};

  return (
    <div className="mb-3 flex w-full flex-row items-center space-x-3">
      <Skeleton className="h-4 w-4 rounded" data-testid="checkbox-skeleton" />
      <Skeleton className="h-10 flex-1" data-testid="input-skeleton" />
      <UpdateTodoButtonComponent updateTodo={noop} isDisabled={true} />
      <DeleteTodoButtonComponent
        todo={dummyTodo}
        deleteTodo={noop}
        isLoading={true}
      />
    </div>
  );
};

export default TodoListItemSkeleton;
