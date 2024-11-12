import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

const meta = {
  title: "ui/shadcn-ui/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      name: "variant",
      description: "The variant of the button",
      defaultValue: "default",
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      name: "size",
      description: "The size of the button",
      defaultValue: "default",
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    children: {
      name: "children",
      description: "The content of the button",
      defaultValue: "Button",
      control: "text",
    },
  },
  args: {
    variant: "default",
    size: "default",
    children: "Button",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
