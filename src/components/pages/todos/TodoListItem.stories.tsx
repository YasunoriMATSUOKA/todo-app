import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
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
    isLoading: {
      name: "isLoading",
      description:
        "Whether the buttons should be disabled due to loading state",
      control: "boolean",
      defaultValue: false,
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
    isLoading: false,
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
    isLoading: false,
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
    isLoading: false,
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
    isLoading: false,
  },
};

export const EditingText: Story = {
  args: {
    todo: {
      id: "1",
      text: "Type here to see Save button enabled",
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    updateTodo: fn(),
    deleteTodo: fn(),
    isLoading: false,
  },
};

export const WithLongText: Story = {
  args: {
    todo: {
      id: "1",
      text: "This is a very long todo text that might wrap to multiple lines depending on the container width",
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    updateTodo: fn(),
    deleteTodo: fn(),
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    todo: {
      id: "1",
      text: "This todo is in loading state",
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    updateTodo: fn(),
    deleteTodo: fn(),
    isLoading: true,
  },
};
