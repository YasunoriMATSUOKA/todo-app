import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TodoListSkeleton from "./TodoListSkeleton";

describe("TodoListSkeleton", () => {
  it("should render default 3 skeleton items", () => {
    render(<TodoListSkeleton />);

    const skeletonItems = screen.getAllByTestId(/skeleton-item-\d+/);
    expect(skeletonItems).toHaveLength(3);
  });

  it("should render custom number of skeleton items", () => {
    render(<TodoListSkeleton count={5} />);

    const skeletonItems = screen.getAllByTestId(/skeleton-item-\d+/);
    expect(skeletonItems).toHaveLength(5);
  });

  it("should render TodoListItemSkeleton components", () => {
    render(<TodoListSkeleton count={2} />);

    // 各スケルトンアイテムがTodoListItemSkeletonの構造を持つことを確認
    const checkboxSkeletons = screen.getAllByTestId("checkbox-skeleton");
    expect(checkboxSkeletons).toHaveLength(2);

    const inputSkeletons = screen.getAllByTestId("input-skeleton");
    expect(inputSkeletons).toHaveLength(2);

    const updateButtonSkeletons = screen.getAllByTestId(
      "update-button-skeleton",
    );
    expect(updateButtonSkeletons).toHaveLength(2);

    const deleteButtonSkeletons = screen.getAllByTestId(
      "delete-button-skeleton",
    );
    expect(deleteButtonSkeletons).toHaveLength(2);
  });
});
