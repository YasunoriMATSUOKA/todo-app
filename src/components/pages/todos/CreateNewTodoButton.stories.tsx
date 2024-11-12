import type { Meta, StoryObj } from "@storybook/react";

import { fn } from "@storybook/test";
import CreateNewTodoButtonComponent from "./CreateNewTodoButton";

const meta = {
  title: "pages/todos/CreateNewTodoButton",
  component: CreateNewTodoButtonComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    createTodo: {
      name: "createTodo",
      description: "The function to create a new todo",
      defaultValue: fn(),
    },
  },
  args: {
    createTodo: fn(),
  },
} satisfies Meta<typeof CreateNewTodoButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    createTodo: fn(),
  },
};
