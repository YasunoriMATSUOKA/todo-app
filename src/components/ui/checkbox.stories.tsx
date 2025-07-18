import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./checkbox";

const meta = {
  title: "ui/shadcn-ui/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  args: {
    checked: false,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
