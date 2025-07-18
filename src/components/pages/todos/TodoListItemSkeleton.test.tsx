import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TodoListItemSkeleton from "./TodoListItemSkeleton";

describe("TodoListItemSkeleton", () => {
  it("should render skeleton elements", () => {
    render(<TodoListItemSkeleton />);

    // チェックボックスのスケルトンが存在することを確認
    const checkboxSkeleton = screen.getByTestId("checkbox-skeleton");
    expect(checkboxSkeleton).toBeInTheDocument();
    expect(checkboxSkeleton).toHaveClass("h-4 w-4 rounded");

    // インプットのスケルトンが存在することを確認
    const inputSkeleton = screen.getByTestId("input-skeleton");
    expect(inputSkeleton).toBeInTheDocument();
    expect(inputSkeleton).toHaveClass("h-10 flex-1");

    // 更新ボタンのスケルトンが存在することを確認
    const updateButtonSkeleton = screen.getByTestId("update-button-skeleton");
    expect(updateButtonSkeleton).toBeInTheDocument();
    expect(updateButtonSkeleton).toHaveClass("h-10 w-10");

    // 削除ボタンのスケルトンが存在することを確認
    const deleteButtonSkeleton = screen.getByTestId("delete-button-skeleton");
    expect(deleteButtonSkeleton).toBeInTheDocument();
    expect(deleteButtonSkeleton).toHaveClass("h-10 w-10");
  });

  it("should have correct layout structure", () => {
    const { container } = render(<TodoListItemSkeleton />);

    // 適切なレイアウト構造を持つことを確認
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass(
      "mb-3 flex w-full flex-row items-center space-x-3",
    );
  });
});
