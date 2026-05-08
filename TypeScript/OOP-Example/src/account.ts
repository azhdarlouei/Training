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

    get balance(): number { // a way for show private things
        return this._balance
    }
    set balance(value: number){
        if(value < 0)
            throw new Error('Invalid value')
        this._balance = value
    }
}

let account = new Account(1, "Alireza", 0)
account.deposit(100)
console.log(account.balance)
account.balance = 100