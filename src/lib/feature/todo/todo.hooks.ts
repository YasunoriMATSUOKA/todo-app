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

  const withLoading = useCallback(
    async <T>(operation: () => Promise<T>): Promise<T> => {
      setIsLoading(true);
      try {
        return await operation();
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading],
  );

  const get = useCallback(
    async (id: string): Promise<Todo> =>
      withLoading(async () => todoService.get(id)),
    [todoService, withLoading],
  );
  const list = useCallback(
    async (): Promise<Todo[]> => withLoading(async () => todoService.list()),
    [todoService, withLoading],
  );
  const create = useCallback(
    async (todoCreate: TodoCreate): Promise<Todo> =>
      withLoading(async () => {
        const todo = await todoService.create(todoCreate);
        setShouldBeRefreshed(true);
        return todo;
      }),
    [todoService, withLoading, setShouldBeRefreshed],
  );
  const update = useCallback(
    async (todoUpdate: TodoUpdate): Promise<Todo> =>
      withLoading(async () => {
        const todo = await todoService.update(todoUpdate);
        setShouldBeRefreshed(true);
        return todo;
      }),
    [todoService, withLoading, setShouldBeRefreshed],
  );
  const remove = useCallback(
    async (id: string): Promise<void> =>
      withLoading(async () => {
        await todoService.delete(id);
        setShouldBeRefreshed(true);
      }),
    [todoService, withLoading, setShouldBeRefreshed],
  );
  const search = useCallback(
    async (searchKey: keyof Todo, searchValue: unknown): Promise<Todo[]> =>
      withLoading(async () => todoService.search(searchKey, searchValue)),
    [todoService, withLoading],
  );

  useEffect(() => {
    if (!shouldBeRefreshed) {
      return;
    }
    list()
      .then((todos) => {
        setTodos(todos);
      })
      .finally(() => {
        setShouldBeRefreshed(false);
      });
  }, [shouldBeRefreshed, list, setTodos]);

  useEffect(() => {
    if (id) {
      get(id)
        .then((selectedTodo) => {
          setTodo(selectedTodo);
        })
        .catch(() => {
          // Error handling: Just ignore the error for now
          setTodo(null);
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
