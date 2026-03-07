const launches = new Map()

let lastLaunchNumber = 100

const launche = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explore IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['Alireza', 'NASA'],
    upcoming: true,
    success: true,
}

launches.set(launche.flightNumber, launche)

const getAllLaunches = ()=>{
    return Array.from(launches.values())
}

const addNewLaunche = (launche) =>{
    lastLaunchNumber++ 
    launches.set(
        lastLaunchNumber, 
        Object.assign(launche, {
            success: true,
            upcomingL: true,
            customers: ['Alireza', 'NASA'],
            flightNumber: lastLaunchNumber
        })
    )
}

module.exports = {
    launches,
    getAllLaunches,
    addNewLaunche
}