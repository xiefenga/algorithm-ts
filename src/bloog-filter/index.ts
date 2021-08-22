import { hashCode } from '@/hash/hashCode'

const ln2 = Math.log(2)

class BloomFilter<T> {
  private bits: Int32Array

  private bitSize: number

  private hashNum: number

  public constructor(n: number, p: number) {
    if (!Number.isInteger(n) || n <= 0) {
      throw new TypeError('n must be a positive integer')
    }
    if (p <= 0 || p >= 1) {
      throw new RangeError('n must in (0, 1)')
    }

    this.bitSize = -1 * parseInt(String((n * Math.log(p)) / (ln2 ** 2)))

    this.hashNum = parseInt(String(this.bitSize * ln2 / n))

    this.bits = new Int32Array(Number((BigInt(this.bitSize) + 31n) / 32n))
  }

  public put(val: T): boolean {
    const hash1 = hashCode(val)
    const hash2 = hash1 >>> 16
    let result = false
    for (let i = 1; i <= this.hashNum; i++) {
      let combinedHash = hash1 + (i * hash2)
      if (combinedHash < 0) {
        combinedHash = ~combinedHash
      }
      // combinedHash % this.bitSize =>  bit位
      if (this.set(combinedHash % this.bitSize)) {
        result = true
      }
    }
    return result
  }

  public contains(val: T): boolean {
    const hash1 = hashCode(val)
    const hash2 = hash1 >>> 16
    let result = true
    for (let i = 1; i <= this.hashNum; i++) {
      let combinedHash = hash1 + (i * hash2)
      if (combinedHash < 0) {
        combinedHash = ~combinedHash
      }
      // combinedHash % this.bitSize =>  bit位
      if (!this.get(combinedHash % this.bitSize)) {
        result = false
        break
      }
    }
    return result
  }

  //    1010111
  //  | 0001000
  // ------------
  //    1010111
  //  & 0001000
  // -------------

  private set(index: number): boolean {
    const i = Math.floor(index / 32)
    const byteValue = this.bits[i]
    const bitValue = 1 << (index % 32)
    // 将这一位设为 1
    this.bits[i] = byteValue | bitValue
    // 原来的这一位是否为 0
    return (byteValue & bitValue) == 0
  }

  private get(index: number): boolean {
    const i = Math.floor(index / 32)
    const value = this.bits[i]
    return (value & (1 << (index % 32))) != 0
  }
}

export default BloomFilter
