import { Comparator, defaultComparator } from '../types'

function shellSort<T>(arr: T[], comparator: Comparator<T> = defaultComparator) {
  const len = arr.length;
  let h = 1;
  // 采用 1/2（3^k - 1) 序列
  while (h < Math.floor(len / 3)) {
    h = h * 3 + 1;
  }
  while (h >= 1) {
    for (let i = h; i < len; i++) {
      for (let j = i; j >= h && comparator(arr[j], arr[j - h]) < 0; j -= h) {
        [arr[j], arr[j - h]] = [arr[j - h], arr[j]];
      }
    }
    h = Math.floor(h / 3);
  }
}

export default shellSort
