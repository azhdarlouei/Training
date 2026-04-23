// variables
let sales: number = 123_456_789;   // let sales = 123_456_789   type is Number
let name: string = "Alireza";      // let name = "Alireza"      type is String
let isPublished: boolean = true;   // let isPublished = true    type is Boolean
let level;                         //                           type is 'any'

// arrays
let numbers: number[] = [1, 2, 3]  // let numbers = [1, 2, 3]   type is Number

// tuples
let user: [number, string, boolean] = [1, "ALireza", true]

// enums
enum Size { Small = 1, Medium, Large }  // const Size { Small = 1, Medium, Large }  'is better to use'
let mySize: Size = Size.Medium          // console.log(mySize) => 2

// functions
function calculateTax(income: number, taxYear = 2022): number {   // function calculateTax(income: number, taxYear?: number) {
    if (taxYear < 2022)                                           //     if ((taxYear || 2022) < 2022)
        return income * 1.2
    return income * 1.3
}                                                               /* If we dont have any type we dont need to add return in our function
...                                                                because our function type is Void                                  */

// objects --- type aliases
type Employee = {
    readonly id: number,           // it's Read Only and you cant change this
    name?: string,                 // it's Optional: if you want you can set that
    retire: (date: Date) => void
}
let employee: Employee = {
    id: 1,
    name: "Alireza",
    retire: (date: Date) => {
        console.log(date)
    }
}

// union types
function kgToLbs(weight: number | string) {  // you can use as many types
    // Narrowing
    if (typeof weight === 'number')
        return weight * 2.2
    else
        return parseInt(weight) * 2.2
}

// intersection types
type Draggable = {
    drag: () => void
}
type Resizable = {
    resize: () => void
}

type UIWidget = Draggable & Resizable  // combines multiple types into one (must satisfy all)
let textBox: UIWidget = {
    drag: () => { },
    resize: () => { }
}

// literal types
type Quantity = 50 | 100         // you only can use as 50 or 100
type Metric = 'cm' | 'inch'      // you only can use as cm or inch

// nullable types
function greet(name: string | null | undefined) {
    if (name)
        console.log(name.toUpperCase())
    else
        console.log('Hola!')
} // you can pass undifind and null to this function

// optional chaining
type Custumer = {
    birthday?: Date
}
function getCustomer(id: number): Custumer | null | undefined {
    return id === 0 ? null : { birthday: new Date() }
}

let customer = getCustomer(1)
/* optional propery access operator */
console.log(customer?.birthday?.getFullYear())     // ? = if(customer !== null && customer !== undefined)

/* optional element access operator  
   customer?.[0]                    */

/* optional call */
let log: any = null
log?.('a')

// the nullish coaelscing operator
let speed: Number | null = null
let ride = {
    // falsy = (undefined, null, '', false, 0)
    speed: speed ?? 30
}

// type assertions
let phone = <HTMLInputElement> document.getElementById('phone') // document.getElementById('phone') as HTMLInputElement