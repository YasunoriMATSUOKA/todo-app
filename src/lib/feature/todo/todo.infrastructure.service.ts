import { sortObjectArray } from "@/lib/common/sort";
import { PrivateKey, utils } from "symbol-sdk";
import {
  Network,
  SymbolFacade,
  descriptors,
  metadataGenerateKey,
  metadataUpdateValue,
} from "symbol-sdk/symbol";
import { ITodoService } from "./todo.service";
import { Todo, TodoCreate, TodoUpdate } from "./todo.types";

export class TodoInfrastructureService implements ITodoService {
  todos: Todo[] = [];

  async create(todoCreate: TodoCreate): Promise<Todo> {
    // Note: temporally impl to check symbol sdk worked or not
    const facade = new SymbolFacade(Network.TESTNET);
    const rawPrivateKey = import.meta.env.VITE_TARGET_PRIVATE_KEY;
    const account = facade.createAccount(new PrivateKey(rawPrivateKey));
    const NODE =
      import.meta.env.VITE_NODE_URL ||
      "https://sym-test-01.opening-line.jp:3001";

    // ターゲットと作成者アドレスの設定
    const targetAddress = account.address; // メタデータ記録先アドレス
    const sourceAddress = account.address; // メタデータ作成者アドレス

    // キーと値の設定
    const key = metadataGenerateKey(`dummy-id-${Math.random()}`);
    const now = new Date();
    const newTodo: Todo = {
      ...todoCreate,
      id: `dummy-id-${Math.random()}`,
      done: false,
      createdAt: now,
      updatedAt: now,
    };
    let value = new TextEncoder().encode(JSON.stringify(newTodo));

    // 同じキーのメタデータが登録されているか確認
    const query = new URLSearchParams({
      targetAddress: targetAddress.toString(),
      sourceAddress: sourceAddress.toString(),
      scopedMetadataKey: key.toString(16).toUpperCase(),
      metadataType: "0",
    });
    const metadataInfo = await fetch(
      new URL("/metadata?" + query.toString(), NODE),
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    )
      .then((res) => res.json())
      .then((json) => {
        return json.data;
      });
    // 登録済の場合は差分データを作成する
    let sizeDelta = value.length;
    if (metadataInfo.length > 0) {
      sizeDelta -= metadataInfo[0].metadataEntry.valueSize;
      value = metadataUpdateValue(
        utils.hexToUint8(metadataInfo[0].metadataEntry.value),
        value,
      );
    }

    // アカウントメタデータ登録Tx作成
    const descriptor = new descriptors.AccountMetadataTransactionV1Descriptor( // Txタイプ:アカウントメタデータ登録Tx
      targetAddress, // ターゲットアドレス
      key, // キー
      sizeDelta, // サイズ差分
      value, // 値
    );
    const tx = facade.createEmbeddedTransactionFromTypedDescriptor(
      descriptor, // トランザクション Descriptor 設定
      account.publicKey, // 署名者公開鍵
    );

    const embeddedTransactions = [tx];

    // アグリゲートTx作成
    const aggregateDescriptor =
      new descriptors.AggregateCompleteTransactionV2Descriptor(
        facade.static.hashEmbeddedTransactions(embeddedTransactions),
        embeddedTransactions,
      );
    const aggregateTx = facade.createTransactionFromTypedDescriptor(
      aggregateDescriptor, // トランザクション Descriptor 設定
      account.publicKey, // 署名者公開鍵
      100, // 手数料乗数
      60 * 60 * 2, // Deadline:有効期限(秒単位)
      0, // 連署者数
    );

    // 署名とアナウンス
    const sig = account.signTransaction(aggregateTx);
    const jsonPayload = facade.transactionFactory.static.attachSignature(
      aggregateTx,
      sig,
    );
    await fetch(new URL("/transactions", NODE), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: jsonPayload,
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      });

    // const transaction = facade.createTransactionFromTypedDescriptor(
    //   descriptor,
    //   account.publicKey,
    //   100,
    //   2 * 3600,
    // );
    // const signature = account.signTransaction(transaction);
    // const jsonPayload = facade.transactionFactory.static.attachSignature(
    //   transaction,
    //   signature,
    // );
    // console.log({ jsonPayload });

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
