import { Todo } from "@/lib/feature/todo/todo.types";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TodoListItemComponent from "./TodoListItem";

describe("TodoListItemComponent", () => {
  const mockTodo: Todo = {
    id: "1",
    text: "Test todo",
    done: false,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
  };

  const mockUpdateTodo = vi.fn();
  const mockDeleteTodo = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUpdateTodo.mockResolvedValue(mockTodo);
    mockDeleteTodo.mockResolvedValue(undefined);
  });

  describe("Update button functionality", () => {
    it("should display an Update button", () => {
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
          isLoading={false}
        />,
      );

      const updateButton = screen.getByRole("button", { name: /update/i });
      expect(updateButton).toBeInTheDocument();
    });

    it("should not call updateTodo when text is changed without clicking Update", async () => {
      const user = userEvent.setup();
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
          isLoading={false}
        />,
      );

      const input = screen.getByDisplayValue(mockTodo.text);
      await user.clear(input);
      await user.type(input, "Updated text");

      expect(mockUpdateTodo).not.toHaveBeenCalled();
    });

    it("should call updateTodo when Update button is clicked after text change", async () => {
      const user = userEvent.setup();
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
          isLoading={false}
        />,
      );

      const input = screen.getByDisplayValue(mockTodo.text);
      await user.clear(input);
      await user.type(input, "Updated text");

      const updateButton = screen.getByRole("button", { name: /update/i });
      await user.click(updateButton);

      expect(mockUpdateTodo).toHaveBeenCalledWith({
        id: mockTodo.id,
        text: "Updated text",
        done: mockTodo.done,
      });
    });

    it("should disable Update button when text hasn't changed", () => {
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
          isLoading={false}
        />,
      );

      const updateButton = screen.getByRole("button", { name: /update/i });
      expect(updateButton).toBeDisabled();
    });

    it("should enable Update button when text has changed", async () => {
      const user = userEvent.setup();
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
          isLoading={false}
        />,
      );

      const updateButton = screen.getByRole("button", { name: /update/i });
      expect(updateButton).toBeDisabled();

      const input = screen.getByDisplayValue(mockTodo.text);
      await user.type(input, " additional text");

      expect(updateButton).toBeEnabled();
    });

    it("should disable Update button after successful update", async () => {
      const user = userEvent.setup();
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
          isLoading={false}
        />,
      );

      const input = screen.getByDisplayValue(mockTodo.text);
      await user.type(input, " additional text");

      const updateButton = screen.getByRole("button", { name: /update/i });
      await user.click(updateButton);

      await waitFor(() => {
        expect(updateButton).toBeDisabled();
      });
    });

    it("should still update todo done status immediately on checkbox change", async () => {
      const user = userEvent.setup();
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
          isLoading={false}
        />,
      );

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      expect(mockUpdateTodo).toHaveBeenCalledWith({
        id: mockTodo.id,
        text: mockTodo.text,
        done: true,
      });
    });

    it("should place Update button between input and Delete button", () => {
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
          isLoading={false}
        />,
      );

      const container = screen.getByRole("textbox").parentElement;
      const buttons = Array.from(container?.querySelectorAll("button") || []);
      const nonCheckboxButtons = buttons.filter(
        (button) => button.getAttribute("role") !== "checkbox",
      );

      expect(nonCheckboxButtons).toHaveLength(2);
      expect(nonCheckboxButtons[0]).toHaveTextContent(/update/i);
      expect(nonCheckboxButtons[1]).toHaveTextContent(/delete/i);
    });

    it("should reset text to original value when pressing Escape key", async () => {
      const user = userEvent.setup();
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
          isLoading={false}
        />,
      );

      const input = screen.getByDisplayValue(mockTodo.text) as HTMLInputElement;
      await user.clear(input);
      await user.type(input, "Changed text");

      expect(input.value).toBe("Changed text");

      await user.keyboard("{Escape}");

      expect(input.value).toBe(mockTodo.text);
    });
  });
});
