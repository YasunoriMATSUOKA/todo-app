import React from "react";
import { Todo, TodoUpdate } from "@/lib/feature/todo/todo.types";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import DeleteTodoButtonComponent from "@/components/pages/todos/DeleteTodoButton";

interface TodoListItemProps {
  todo: Todo;
  updateTodo: (todoUpdate: TodoUpdate) => void;
  deleteTodo: (id: string) => void;
}

const TodoListItemComponent: React.FC<TodoListItemProps> = ({
  todo,
  updateTodo,
  deleteTodo,
}: TodoListItemProps) => {
  return (
    <div
      key={todo.id}
      className="mb-3 flex w-full flex-row items-center space-x-3"
    >
      <Checkbox
        id={todo.id}
        checked={todo.done}
        onCheckedChange={(checked) => {
          updateTodo({
            id: todo.id,
            text: todo.text,
            done: checked as boolean,
          });
        }}
      />
      <Input
        className={cn("flex-1", todo.done && "line-through")}
        value={todo.text}
        onChange={(e) => {
          updateTodo({
            id: todo.id,
            text: e.target.value,
            done: todo.done,
          });
        }}
      />
      <DeleteTodoButtonComponent todo={todo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default TodoListItemComponent;
