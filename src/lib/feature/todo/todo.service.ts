import { SortDirection } from "@/lib/common/sort";
import { TodoInfrastructureService } from "./todo.infrastructure.service";
import { Todo, TodoCreate, TodoUpdate } from "./todo.types";

export interface ITodoService {
  create: (todoCreate: TodoCreate) => Promise<Todo>;
  get: (id: string) => Promise<Todo>;
  list: (sortKey?: keyof Todo, sortOrder?: SortDirection) => Promise<Todo[]>;
  listWithPagination: (
    sortKey?: keyof Todo,
    sortOrder?: "asc" | "desc",
    paginationPage?: number,
    paginationLimit?: number,
  ) => Promise<Todo[]>;
  update: (todoUpdate: TodoUpdate) => Promise<Todo>;
  delete: (id: string) => Promise<void>;
  search: (
    searchKey: keyof Todo,
    searchValue: unknown,
    sortKey?: keyof Todo,
    sortOrder?: "asc" | "desc",
  ) => Promise<Todo[]>;
  searchWithPagination: (
    searchKey: keyof Todo,
    searchValue: unknown,
    sortKey?: keyof Todo,
    sortOrder?: "asc" | "desc",
    paginationPage?: number,
    paginationLimit?: number,
  ) => Promise<Todo[]>;
}

export class TodoService implements ITodoService {
  iTodoService: ITodoService;

  constructor(iTodoService: ITodoService = new TodoInfrastructureService()) {
    this.iTodoService = iTodoService;
  }

  async create(todoCreate: TodoCreate) {
    return await this.iTodoService.create(todoCreate);
  }
  async get(id: string) {
    return await this.iTodoService.get(id);
  }
  async list(sortKey?: keyof Todo, order?: "asc" | "desc") {
    return await this.iTodoService.list(sortKey, order);
  }
  async listWithPagination(
    sortKey?: keyof Todo,
    order?: "asc" | "desc",
    page?: number,
    limit?: number,
  ) {
    return await this.iTodoService.listWithPagination(
      sortKey,
      order,
      page,
      limit,
    );
  }
  async update(todoUpdate: TodoUpdate) {
    return await this.iTodoService.update(todoUpdate);
  }
  async delete(id: string) {
    return await this.iTodoService.delete(id);
  }
  async search(
    searchKey: keyof Todo,
    searchValue: unknown,
    sortKey?: keyof Todo,
    sortOrder?: "asc" | "desc",
  ) {
    return await this.iTodoService.search(
      searchKey,
      searchValue,
      sortKey,
      sortOrder,
    );
  }
  async searchWithPagination(
    searchKey: keyof Todo,
    searchValue: unknown,
    sortKey?: keyof Todo,
    sortOrder?: "asc" | "desc",
    paginationPage?: number,
    paginationLimit?: number,
  ) {
    return await this.iTodoService.searchWithPagination(
      searchKey,
      searchValue,
      sortKey,
      sortOrder,
      paginationPage,
      paginationLimit,
    );
  }
}
