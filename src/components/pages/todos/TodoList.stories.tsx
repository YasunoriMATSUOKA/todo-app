import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
import TodoListComponent from "./TodoList";

const meta = {
  title: "pages/todos/TodoList",
  component: TodoListComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    todos: {
      name: "todos",
      description: "The list of todos",
      defaultValue: [
        {
          id: "1",
          text: "Todo 1 Example",
          done: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          text: "Todo 2 Example",
          done: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3",
          text: "Todo 3 Example",
          done: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4",
          text: "Todo 4 Example",
          done: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
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
    todos: [
      {
        id: "1",
        text: "Todo 1 Example",
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        text: "Todo 2 Example",
        done: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        text: "Todo 3 Example",
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4",
        text: "Todo 4 Example",
        done: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    updateTodo: fn(),
    deleteTodo: fn(),
    updatingIds: new Set<string>(),
    deletingIds: new Set<string>(),
  },
} satisfies Meta<typeof TodoListComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    isLoading: false,
    todos: [
      {
        id: "1",
        text: "Todo 1 Example",
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        text: "Todo 2 Example",
        done: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        text: "Todo 3 Example",
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4",
        text: "Todo 4 Example",
        done: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    updateTodo: fn(),
    deleteTodo: fn(),
    updatingIds: new Set<string>(),
    deletingIds: new Set<string>(),
  },
};

export const NotEmpty: Story = {
  args: {
    isLoading: false,
    todos: [
      {
        id: "1",
        text: "Todo 1 Example",
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        text: "Todo 2 Example",
        done: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        text: "Todo 3 Example",
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4",
        text: "Todo 4 Example",
        done: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    updateTodo: fn(),
    deleteTodo: fn(),
    updatingIds: new Set<string>(),
    deletingIds: new Set<string>(),
  },
};

export const Empty: Story = {
  args: {
    isLoading: false,
    todos: [],
    updateTodo: fn(),
    deleteTodo: fn(),
    updatingIds: new Set<string>(),
    deletingIds: new Set<string>(),
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    todos: [],
    updateTodo: fn(),
    deleteTodo: fn(),
    updatingIds: new Set<string>(),
    deletingIds: new Set<string>(),
  },
};

export const LoadingWithData: Story = {
  args: {
    isLoading: true,
    todos: [
      {
        id: "1",
        text: "Todo 1 Example",
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        text: "Todo 2 Example",
        done: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    updateTodo: fn(),
    deleteTodo: fn(),
    updatingIds: new Set<string>(),
    deletingIds: new Set<string>(),
  },
};
