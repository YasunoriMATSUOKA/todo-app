import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
import UpdateTodoButtonComponent from "./UpdateTodoButton";

const meta = {
  title: "pages/todos/UpdateTodoButton",
  component: UpdateTodoButtonComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    updateTodo: {
      name: "updateTodo",
      description: "The function to call when the button is clicked",
      defaultValue: fn(),
    },
    isDisabled: {
      name: "isDisabled",
      description: "Whether the button should be disabled",
      control: { type: "boolean" },
      defaultValue: false,
    },
  },
  args: {
    updateTodo: fn(),
    isDisabled: false,
  },
} satisfies Meta<typeof UpdateTodoButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    updateTodo: fn(),
    isDisabled: false,
  },
};

export const Enabled: Story = {
  args: {
    updateTodo: fn(),
    isDisabled: false,
  },
};

export const Disabled: Story = {
  args: {
    updateTodo: fn(),
    isDisabled: true,
  },
};

export const WithClickHandler: Story = {
  args: {
    updateTodo: fn(() => {
      alert("Save button clicked!");
    }),
    isDisabled: false,
  },
};
