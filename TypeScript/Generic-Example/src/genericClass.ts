class KeyValauePair<K,V> {
    constructor(public key: K, public V: string) { }
}

let pair = new KeyValauePair(1,"ali") // or new KeyValauePair<number, string>(1,"ali")