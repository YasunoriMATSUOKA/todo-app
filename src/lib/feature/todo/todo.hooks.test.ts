import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useTodo from "./todo.hooks";
import { TodoService } from "./todo.service";
import { Todo } from "./todo.types";

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



    it("should add created todo to todos state without calling list", async () => {
      const newTodo: Todo = {
        id: "3",
        text: "New Todo",
        done: false,
        createdAt: new Date("2025-01-03"),
        updatedAt: new Date("2025-01-03"),
      };
      mockTodoService.create.mockResolvedValue(newTodo);
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      // Wait for initial load
      await waitFor(() => {
        expect(result.current.todos).toEqual(mockTodos);
      });

      // Clear the mock to ensure list is not called again
      mockTodoService.list.mockClear();

      await act(async () => {
        await result.current.create({ text: "New Todo" });
      });

      // Verify list was not called after create
      expect(mockTodoService.list).not.toHaveBeenCalled();

      // Verify the new todo was added to the state
      expect(result.current.todos).toEqual([...mockTodos, newTodo]);
    });


    it("should update todo in todos state without calling list", async () => {
      const updatedTodo: Todo = {
        id: "1",
        text: "Updated Todo",
        done: true,
        createdAt: new Date("2025-01-01"),
        updatedAt: new Date("2025-01-04"),
      };
      mockTodoService.update.mockResolvedValue(updatedTodo);
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      // Wait for initial load
      await waitFor(() => {
        expect(result.current.todos).toEqual(mockTodos);
      });

      // Clear the mock to ensure list is not called again
      mockTodoService.list.mockClear();

      await act(async () => {
        await result.current.update({
          id: "1",
          text: "Updated Todo",
          done: true,
        });
      });

      // Verify list was not called after update
      expect(mockTodoService.list).not.toHaveBeenCalled();

      // Verify the todo was updated in the state
      expect(result.current.todos).toEqual([updatedTodo, mockTodos[1]]);
    });


    it("should remove todo from todos state without calling list", async () => {
      mockTodoService.delete.mockResolvedValue(undefined);
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      // Wait for initial load
      await waitFor(() => {
        expect(result.current.todos).toEqual(mockTodos);
      });

      // Clear the mock to ensure list is not called again
      mockTodoService.list.mockClear();

      await act(async () => {
        await result.current.remove("1");
      });

      // Verify list was not called after delete
      expect(mockTodoService.list).not.toHaveBeenCalled();

      // Verify the todo was removed from the state
      expect(result.current.todos).toEqual([mockTodos[1]]);
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

    it("should set isListLoading to true on initial load", async () => {
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      expect(result.current.isListLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isListLoading).toBe(false);
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

  describe("individual loading states", () => {
    it("should track isListLoading separately from other operations", async () => {
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      // Initial list loading
      expect(result.current.isListLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isListLoading).toBe(false);
      });

      // List loading should not affect other states
      expect(result.current.isCreating).toBe(false);
      expect(result.current.updatingIds.size).toBe(0);
      expect(result.current.deletingIds.size).toBe(0);
    });

    it("should track isCreating state during create operation", async () => {
      const newTodo: Todo = {
        id: "3",
        text: "New Todo",
        done: false,
        createdAt: new Date("2025-01-03"),
        updatedAt: new Date("2025-01-03"),
      };
      mockTodoService.create.mockResolvedValue(newTodo);
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      await waitFor(() => {
        expect(result.current.isListLoading).toBe(false);
      });

      let promise: Promise<Todo>;
      act(() => {
        promise = result.current.create({ text: "New Todo" });
      });

      await waitFor(() => {
        expect(result.current.isCreating).toBe(true);
      });

      await act(async () => {
        await promise;
      });

      await waitFor(() => {
        expect(result.current.isCreating).toBe(false);
      });
    });

    it("should track individual todo update states in updatingIds", async () => {
      const updatedTodo: Todo = {
        ...mockTodo,
        text: "Updated Todo",
        updatedAt: new Date("2025-01-04"),
      };
      mockTodoService.update.mockResolvedValue(updatedTodo);
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      await waitFor(() => {
        expect(result.current.isListLoading).toBe(false);
      });

      let promise: Promise<Todo>;
      act(() => {
        promise = result.current.update({
          id: "1",
          text: "Updated Todo",
          done: false,
        });
      });

      await waitFor(() => {
        expect(result.current.updatingIds.has("1")).toBe(true);
        expect(result.current.updatingIds.size).toBe(1);
      });

      await act(async () => {
        await promise;
      });

      await waitFor(() => {
        expect(result.current.updatingIds.has("1")).toBe(false);
        expect(result.current.updatingIds.size).toBe(0);
      });
    });

    it("should track individual todo delete states in deletingIds", async () => {
      mockTodoService.delete.mockResolvedValue(undefined);
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      await waitFor(() => {
        expect(result.current.isListLoading).toBe(false);
      });

      let promise: Promise<void>;
      act(() => {
        promise = result.current.remove("1");
      });

      await waitFor(() => {
        expect(result.current.deletingIds.has("1")).toBe(true);
        expect(result.current.deletingIds.size).toBe(1);
      });

      await act(async () => {
        await promise;
      });

      await waitFor(() => {
        expect(result.current.deletingIds.has("1")).toBe(false);
        expect(result.current.deletingIds.size).toBe(0);
      });
    });

    it("should allow multiple simultaneous update operations", async () => {
      const updatedTodo1: Todo = {
        ...mockTodos[0],
        text: "Updated Todo 1",
      };
      const updatedTodo2: Todo = {
        ...mockTodos[1],
        text: "Updated Todo 2",
      };

      mockTodoService.update
        .mockResolvedValueOnce(updatedTodo1)
        .mockResolvedValueOnce(updatedTodo2);
      mockTodoService.list.mockResolvedValue(mockTodos);
      const { result } = renderHook(() => useTodo());

      await waitFor(() => {
        expect(result.current.isListLoading).toBe(false);
      });

      // Start two updates simultaneously
      let promise1: Promise<Todo>;
      let promise2: Promise<Todo>;
      act(() => {
        promise1 = result.current.update({
          id: "1",
          text: "Updated Todo 1",
          done: false,
        });
        promise2 = result.current.update({
          id: "2",
          text: "Updated Todo 2",
          done: true,
        });
      });

      await waitFor(() => {
        expect(result.current.updatingIds.has("1")).toBe(true);
        expect(result.current.updatingIds.has("2")).toBe(true);
        expect(result.current.updatingIds.size).toBe(2);
      });

      await act(async () => {
        await Promise.all([promise1, promise2]);
      });

      await waitFor(() => {
        expect(result.current.updatingIds.size).toBe(0);
      });
    });
  });
});
