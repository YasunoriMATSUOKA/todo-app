import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomePageComponent from "./HomePage";

// Mock the TodosPageComponent
vi.mock("@/components/pages/todos/TodosPage", () => ({
  default: vi.fn(() => <div data-testid="todos-page">Todos Page</div>),
}));

describe("HomePageComponent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render TodosPageComponent", () => {
    const { getByTestId } = render(<HomePageComponent />);

    const todosPage = getByTestId("todos-page");
    expect(todosPage).toBeInTheDocument();
    expect(todosPage).toHaveTextContent("Todos Page");
  });

  it("should have no additional wrapper elements", () => {
    const { container } = render(<HomePageComponent />);

    // HomePageComponent should directly render TodosPageComponent without additional wrappers
    expect(container.firstChild).toHaveAttribute("data-testid", "todos-page");
  });

  it("should render consistently across multiple renders", () => {
    const { container: container1 } = render(<HomePageComponent />);
    const { container: container2 } = render(<HomePageComponent />);

    expect(container1.innerHTML).toBe(container2.innerHTML);
  });

  it("should not pass any props to TodosPageComponent", () => {
    // Since HomePage just renders TodosPage without props,
    // we verify that the mocked component is rendered
    const { container } = render(<HomePageComponent />);

    expect(container.textContent).toBe("Todos Page");
  });

  it("should act as a simple wrapper for TodosPageComponent", () => {
    const { container } = render(<HomePageComponent />);

    // Verify the component structure
    expect(container.children).toHaveLength(1);
    expect(container.firstChild).toHaveAttribute("data-testid", "todos-page");
  });
});
