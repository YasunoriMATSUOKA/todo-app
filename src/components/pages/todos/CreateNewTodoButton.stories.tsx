import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
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
    isLoading: {
      name: "isLoading",
      description: "Whether the button should be disabled due to loading state",
      control: "boolean",
      defaultValue: false,
    },
  },
  args: {
    createTodo: fn(),
    isLoading: false,
  },
} satisfies Meta<typeof CreateNewTodoButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    createTodo: fn(),
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    createTodo: fn(),
    isLoading: true,
  },
};

export const Interactive: Story = {
  args: {
    createTodo: fn().mockImplementation((todoCreate) => {
      console.log("Creating todo:", todoCreate);
      return Promise.resolve({
        id: "new-123",
        text: todoCreate.text,
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }),
    isLoading: false,
  },
};
