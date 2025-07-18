import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
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
    isLoading: {
      name: "isLoading",
      description: "Whether the button should be disabled due to loading state",
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
} satisfies Meta<typeof DeleteTodoButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
};

export const WithCompletedTodo: Story = {
  args: {
    todo: {
      id: "2",
      text: "Completed Todo Example",
      done: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    deleteTodo: fn(),
    isLoading: false,
  },
};

export const WithLongText: Story = {
  args: {
    todo: {
      id: "3",
      text: "This is a very long todo text that might affect the button layout in some way",
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    deleteTodo: fn(),
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    todo: {
      id: "4",
      text: "Todo being processed",
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    deleteTodo: fn(),
    isLoading: true,
  },
};

export const Interactive: Story = {
  args: {
    todo: {
      id: "5",
      text: "Click to delete this todo",
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    deleteTodo: fn().mockImplementation((id: string) => {
      console.log(`Delete button clicked for todo with id: ${id}`);
      return Promise.resolve();
    }),
    isLoading: false,
  },
};
