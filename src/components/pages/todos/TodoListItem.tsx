import DeleteTodoButtonComponent from "@/components/pages/todos/DeleteTodoButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Todo, TodoUpdate } from "@/lib/feature/todo/todo.types";
import { cn } from "@/lib/utils";
import React from "react";

interface TodoListItemProps {
  todo: Todo;
  updateTodo: (todoUpdate: TodoUpdate) => Promise<Todo>;
  deleteTodo: (id: string) => Promise<void>;
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
          }).then(() => {
            console.log("Todo Updated");
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
          }).then(() => {
            console.log("Todo Updated");
          });
        }}
      />
      <DeleteTodoButtonComponent todo={todo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default TodoListItemComponent;
