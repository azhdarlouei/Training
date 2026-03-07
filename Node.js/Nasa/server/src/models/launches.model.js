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

const existsLaunchWithId = (launcheId)=>{
    return launches.has(launcheId)
}

const getAllLaunches = ()=>{
    return Array.from(launches.values())
}

const addNewLaunche = (launche) =>{
    lastLaunchNumber++ 
    launches.set(
        lastLaunchNumber, 
        Object.assign(launche, {
            success: true,
            upcoming: true,
            customers: ['Alireza', 'NASA'],
            flightNumber: lastLaunchNumber
        })
    )
}

const abortedLaunchById = (launcheId)=>{
    const aborted = launches.get(launcheId)
    aborted.success = false
    aborted.upcoming = false
    return aborted
}

module.exports = {
    launches,
    getAllLaunches,
    addNewLaunche,
    existsLaunchWithId,
    abortedLaunchById
}