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

  describe("Save button functionality", () => {
    it("should display a Save button", () => {
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
        />,
      );

      const saveButton = screen.getByRole("button", { name: /save/i });
      expect(saveButton).toBeInTheDocument();
    });

    it("should not call updateTodo when text is changed without clicking Save", async () => {
      const user = userEvent.setup();
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
        />,
      );

      const input = screen.getByDisplayValue(mockTodo.text);
      await user.clear(input);
      await user.type(input, "Updated text");

      expect(mockUpdateTodo).not.toHaveBeenCalled();
    });

    it("should call updateTodo when Save button is clicked after text change", async () => {
      const user = userEvent.setup();
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
        />,
      );

      const input = screen.getByDisplayValue(mockTodo.text);
      await user.clear(input);
      await user.type(input, "Updated text");

      const saveButton = screen.getByRole("button", { name: /save/i });
      await user.click(saveButton);

      expect(mockUpdateTodo).toHaveBeenCalledWith({
        id: mockTodo.id,
        text: "Updated text",
        done: mockTodo.done,
      });
    });

    it("should disable Save button when text hasn't changed", () => {
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
        />,
      );

      const saveButton = screen.getByRole("button", { name: /save/i });
      expect(saveButton).toBeDisabled();
    });

    it("should enable Save button when text has changed", async () => {
      const user = userEvent.setup();
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
        />,
      );

      const saveButton = screen.getByRole("button", { name: /save/i });
      expect(saveButton).toBeDisabled();

      const input = screen.getByDisplayValue(mockTodo.text);
      await user.type(input, " additional text");

      expect(saveButton).toBeEnabled();
    });

    it("should disable Save button after successful save", async () => {
      const user = userEvent.setup();
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
        />,
      );

      const input = screen.getByDisplayValue(mockTodo.text);
      await user.type(input, " additional text");

      const saveButton = screen.getByRole("button", { name: /save/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(saveButton).toBeDisabled();
      });
    });

    it("should still update todo done status immediately on checkbox change", async () => {
      const user = userEvent.setup();
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
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

    it("should place Save button between input and Delete button", () => {
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
        />,
      );

      const container = screen.getByRole("textbox").parentElement;
      const buttons = Array.from(container?.querySelectorAll("button") || []);
      const nonCheckboxButtons = buttons.filter(
        (button) => button.getAttribute("role") !== "checkbox",
      );

      expect(nonCheckboxButtons).toHaveLength(2);
      expect(nonCheckboxButtons[0]).toHaveTextContent(/save/i);
      expect(nonCheckboxButtons[1]).toHaveTextContent(/delete/i);
    });

    it("should reset text to original value when pressing Escape key", async () => {
      const user = userEvent.setup();
      render(
        <TodoListItemComponent
          todo={mockTodo}
          updateTodo={mockUpdateTodo}
          deleteTodo={mockDeleteTodo}
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
