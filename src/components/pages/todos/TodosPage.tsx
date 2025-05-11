import CreateNewTodoButtonComponent from "@/components/pages/todos/CreateNewTodoButton";
import TodoListComponent from "@/components/pages/todos/TodoList";
import useTodo from "@/lib/feature/todo/todo.hooks";
import React from "react";

const TodosPageComponent: React.FC = () => {
  const { isLoading, todos, create, update, remove } = useTodo();

  return (
    <>
      <div className="m-3">
        <h2 className="text-xl font-bold">Todos</h2>
      </div>
      <div className="m-3">
        <TodoListComponent
          isLoading={isLoading}
          todos={todos}
          updateTodo={update}
          deleteTodo={remove}
        />
      </div>
      <div className="m-3">
        <CreateNewTodoButtonComponent createTodo={create} />
      </div>
    </>
  );
};

export default TodosPageComponent;
