import type { Meta, StoryObj } from "@storybook/react";

import { fn } from "@storybook/test";
import TodoListItemComponent from "./TodoListItem";

const meta = {
  title: "pages/todos/TodoListItem",
  component: TodoListItemComponent,
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
    updateTodo: {
      name: "updateTodo",
      description: "The function to update the todo",
      defaultValue: fn(),
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
} satisfies Meta<typeof TodoListItemComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    todo: {
      id: "1",
      text: "Todo Example Text",
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    updateTodo: fn(),
    deleteTodo: fn(),
  },
};

export const NotDone: Story = {
  args: {
    todo: {
      id: "1",
      text: "Todo Example Text",
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    updateTodo: fn(),
    deleteTodo: fn(),
  },
};

export const Done: Story = {
  args: {
    todo: {
      id: "1",
      text: "Todo Example Text",
      done: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    updateTodo: fn(),
    deleteTodo: fn(),
  },
};
