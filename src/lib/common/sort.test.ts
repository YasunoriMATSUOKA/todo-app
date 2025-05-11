import { sortObjectArray } from "./sort";

describe("sortObjectArray", () => {
  it("should sort array of objects by number property in ascending order", () => {
    const array = [{ id: 3 }, { id: 1 }, { id: 2 }];
    const sortedArray = sortObjectArray(array, "id", "asc");
    expect(sortedArray).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it("should sort array of objects by number property in descending order", () => {
    const array = [{ id: 3 }, { id: 1 }, { id: 2 }];
    const sortedArray = sortObjectArray(array, "id", "desc");
    expect(sortedArray).toEqual([{ id: 3 }, { id: 2 }, { id: 1 }]);
  });

  it("should sort array of objects by string property in ascending order", () => {
    const array = [{ name: "Charlie" }, { name: "Alice" }, { name: "Bob" }];
    const sortedArray = sortObjectArray(array, "name", "asc");
    expect(sortedArray).toEqual([
      { name: "Alice" },
      { name: "Bob" },
      { name: "Charlie" },
    ]);
  });

  it("should sort array of objects by string property in descending order", () => {
    const array = [{ name: "Charlie" }, { name: "Alice" }, { name: "Bob" }];
    const sortedArray = sortObjectArray(array, "name", "desc");
    expect(sortedArray).toEqual([
      { name: "Charlie" },
      { name: "Bob" },
      { name: "Alice" },
    ]);
  });

  it("should sort array of objects by date property in ascending order", () => {
    const array = [
      { date: new Date("2023-01-03") },
      { date: new Date("2023-01-01") },
      { date: new Date("2023-01-02") },
    ];
    const sortedArray = sortObjectArray(array, "date", "asc");
    expect(sortedArray).toEqual([
      { date: new Date("2023-01-01") },
      { date: new Date("2023-01-02") },
      { date: new Date("2023-01-03") },
    ]);
  });

  it("should sort array of objects by date property in descending order", () => {
    const array = [
      { date: new Date("2023-01-03") },
      { date: new Date("2023-01-01") },
      { date: new Date("2023-01-02") },
    ];
    const sortedArray = sortObjectArray(array, "date", "desc");
    expect(sortedArray).toEqual([
      { date: new Date("2023-01-03") },
      { date: new Date("2023-01-02") },
      { date: new Date("2023-01-01") },
    ]);
  });
});
