const launchesDatabase = require("./launches.mongo")
const planets = require("./planets.mongo")

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

const saveLaunch = async (launch) => {
    const planet = await planets.findOne({
        keplerName: launch.target
    })

    if (!planet) {
        console.log("No Matching planet found")
        ReadableStreamDefaultController
    }

    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    })
}

const existsLaunchWithId = (launcheId) => {
    return launchesDatabase.findOne({
        flightNumber: launcheId
    })
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

const abortedLaunchById = async (launcheId) => {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launcheId
    },{
        upcoming: false,
        success: false
    })

    return aborted.ok === 1 && aborted.nModified === 1
}

saveLaunch(launche)

module.exports = {
    getAllLaunches,
    existsLaunchWithId,
    abortedLaunchById,
    scheduleNewLaunch
}