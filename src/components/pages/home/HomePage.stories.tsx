import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, userEvent, within } from "storybook/test";
import HomePageComponent from "./HomePage";

const meta = {
  title: "pages/home/HomePage",
  component: HomePageComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HomePageComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const h2 = canvas.getByRole("heading", { name: "Todos" });
    const createNewTodoButton = canvas.getByRole("button", {
      name: "Create New Todo",
    });
    await expect(h2).toBeInTheDocument();
    await expect(createNewTodoButton).toBeInTheDocument();

    await userEvent.click(createNewTodoButton);

    // Wait for the new todo to appear
    const checkbox1 = await canvas.findByRole("checkbox", { checked: false });
    const input1 = canvas.getByRole("textbox", { name: "" });
    const deleteButton1 = canvas.getByRole("button", { name: "Delete" });
    await expect(checkbox1).toBeInTheDocument();
    await expect(input1).toBeInTheDocument();
    await expect(input1).toHaveValue("New Todo");
    await expect(input1).not.toHaveClass("line-through");
    await expect(deleteButton1).toBeInTheDocument();

    await userEvent.click(checkbox1);
    await expect(input1).toHaveClass("line-through");

    await userEvent.click(checkbox1);
    await expect(input1).not.toHaveClass("line-through");

    await userEvent.click(checkbox1);
    await expect(input1).toHaveClass("line-through");

    await userEvent.click(deleteButton1);
    await expect(checkbox1).not.toBeInTheDocument();
    await expect(input1).not.toBeInTheDocument();
    await expect(deleteButton1).not.toBeInTheDocument();

    await userEvent.click(createNewTodoButton);
  },
};
