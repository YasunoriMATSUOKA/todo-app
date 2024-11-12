import type { Meta, StoryObj } from "@storybook/react";

import { fn } from "@storybook/test";
import DeleteTodoButtonComponent from "./DeleteTodoButton";

const meta = {
  title: "pages/todos/DeleteTodoButton",
  component: DeleteTodoButtonComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    todo: {
      name: "todo",
      description: "The todo to delete",
      defaultValue: {
        id: "1",
        text: "Todo Example",
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
    deleteTodo: {
      name: "deleteTodo",
      description: "The function to delete the todo",
      defaultValue: fn(),
    },
  },
  args: {
    todo: {
      id: "1",
      text: "Todo Example",
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    deleteTodo: fn(),
  },
} satisfies Meta<typeof DeleteTodoButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    todo: {
      id: "1",
      text: "Todo Example",
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    deleteTodo: fn(),
  },
};
