import CreateNewTodoButtonComponent from "@/components/pages/todos/CreateNewTodoButton";
import TodoListComponent from "@/components/pages/todos/TodoList";
import useTodo from "@/lib/feature/todo/todo.hooks";
import React from "react";

const TodosPageComponent: React.FC = () => {
  const {
    isListLoading,
    isCreating,
    updatingIds,
    deletingIds,
    todos,
    create,
    update,
    remove,
  } = useTodo();

  return (
    <>
      <div className="m-3">
        <h2 className="text-xl font-bold">Todos</h2>
      </div>
      <div className="m-3">
        <TodoListComponent
          isLoading={isListLoading}
          todos={todos}
          updateTodo={update}
          deleteTodo={remove}
          updatingIds={updatingIds}
          deletingIds={deletingIds}
        />
      </div>
      <div className="m-3">
        <CreateNewTodoButtonComponent
          createTodo={create}
          isLoading={isCreating}
        />
      </div>
    </>
  );
};

export default TodosPageComponent;
