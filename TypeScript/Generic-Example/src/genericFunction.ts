function wrapInArray<T>(value: T) {
    return [value]
}
let numbers = wrapInArray(1)

// in classes
class ArrayUtils {
    static wrapArray<T>(value: T) {
        return [value]
    }
}
numbers = ArrayUtils.wrapArray(1)