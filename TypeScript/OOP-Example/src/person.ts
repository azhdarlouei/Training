class Person {
    constructor(public firstName: string, public lastName: string) { }

    get fullName() {
        return this.firstName + ' ' + this.lastName
    }

    protected walk() {    // if add protected you can call this in the childs but if add private you can't
        console.log('Walking')
    }
}

class Student extends Person {
    constructor(public studentId: number, firstName: string, lastName: string) {
        super(firstName, lastName)
    }

    takeTest(){
        this.walk()
        console.log('Taking a test')
    }
}

class Teacher extends Person {
    override get fullName() {
        return 'Professor ' + super.fullName
    }
}

const printNames = (people: Person[])=>{
    for (const person of people) {
        console.log(person.fullName)
    }
}

printNames([
    new Student(123,"Alireza","Azhdarlouei"),
    new Teacher("Ali","Teacher")
])