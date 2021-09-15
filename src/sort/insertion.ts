import Comparator from '@/types/helper/Comparator'

function insertionSort<T>(arr: T[], comparator: Comparator<T>) {
  const len = arr.length
  let curValue: T, curIndex: number
  for (let i = 1; i < len; i++) {
    curValue = arr[i]
    curIndex = i
    while (curIndex > 0 && comparator(curValue, arr[curIndex - 1]) < 0) {
      arr[curIndex] = arr[curIndex - 1]
      curIndex--
    }
    arr[curIndex] = curValue
  }
}

export default insertionSort