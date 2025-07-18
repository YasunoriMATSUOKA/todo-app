import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UpdateTodoButtonComponent from "./UpdateTodoButton";

describe("UpdateTodoButtonComponent", () => {
  const mockUpdateTodo = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render Update button", () => {
    render(
      <UpdateTodoButtonComponent
        updateTodo={mockUpdateTodo}
        isDisabled={false}
      />,
    );

    const button = screen.getByRole("button", { name: /update/i });
    expect(button).toBeInTheDocument();
  });

  it("should be disabled when isDisabled is true", () => {
    render(
      <UpdateTodoButtonComponent
        updateTodo={mockUpdateTodo}
        isDisabled={true}
      />,
    );

    const button = screen.getByRole("button", { name: /update/i });
    expect(button).toBeDisabled();
  });

  it("should be enabled when isDisabled is false", () => {
    render(
      <UpdateTodoButtonComponent
        updateTodo={mockUpdateTodo}
        isDisabled={false}
      />,
    );

    const button = screen.getByRole("button", { name: /update/i });
    expect(button).toBeEnabled();
  });

  it("should call updateTodo when clicked", async () => {
    const user = userEvent.setup();
    render(
      <UpdateTodoButtonComponent
        updateTodo={mockUpdateTodo}
        isDisabled={false}
      />,
    );

    const button = screen.getByRole("button", { name: /update/i });
    await user.click(button);

    expect(mockUpdateTodo).toHaveBeenCalledTimes(1);
  });

  it("should not call updateTodo when disabled and clicked", async () => {
    const user = userEvent.setup();
    render(
      <UpdateTodoButtonComponent
        updateTodo={mockUpdateTodo}
        isDisabled={true}
      />,
    );

    const button = screen.getByRole("button", { name: /update/i });

    // Try to click disabled button
    await user.click(button);

    expect(mockUpdateTodo).not.toHaveBeenCalled();
  });

  it("should have correct styling with variant outline", () => {
    render(
      <UpdateTodoButtonComponent
        updateTodo={mockUpdateTodo}
        isDisabled={false}
      />,
    );

    const button = screen.getByRole("button", { name: /update/i });
    expect(button).toHaveClass("border", "border-input", "bg-background");
  });
});
