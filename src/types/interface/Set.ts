export default interface Set<T> {
	size(): number
	add(value: T): void
	clear(): void
	delete(value: T): void
	has(value: T): boolean
}

