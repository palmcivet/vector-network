/**
 * @description fromIndices 与 toIndices 合并后，获取合并后 fromIndices 新的索引
 * @param indices 所有索引
 * @param fromIndices 源索引
 * @param toIndics 目标索引
 */
export function calculateActiveIndices(
  indices: Array<number>,
  fromIndices: Array<number>,
  toIndics: Array<number>
): Array<number> {
  const indicesMap = new Map<number, 'KEEP' | 'FROM' | 'TO'>();

  // 构建索引映射
  indices.forEach((index) => indicesMap.set(index, 'KEEP'));

  // 标记 from 索引
  fromIndices.forEach((index) => indicesMap.set(index, 'FROM'));

  // 标记 to 索引
  toIndics.forEach((index) => indicesMap.set(index, 'TO'));

  // 移除 from 索引
  fromIndices.forEach((index) => indicesMap.delete(index));

  // 重建 from 索引
  const newFromIndices: Array<number> = [];
  Array.from(indicesMap.entries()).forEach(([_, status], newIndex) => {
    if (status === 'TO') {
      newFromIndices.push(newIndex);
    }
  });

  return newFromIndices;
}
