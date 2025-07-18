import type { Meta, StoryObj } from "@storybook/react-vite";

import { expect, userEvent, waitFor, within } from "storybook/test";
import TodosPageComponent from "./TodosPage";

const meta = {
  title: "pages/todos/TodosPage",
  component: TodosPageComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TodosPageComponent>;

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
    const checkbox1 = await canvas.findByRole("checkbox", { checked: false });
    const input1 = canvas.getByRole("textbox", { name: "" });
    const deleteButton1 = canvas.getByRole("button", { name: "Delete" });
    await expect(checkbox1).toBeInTheDocument();
    await expect(input1).toBeInTheDocument();
    await expect(input1).toHaveValue("New Todo");
    await waitFor(
      () => {
        expect(input1).not.toHaveClass("line-through");
      },
      { timeout: 5000 },
    );
    await expect(deleteButton1).toBeInTheDocument();

    await userEvent.click(checkbox1);
    await waitFor(
      () => {
        expect(input1).toHaveClass("line-through");
      },
      { timeout: 5000 },
    );

    await userEvent.click(checkbox1);
    await waitFor(
      () => {
        expect(input1).not.toHaveClass("line-through");
      },
      { timeout: 5000 },
    );

    await userEvent.click(checkbox1);
    await waitFor(
      () => {
        expect(input1).toHaveClass("line-through");
      },
      { timeout: 5000 },
    );

    await userEvent.click(deleteButton1);
    await waitFor(
      () => {
        expect(checkbox1).not.toBeInTheDocument();
      },
      { timeout: 5000 },
    );
    await expect(input1).not.toBeInTheDocument();
    await expect(deleteButton1).not.toBeInTheDocument();
    await userEvent.click(createNewTodoButton);
  },
};
