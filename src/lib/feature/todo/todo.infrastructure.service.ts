import { sortObjectArray } from "@/lib/common/sort";
import { PrivateKey } from "symbol-sdk";
import { Network, SymbolFacade, descriptors } from "symbol-sdk/symbol";
import { ITodoService } from "./todo.service";
import { Todo, TodoCreate, TodoUpdate } from "./todo.types";

export class TodoInfrastructureService implements ITodoService {
  todos: Todo[] = [];

  async create(todoCreate: TodoCreate): Promise<Todo> {
    // Note: temporally impl to check symbol sdk worked or not
    const facade = new SymbolFacade(Network.TESTNET);
    const account = facade.createAccount(PrivateKey.random());
    const descriptor = new descriptors.TransferTransactionV1Descriptor(
      account.address,
    );
    const transaction = facade.createTransactionFromTypedDescriptor(
      descriptor,
      account.publicKey,
      100,
      2 * 3600,
    );
    const signature = account.signTransaction(transaction);
    const jsonPayload = facade.transactionFactory.static.attachSignature(
      transaction,
      signature,
    );
    console.log({ jsonPayload });

    const now = new Date();
    const newTodo: Todo = {
      ...todoCreate,
      id: `dummy-id-${Math.random()}`,
      done: false,
      createdAt: now,
      updatedAt: now,
    };
    const newTodos: Todo[] = [...this.todos, newTodo];
    this.todos = newTodos;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newTodo);
      }, 1000);
    });
  }

  async get(id: string): Promise<Todo> {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw Error("Todo Not Found");
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(todo);
      }, 1000);
    });
  }

  async list(
    sortKey: keyof Todo = "createdAt",
    sortOrder: "asc" | "desc" = "asc",
  ): Promise<Todo[]> {
    const sortedTodos: Todo[] = sortObjectArray(this.todos, sortKey, sortOrder);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sortedTodos);
      }, 1000);
    });
  }

  async listWithPagination(
    sortKey: keyof Todo = "createdAt",
    sortOrder: "asc" | "desc" = "asc",
    paginationPage: number = 1,
    paginationLimit: number = 10,
  ): Promise<Todo[]> {
    const sortedTodos: Todo[] = sortObjectArray(this.todos, sortKey, sortOrder);
    const start = (paginationPage - 1) * paginationLimit;
    const end = start + paginationLimit;
    const pagedTodos = sortedTodos.slice(start, end);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pagedTodos);
      }, 1000);
    });
  }

  async update(todoUpdate: TodoUpdate): Promise<Todo> {
    const index = this.todos.findIndex((todo) => todo.id === todoUpdate.id);
    if (index === -1) {
      throw Error("Todo Not Found");
    }
    const updatedTodo: Todo = {
      ...this.todos[index],
      ...todoUpdate,
      updatedAt: new Date(),
    };
    const newTodos = this.todos.map((todo) =>
      todo.id === todoUpdate.id ? updatedTodo : todo,
    );
    this.todos = newTodos;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(updatedTodo);
      }, 1000);
    });
  }

  async delete(id: string): Promise<void> {
    const newTodos = this.todos.filter((todo) => todo.id !== id);
    this.todos = newTodos;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  async search(
    searchKey: keyof Todo,
    searchValue: unknown,
    sortKey: keyof Todo = "createdAt",
    sortOrder: "asc" | "desc" = "asc",
  ): Promise<Todo[]> {
    const filteredTodos = this.todos.filter(
      (todo) => todo[searchKey] === searchValue,
    );
    const sortedTodos = sortObjectArray(filteredTodos, sortKey, sortOrder);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(sortedTodos);
      }, 1000);
    });
  }

  async searchWithPagination(
    searchKey: keyof Todo,
    searchValue: unknown,
    sortKey: keyof Todo = "createdAt",
    sortOrder: "asc" | "desc" = "asc",
    paginationPage: number = 1,
    paginationLimit: number = 10,
  ): Promise<Todo[]> {
    const filteredTodos = this.todos.filter(
      (todo) => todo[searchKey] === searchValue,
    );
    const sortedTodos = sortObjectArray(filteredTodos, sortKey, sortOrder);
    const start = (paginationPage - 1) * paginationLimit;
    const end = start + paginationLimit;
    const pagedTodos = sortedTodos.slice(start, end);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pagedTodos);
      }, 1000);
    });
  }
}
