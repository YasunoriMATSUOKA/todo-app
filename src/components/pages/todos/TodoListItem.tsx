import DeleteTodoButtonComponent from "@/components/pages/todos/DeleteTodoButton";
import UpdateTodoButtonComponent from "@/components/pages/todos/UpdateTodoButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Todo, TodoUpdate } from "@/lib/feature/todo/todo.types";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface TodoListItemProps {
  todo: Todo;
  updateTodo: (todoUpdate: TodoUpdate) => Promise<Todo>;
  deleteTodo: (id: string) => Promise<void>;
  isLoading: boolean;
}

const TodoListItemComponent: React.FC<TodoListItemProps> = ({
  todo,
  updateTodo,
  deleteTodo,
  isLoading,
}: TodoListItemProps) => {
  const [editedText, setEditedText] = useState(todo.text);
  const [isTextChanged, setIsTextChanged] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value);
    setIsTextChanged(e.target.value !== todo.text);
  };

  const handleSave = async () => {
    if (isTextChanged) {
      await updateTodo({
        id: todo.id,
        text: editedText,
        done: todo.done,
      });
      setIsTextChanged(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setEditedText(todo.text);
      setIsTextChanged(false);
    }
  };

  const handleCheckboxChange = async (checked: boolean) => {
    await updateTodo({
      id: todo.id,
      text: todo.text,
      done: checked,
    });
  };

  return (
    <div
      key={todo.id}
      className="mb-3 flex w-full flex-row items-center space-x-3"
    >
      <Checkbox
        id={todo.id}
        checked={todo.done}
        onCheckedChange={handleCheckboxChange}
      />
      <Input
        className={cn("flex-1", todo.done && "line-through")}
        value={editedText}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
      />
      <UpdateTodoButtonComponent
        updateTodo={handleSave}
        isDisabled={!isTextChanged || isLoading}
      />
      <DeleteTodoButtonComponent
        todo={todo}
        deleteTodo={deleteTodo}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TodoListItemComponent;
