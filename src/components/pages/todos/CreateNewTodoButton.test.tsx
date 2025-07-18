import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CreateNewTodoButtonComponent from "./CreateNewTodoButton";

describe("CreateNewTodoButtonComponent", () => {
  it("should render Create New Todo button", () => {
    const mockCreateTodo = vi.fn();
    render(
      <CreateNewTodoButtonComponent
        createTodo={mockCreateTodo}
        isLoading={false}
      />,
    );

    const button = screen.getByRole("button", { name: /create new todo/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Create New Todo");
  });

  it("should have full width styling", () => {
    const mockCreateTodo = vi.fn();
    render(
      <CreateNewTodoButtonComponent
        createTodo={mockCreateTodo}
        isLoading={false}
      />,
    );

    const button = screen.getByRole("button", { name: /create new todo/i });
    expect(button).toHaveClass("w-full");
  });

  it("should call createTodo with 'New Todo' text when clicked", async () => {
    const mockTodo = {
      id: "123",
      text: "New Todo",
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockCreateTodo = vi.fn().mockResolvedValue(mockTodo);
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    render(
      <CreateNewTodoButtonComponent
        createTodo={mockCreateTodo}
        isLoading={false}
      />,
    );

    const button = screen.getByRole("button", { name: /create new todo/i });
    fireEvent.click(button);

    expect(mockCreateTodo).toHaveBeenCalledWith({
      text: "New Todo",
    });
    expect(mockCreateTodo).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Todo Created", mockTodo);
    });

    consoleSpy.mockRestore();
  });

  it("should handle errors gracefully", async () => {
    const mockCreateTodo = vi
      .fn()
      .mockRejectedValue(new Error("Create failed"));
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <CreateNewTodoButtonComponent
        createTodo={mockCreateTodo}
        isLoading={false}
      />,
    );

    const button = screen.getByRole("button", { name: /create new todo/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockCreateTodo).toHaveBeenCalledWith({
        text: "New Todo",
      });
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to create todo:",
        expect.any(Error),
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("should be enabled when isLoading is false", () => {
    const mockCreateTodo = vi.fn();
    render(
      <CreateNewTodoButtonComponent
        createTodo={mockCreateTodo}
        isLoading={false}
      />,
    );

    const button = screen.getByRole("button", { name: /create new todo/i });
    expect(button).not.toBeDisabled();
  });

  it("should be disabled when isLoading is true", () => {
    const mockCreateTodo = vi.fn();
    render(
      <CreateNewTodoButtonComponent
        createTodo={mockCreateTodo}
        isLoading={true}
      />,
    );

    const button = screen.getByRole("button", { name: /creating new todo/i });
    expect(button).toBeDisabled();
  });

  it("should show loading text when isLoading is true", () => {
    const mockCreateTodo = vi.fn();
    render(
      <CreateNewTodoButtonComponent
        createTodo={mockCreateTodo}
        isLoading={true}
      />,
    );

    const button = screen.getByRole("button", { name: /creating new todo/i });
    expect(button).toHaveTextContent("Creating New Todo...");
  });

  it("should not call createTodo when disabled and clicked", () => {
    const mockCreateTodo = vi.fn();
    render(
      <CreateNewTodoButtonComponent
        createTodo={mockCreateTodo}
        isLoading={true}
      />,
    );

    const button = screen.getByRole("button", { name: /creating new todo/i });
    fireEvent.click(button);

    expect(mockCreateTodo).not.toHaveBeenCalled();
  });

  it("should handle multiple rapid clicks", () => {
    const mockCreateTodo = vi.fn().mockResolvedValue({
      id: "123",
      text: "New Todo",
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    render(
      <CreateNewTodoButtonComponent
        createTodo={mockCreateTodo}
        isLoading={false}
      />,
    );

    const button = screen.getByRole("button", { name: /create new todo/i });

    // Click multiple times rapidly
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    // Should be called 3 times
    expect(mockCreateTodo).toHaveBeenCalledTimes(3);
  });
});
