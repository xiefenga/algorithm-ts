import { Comparator, defaultComparator } from '../types'

function insertionSort<T>(arr: T[], comparator: Comparator<T> = defaultComparator) {
  const len = arr.length;
  let curValue: T,
    curIndex: number;
  for (let i = 1; i < len; i++) {
    curValue = arr[i];
    curIndex = i;
    for (let j = i; j > 0 && comparator(arr[j], arr[j - 1]) < 0; j--) {
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      curIndex = j - 1;
    }
    arr[curIndex] = curValue;
  }
}

export default insertionSort