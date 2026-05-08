class SetAssignment {
    // Index signature property
    [seatNumber: string]: string
}

let seats = new SetAssignment()
seats.A1 = 'Alireza' // == seats['A1'] = 'Alireza'
seats.A2 = 'Ali'