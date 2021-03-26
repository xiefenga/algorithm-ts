
type Comparator<T> = (a: T, b: T) => number

const defaultComparator: Comparator<any> = (a: any, b: any) => a - b


export { defaultComparator, Comparator }