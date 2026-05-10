function echo<T extends number | string>(value: T): T {
    return value
}

echo(123)