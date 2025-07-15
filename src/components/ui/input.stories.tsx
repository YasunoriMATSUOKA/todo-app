import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./input";

const meta = {
  title: "ui/shadcn-ui/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      defaultValue: "text",
      control: "select",
      options: [
        "text",
        "email",
        "password",
        "number",
        "tel",
        "url",
        "search",
        "date",
        "datetime-local",
        "month",
        "week",
        "time",
        "color",
        "file",
        "checkbox",
        "radio",
        "range",
        "hidden",
        "image",
        "button",
        "reset",
        "submit",
      ],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
