import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TodoListItemSkeleton from "./TodoListItemSkeleton";

describe("TodoListItemSkeleton", () => {
  it("should render skeleton elements and actual buttons", () => {
    render(<TodoListItemSkeleton />);

    // チェックボックスのスケルトンが存在することを確認
    const checkboxSkeleton = screen.getByTestId("checkbox-skeleton");
    expect(checkboxSkeleton).toBeInTheDocument();
    expect(checkboxSkeleton).toHaveClass("h-4 w-4 rounded");

    // インプットのスケルトンが存在することを確認
    const inputSkeleton = screen.getByTestId("input-skeleton");
    expect(inputSkeleton).toBeInTheDocument();
    expect(inputSkeleton).toHaveClass("h-10 flex-1");

    // 更新ボタンが実際のコンポーネントとして存在し、無効化されていることを確認
    const updateButton = screen.getByRole("button", { name: /save/i });
    expect(updateButton).toBeInTheDocument();
    expect(updateButton).toBeDisabled();

    // 削除ボタンが実際のコンポーネントとして存在し、無効化されていることを確認
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toBeDisabled();
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
