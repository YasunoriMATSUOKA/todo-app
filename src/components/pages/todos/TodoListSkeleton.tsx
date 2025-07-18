import TodoListItemSkeleton from "@/components/pages/todos/TodoListItemSkeleton";
import React from "react";

interface TodoListSkeletonProps {
  count?: number;
}

const TodoListSkeleton: React.FC<TodoListSkeletonProps> = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} data-testid={`skeleton-item-${index}`}>
          <TodoListItemSkeleton />
        </div>
      ))}
    </>
  );
};

export default TodoListSkeleton;
