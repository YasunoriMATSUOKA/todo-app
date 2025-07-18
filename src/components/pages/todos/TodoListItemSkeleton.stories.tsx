import type { Meta, StoryObj } from "@storybook/react-vite";

import TodoListItemSkeleton from "./TodoListItemSkeleton";

const meta = {
  title: "pages/todos/TodoListItemSkeleton",
  component: TodoListItemSkeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TodoListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  render: () => (
    <>
      <TodoListItemSkeleton />
      <TodoListItemSkeleton />
      <TodoListItemSkeleton />
    </>
  ),
};
