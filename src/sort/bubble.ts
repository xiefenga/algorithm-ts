import Comparator, { defaultComparator } from '@/types/helper/Comparator'

function bubbleSort<T>(arr: T[], comparator: Comparator<T> = defaultComparator) {
  const len = arr.length
  let lastExchangeIndex = 0,
    sortedBorder = len - 1
  for (let i = 0; i < len - 1; i++) {
    lastExchangeIndex = 0
    for (let j = 0; j < sortedBorder; j++) {
      if (comparator(arr[j], arr[j + 1]) > 0) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        lastExchangeIndex = j
      }
    }
    if (lastExchangeIndex === 0) { break }
    sortedBorder = lastExchangeIndex
  }
}

export default bubbleSort