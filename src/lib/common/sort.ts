export type SortDirection = "asc" | "desc";

/**
 * オブジェクトの配列を指定したプロパティでソートする関数
 * @param array ソート対象の配列
 * @param key ソートするプロパティ名
 * @param direction ソート方向 ("asc" | "desc")
 * @returns ソートされた新しい配列
 */
export function sortObjectArray<T>(
  array: T[],
  key: keyof T,
  direction: SortDirection = "asc",
): T[] {
  return [...array].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    let comparison: number;

    if (aValue instanceof Date && bValue instanceof Date) {
      comparison = aValue.getTime() - bValue.getTime();
    } else if (typeof aValue === "string" && typeof bValue === "string") {
      comparison = aValue.localeCompare(bValue);
    } else {
      comparison = (aValue as number) - (bValue as number);
    }

    return direction === "asc" ? comparison : -comparison;
  });
}
