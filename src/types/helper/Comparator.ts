type Comparator<T> = (a: T, b: T) => number

export default Comparator

export const defaultComparator: Comparator<any> = (a: any, b: any) => a - b

