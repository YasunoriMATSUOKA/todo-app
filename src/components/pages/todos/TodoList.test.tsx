import { Todo } from "@/lib/feature/todo/todo.types";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TodoList from "./TodoList";

describe("TodoList", () => {
  const mockTodos: Todo[] = [
    {
      id: "1",
      text: "Test todo 1",
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      text: "Test todo 2",
      done: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockUpdateTodo = vi.fn();
  const mockDeleteTodo = vi.fn();

  it("should render TodoListSkeleton when loading", () => {
    render(
      <TodoList
        isLoading={true}
        todos={mockTodos}
        updateTodo={mockUpdateTodo}
        deleteTodo={mockDeleteTodo}
      />,
    );

    // スケルトンアイテムが表示されることを確認
    const skeletonItems = screen.getAllByTestId(/skeleton-item-\d+/);
    expect(skeletonItems).toHaveLength(3); // デフォルトは3つ

    // TodoListItemコンポーネントが表示されないことを確認
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("should render TodoListItems when not loading", () => {
    render(
      <TodoList
        isLoading={false}
        todos={mockTodos}
        updateTodo={mockUpdateTodo}
        deleteTodo={mockDeleteTodo}
      />,
    );

    // スケルトンが表示されないことを確認
    expect(screen.queryByTestId(/skeleton-item-\d+/)).not.toBeInTheDocument();

    // TodoListItemコンポーネントが表示されることを確認
    const textboxes = screen.getAllByRole("textbox");
    expect(textboxes).toHaveLength(2);
    expect(textboxes[0]).toHaveValue("Test todo 1");
    expect(textboxes[1]).toHaveValue("Test todo 2");
  });

  it("should render empty list when not loading and no todos", () => {
    render(
      <TodoList
        isLoading={false}
        todos={[]}
        updateTodo={mockUpdateTodo}
        deleteTodo={mockDeleteTodo}
      />,
    );

    // スケルトンが表示されないことを確認
    expect(screen.queryByTestId(/skeleton-item-\d+/)).not.toBeInTheDocument();

    // TodoListItemコンポーネントが表示されないことを確認
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});
