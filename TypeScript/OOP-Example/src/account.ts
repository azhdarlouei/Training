class Account {
    // readonly id: number // it's can't change out of class
    // owner: string
    // private _balance: number // you can't see or change that out of class
    nickName?: string   // it's optional

    constructor(
        public readonly id: number,
        public owner: string,
        private _balance: number) { }

    deposit(amount: number): void {
        if (amount <= 0)
            throw new Error('Invalid amount')
        this._balance += amount
    }

    getBalance(): number { // a way for show private things
        return this._balance
    }
}

let account = new Account(1, "Alireza", 0)
account.deposit(100)
console.log(account.getBalance)