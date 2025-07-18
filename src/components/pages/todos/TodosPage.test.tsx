import { Todo } from "@/lib/feature/todo/todo.types";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TodosPageComponent from "./TodosPage";

// Mock the useTodo hook
vi.mock("@/lib/feature/todo/todo.hooks", () => ({
  default: vi.fn(),
}));

// Mock the child components
vi.mock("@/components/pages/todos/CreateNewTodoButton", () => ({
  default: vi.fn(({ createTodo, isLoading }) => (
    <button
      data-testid="create-todo-button"
      disabled={isLoading}
      onClick={() => createTodo()}
    >
      Create New Todo
    </button>
  )),
}));

vi.mock("@/components/pages/todos/TodoList", () => ({
  default: vi.fn(({ isLoading, todos, updateTodo, deleteTodo }) => (
    <div data-testid="todo-list">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        todos.map((todo: Todo) => (
          <div key={todo.id} data-testid={`todo-${todo.id}`}>
            {todo.text}
            <button onClick={() => updateTodo(todo)}>Update</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  )),
}));

import useTodo from "@/lib/feature/todo/todo.hooks";

describe("TodosPageComponent", () => {
  const mockUseTodo = useTodo as ReturnType<typeof vi.fn>;

  const mockTodos = [
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

  const mockCreate = vi.fn();
  const mockUpdate = vi.fn();
  const mockRemove = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTodo.mockReturnValue({
      isLoading: false,
      todos: mockTodos,
      create: mockCreate,
      update: mockUpdate,
      remove: mockRemove,
    });
  });

  it("should render the page title", () => {
    render(<TodosPageComponent />);

    expect(screen.getByText("Todos")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Todos",
    );
  });

  it("should render TodoList component with correct props", () => {
    render(<TodosPageComponent />);

    const todoList = screen.getByTestId("todo-list");
    expect(todoList).toBeInTheDocument();

    // Check if todos are rendered
    expect(screen.getByTestId("todo-1")).toHaveTextContent("Test todo 1");
    expect(screen.getByTestId("todo-2")).toHaveTextContent("Test todo 2");
  });

  it("should render CreateNewTodoButton component", () => {
    render(<TodosPageComponent />);

    const createButton = screen.getByTestId("create-todo-button");
    expect(createButton).toBeInTheDocument();
    expect(createButton).toHaveTextContent("Create New Todo");
  });

  it("should pass isLoading state to child components", () => {
    mockUseTodo.mockReturnValue({
      isLoading: true,
      todos: [],
      create: mockCreate,
      update: mockUpdate,
      remove: mockRemove,
    });

    render(<TodosPageComponent />);

    // TodoList should show loading state
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // CreateNewTodoButton should be disabled
    const createButton = screen.getByTestId("create-todo-button");
    expect(createButton).toBeDisabled();
  });

  it("should pass correct functions to child components", () => {
    render(<TodosPageComponent />);

    // Test create function
    const createButton = screen.getByTestId("create-todo-button");
    createButton.click();
    expect(mockCreate).toHaveBeenCalledTimes(1);

    // Test update function
    const updateButtons = screen.getAllByText("Update");
    updateButtons[0].click();
    expect(mockUpdate).toHaveBeenCalledWith(mockTodos[0]);

    // Test delete function
    const deleteButtons = screen.getAllByText("Delete");
    deleteButtons[0].click();
    expect(mockRemove).toHaveBeenCalledWith("1");
  });

  it("should handle empty todos list", () => {
    mockUseTodo.mockReturnValue({
      isLoading: false,
      todos: [],
      create: mockCreate,
      update: mockUpdate,
      remove: mockRemove,
    });

    render(<TodosPageComponent />);

    const todoList = screen.getByTestId("todo-list");
    expect(todoList).toBeInTheDocument();
    expect(todoList.children).toHaveLength(0);
  });

  it("should have correct layout structure", () => {
    const { container } = render(<TodosPageComponent />);

    const divs = container.querySelectorAll("div.m-3");
    expect(divs).toHaveLength(3);

    // First div contains the title
    expect(divs[0]).toContainElement(screen.getByText("Todos"));

    // Second div contains the TodoList
    expect(divs[1]).toContainElement(screen.getByTestId("todo-list"));

    // Third div contains the CreateNewTodoButton
    expect(divs[2]).toContainElement(screen.getByTestId("create-todo-button"));
  });

  it("should use useTodo hook on mount", () => {
    render(<TodosPageComponent />);

    expect(mockUseTodo).toHaveBeenCalled();
  });

  it("should handle loading state with multiple todos", () => {
    mockUseTodo.mockReturnValue({
      isLoading: true,
      todos: mockTodos, // Even with todos, loading state should show skeleton
      create: mockCreate,
      update: mockUpdate,
      remove: mockRemove,
    });

    render(<TodosPageComponent />);

    // Should show loading state even with todos present
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
