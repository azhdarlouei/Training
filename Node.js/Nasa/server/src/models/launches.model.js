const launchesDatabase = require("./launches.mongo")
const planets = require("./planets.mongo")

const launches = new Map()

const DEFAULT_FLIGHT_NUMBER = 100
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

const saveLaunch = async (launch) => {
    const planet = await planets.findOne({
        keplerName: launch.target
    })

    if (!planet) {
        console.log("No Matching planet found")
        ReadableStreamDefaultController
    }

    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    })
}

const existsLaunchWithId = (launcheId) => {
    return launches.has(launcheId)
}

const getLastestFlightNumber = async () => {
    const lastestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber')

    if (!lastLaunchNumber) {
        return DEFAULT_FLIGHT_NUMBER
    }

    return lastestLaunch.flightNumber
}

const getAllLaunches = async () => {
    return await launchesDatabase.find({}, { '_id': 0, '__v': 0 })
}

const scheduleNewLaunch = async (launch) => {
    const newFlightNumber = await getLastestFlightNumber() + 1

    const newLaunch = Object.assign(launch,{
        success: true,
        upcoming: true,
        customers: ['Alireza', 'NASA'],
        flightNumber: Number(newFlightNumber)
    })

    await saveLaunch(newLaunch)
}

const abortedLaunchById = (launcheId) => {
    const aborted = launches.get(launcheId)
    aborted.success = false
    aborted.upcoming = false
    return aborted
}

saveLaunch(launche)

module.exports = {
    launches,
    getAllLaunches,
    existsLaunchWithId,
    abortedLaunchById,
    scheduleNewLaunch
}