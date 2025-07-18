import type { Meta, StoryObj } from "@storybook/react-vite";

import TodoListSkeleton from "./TodoListSkeleton";

const meta = {
  title: "pages/todos/TodoListSkeleton",
  component: TodoListSkeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: { type: "number", min: 1, max: 10 },
      description: "Number of skeleton items to display",
      defaultValue: 3,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TodoListSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoItems: Story = {
  args: {
    count: 2,
  },
};

export const FiveItems: Story = {
  args: {
    count: 5,
  },
};
