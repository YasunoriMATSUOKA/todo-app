import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TodoListItemSkeleton: React.FC = () => {
  return (
    <div className="mb-3 flex w-full flex-row items-center space-x-3">
      <Skeleton className="h-4 w-4 rounded" data-testid="checkbox-skeleton" />
      <Skeleton className="h-10 flex-1" data-testid="input-skeleton" />
      <Skeleton className="h-10 w-10" data-testid="update-button-skeleton" />
      <Skeleton className="h-10 w-10" data-testid="delete-button-skeleton" />
    </div>
  );
};

export default TodoListItemSkeleton;
