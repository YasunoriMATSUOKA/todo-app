import { Todo } from "@/lib/feature/todo/todo.types";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DeleteTodoButtonComponent from "./DeleteTodoButton";

describe("DeleteTodoButtonComponent", () => {
  const mockTodo: Todo = {
    id: "1",
    text: "Test todo",
    done: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it("should render Delete button", () => {
    const mockDeleteTodo = vi.fn();
    render(
      <DeleteTodoButtonComponent
        todo={mockTodo}
        deleteTodo={mockDeleteTodo}
        isLoading={false}
      />,
    );

    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("X Delete");
  });

  it("should call deleteTodo when clicked", async () => {
    const mockDeleteTodo = vi.fn().mockResolvedValue(undefined);
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    render(
      <DeleteTodoButtonComponent
        todo={mockTodo}
        deleteTodo={mockDeleteTodo}
        isLoading={false}
      />,
    );

    const button = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(button);

    expect(mockDeleteTodo).toHaveBeenCalledWith("1");
    expect(mockDeleteTodo).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Todo Deleted");
    });

    consoleSpy.mockRestore();
  });

  it("should have correct styling with variant outline", () => {
    const mockDeleteTodo = vi.fn();
    render(
      <DeleteTodoButtonComponent
        todo={mockTodo}
        deleteTodo={mockDeleteTodo}
        isLoading={false}
      />,
    );

    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toHaveClass("border", "border-input");
  });

  it("should handle errors gracefully", async () => {
    const mockDeleteTodo = vi
      .fn()
      .mockRejectedValue(new Error("Delete failed"));
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <DeleteTodoButtonComponent
        todo={mockTodo}
        deleteTodo={mockDeleteTodo}
        isLoading={false}
      />,
    );

    const button = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDeleteTodo).toHaveBeenCalledWith("1");
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to delete todo:",
        expect.any(Error),
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("should be enabled when isLoading is false", () => {
    const mockDeleteTodo = vi.fn();
    render(
      <DeleteTodoButtonComponent
        todo={mockTodo}
        deleteTodo={mockDeleteTodo}
        isLoading={false}
      />,
    );

    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).not.toBeDisabled();
  });

  it("should be disabled when isLoading is true", () => {
    const mockDeleteTodo = vi.fn();
    render(
      <DeleteTodoButtonComponent
        todo={mockTodo}
        deleteTodo={mockDeleteTodo}
        isLoading={true}
      />,
    );

    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toBeDisabled();
  });

  it("should not call deleteTodo when disabled and clicked", () => {
    const mockDeleteTodo = vi.fn();
    render(
      <DeleteTodoButtonComponent
        todo={mockTodo}
        deleteTodo={mockDeleteTodo}
        isLoading={true}
      />,
    );

    const button = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(button);

    expect(mockDeleteTodo).not.toHaveBeenCalled();
  });
});
