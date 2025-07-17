import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useTodo from "./todo.hooks";
import { TodoService } from "./todo.service";
import { Todo, TodoCreate, TodoUpdate } from "./todo.types";

vi.mock("./todo.service");

describe("useTodo", () => {
  const mockTodo: Todo = {
    id: "1",
    text: "Test Todo",
    done: false,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
  };

  const mockTodos: Todo[] = [
    mockTodo,
    {
      id: "2",
      text: "Another Todo",
      done: true,
      createdAt: new Date("2025-01-02"),
      updatedAt: new Date("2025-01-02"),
    },
  ];

  let mockTodoService: {
    get: ReturnType<typeof vi.fn>;
    list: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    search: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockTodoService = {
      get: vi.fn(),
      list: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      search: vi.fn(),
    };

    vi.mocked(TodoService).mockImplementation(
      () => mockTodoService as unknown as TodoService,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("loading states", () => {
    it("should set isLoading to true when getting a todo, then false when complete", async () => {
      mockTodoService.get.mockResolvedValue(mockTodo);
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let promise: Promise<Todo>;
      act(() => {
        promise = result.current.get("1");
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });

      await act(async () => {
        await promise;
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("should set isLoading to true when listing todos, then false when complete", async () => {
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let promise: Promise<Todo[]>;
      act(() => {
        promise = result.current.list();
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });

      await act(async () => {
        await promise;
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("should set isLoading to true when creating a todo, then false when complete", async () => {
      const todoCreate: TodoCreate = { text: "New Todo" };
      mockTodoService.create.mockResolvedValue(mockTodo);
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let promise: Promise<Todo>;
      act(() => {
        promise = result.current.create(todoCreate);
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });

      await act(async () => {
        await promise;
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("should set isLoading to true when updating a todo, then false when complete", async () => {
      const todoUpdate: TodoUpdate = {
        id: "1",
        text: "Updated Todo",
        done: false,
      };
      mockTodoService.update.mockResolvedValue(mockTodo);
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let promise: Promise<Todo>;
      act(() => {
        promise = result.current.update(todoUpdate);
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });

      await act(async () => {
        await promise;
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("should set isLoading to true when removing a todo, then false when complete", async () => {
      mockTodoService.delete.mockResolvedValue(undefined);
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let promise: Promise<void>;
      act(() => {
        promise = result.current.remove("1");
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });

      await act(async () => {
        await promise;
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("should set isLoading to true when searching todos, then false when complete", async () => {
      mockTodoService.search.mockResolvedValue(mockTodos);
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      let promise: Promise<Todo[]>;
      act(() => {
        promise = result.current.search("text", "Test");
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });

      await act(async () => {
        await promise;
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("should set isLoading to true on initial load when shouldBeRefreshed is true", async () => {
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.todos).toEqual(mockTodos);
    });

    it("should handle errors properly and reset loading state", async () => {
      const error = new Error("Failed to fetch");
      mockTodoService.get.mockRejectedValue(error);
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await expect(result.current.get("1")).rejects.toThrow(
          "Failed to fetch",
        );
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("should handle errors in create and reset loading state", async () => {
      const error = new Error("Failed to create");
      mockTodoService.create.mockRejectedValue(error);
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await expect(result.current.create({ text: "New" })).rejects.toThrow(
          "Failed to create",
        );
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("should handle errors in update and reset loading state", async () => {
      const error = new Error("Failed to update");
      mockTodoService.update.mockRejectedValue(error);
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await expect(
          result.current.update({
            id: "1",
            text: "Updated",
            done: false,
          }),
        ).rejects.toThrow("Failed to update");
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("should handle errors in remove and reset loading state", async () => {
      const error = new Error("Failed to delete");
      mockTodoService.delete.mockRejectedValue(error);
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await expect(result.current.remove("1")).rejects.toThrow(
          "Failed to delete",
        );
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });
});
