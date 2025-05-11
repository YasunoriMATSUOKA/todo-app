import { Todo, TodoCreate, TodoUpdate } from "@/lib/feature/todo/todo.types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TodoService } from "./todo.service";

const useTodo = () => {
  const todoService = useMemo(() => new TodoService(), []);

  const [id, setId] = useState<string | null | undefined>(null);
  const [todo, setTodo] = useState<Todo | null | undefined>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldBeRefreshed, setShouldBeRefreshed] = useState(true);
  const [error] = useState<Error | null | undefined>(null);

  const get = useCallback(
    async (id: string) => {
      return await todoService.get(id);
    },
    [todoService],
  );
  const list = useCallback(async () => {
    return await todoService.list();
  }, [todoService]);
  const create = async (todoCreate: TodoCreate) => {
    const todo = await todoService.create(todoCreate);
    setShouldBeRefreshed(true);
    return todo;
  };
  const update = async (todoUpdate: TodoUpdate) => {
    const todo = await todoService.update(todoUpdate);
    setShouldBeRefreshed(true);
    return todo;
  };
  const remove = async (id: string) => {
    await todoService.delete(id);
    setShouldBeRefreshed(true);
  };
  const search = async (searchKey: keyof Todo, searchValue: unknown) => {
    return await todoService.search(searchKey, searchValue);
  };

  useEffect(() => {
    if (!shouldBeRefreshed) {
      return;
    }
    setIsLoading(true);
    list()
      .then((todos) => {
        setTodos(todos);
      })
      .finally(() => {
        setIsLoading(false);
        setShouldBeRefreshed(false);
      });
  }, [shouldBeRefreshed, list, setTodos]);

  useEffect(() => {
    if (id) {
      get(id).then((selectedTodo) => {
        setTodo(selectedTodo);
      });
    }
  }, [id, get, setTodo]);

  return {
    id,
    setId,
    todo,
    todos,
    isLoading,
    error,
    create,
    get,
    list,
    update,
    remove,
    search,
  };
};

export default useTodo;
