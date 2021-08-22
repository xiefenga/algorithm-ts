import { bigInt2Int, double2Int } from '@/util/number'

let key = 0

export const INTENAL_ID = Symbol('INTENAL_ID')

export function hashCode<T>(val: T): number {
  if (typeof val === 'number') {
    return numberHash(val)
  } else if (typeof val === 'bigint') {
    return bigintHash(val)
  } else if (typeof val === 'string') {
    return stringHash(val)
  } else if (typeof val === 'symbol') {
    return symbolHash(val)
  } else if (val && typeof val === 'object') {
    return objectHash(val)
  }
  return stringHash(String(val))
}

const objectHash = (obj: Object): number => {
  const id = Reflect.get(obj, INTENAL_ID)
  if (id === undefined) {
    Reflect.set(obj, INTENAL_ID, ++key)
  }
  const res = { ...obj, '__INTENAL_ID__': key }
  return stringHash(JSON.stringify(res))
}

const stringHash = (str: string): number => {
  let h = 0
  const len = str.length
  for (let i = 0; i < len; i++) {
    h = 31 * h + str.charCodeAt(i)
  }
  return h
}

const numberHash = (num: number): number => {
  return double2Int(num.valueOf())
}

const bigintHash = (num: bigint): number => {
  return bigInt2Int(num.valueOf())
}

const symbolHash = (sym: symbol): number => {
  return stringHash(
    JSON.stringify(
      {
        type: 'symbol',
        value: `Symbol(${sym.description})`,
        description: sym.description,
        __INTENAL_ID__: ++key
      }
    )
  )
}