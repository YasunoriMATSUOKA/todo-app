export type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TodoCreate = {
  text: string;
};

export type TodoUpdate = {
  id: string;
  text: string;
  done: boolean;
};
