import { Todo, TodoCreate, TodoUpdate } from "@/lib/feature/todo/todo.types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TodoService } from "./todo.service";

const useTodo = () => {
  const todoService = useMemo(() => new TodoService(), []);

  const [id, setId] = useState<string | null | undefined>(null);
  const [todo, setTodo] = useState<Todo | null | undefined>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListLoading, setIsListLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
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
  const list = useCallback(async (): Promise<Todo[]> => {
    setIsListLoading(true);
    try {
      return await todoService.list();
    } finally {
      setIsListLoading(false);
    }
  }, [todoService]);
  const create = useCallback(
    async (todoCreate: TodoCreate): Promise<Todo> => {
      setIsCreating(true);
      try {
        const todo = await todoService.create(todoCreate);
        setTodos((prevTodos) => [...prevTodos, todo]);
        return todo;
      } finally {
        setIsCreating(false);
      }
    },
    [todoService],
  );
  const update = useCallback(
    async (todoUpdate: TodoUpdate): Promise<Todo> => {
      setUpdatingIds((prev) => new Set([...prev, todoUpdate.id]));
      try {
        const todo = await todoService.update(todoUpdate);
        setTodos((prevTodos) =>
          prevTodos.map((t) => (t.id === todo.id ? todo : t)),
        );
        return todo;
      } finally {
        setUpdatingIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(todoUpdate.id);
          return newSet;
        });
      }
    },
    [todoService],
  );
  const remove = useCallback(
    async (id: string): Promise<void> => {
      setDeletingIds((prev) => new Set([...prev, id]));
      try {
        await todoService.delete(id);
        setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
      } finally {
        setDeletingIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    },
    [todoService],
  );
  const search = useCallback(
    async (searchKey: keyof Todo, searchValue: unknown): Promise<Todo[]> =>
      withLoading(async () => todoService.search(searchKey, searchValue)),
    [todoService, withLoading],
  );

  useEffect(() => {
    list().then((todos) => {
      setTodos(todos);
    });
  }, [list]);

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
    isListLoading,
    isCreating,
    updatingIds,
    deletingIds,
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
