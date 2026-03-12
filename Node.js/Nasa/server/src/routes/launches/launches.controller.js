const { launches, addNewLaunche, existsLaunchWithId, abortedLaunchById, getAllLaunches, scheduleNewLaunch } = require("../../models/launches.model")

const httpGetAllLaunches = async (req, res) => {
    return res.status(200).json(await getAllLaunches())
}

const httpAddNewLaunch = async (req, res) => {
    const launch = req.body

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing require launch property'
        })
    }

    launch.launchDate = new Date(launch.launchDate)
    if (launch.launchDate.toString() === 'Invalid Date') {
        return res.status(400).json({
            error: 'Invalid launch date'
        })
    }

    await scheduleNewLaunch(launch)
    return res.status(201).json(launch)
}

const httpAbortLaunch = async (req, res) => {
    const launchId = Number(req.params.id)

    const existsLaunch = await existsLaunchWithId(launchId)
    if(!existsLaunch){
        return res.status(404).json({
            error: 'Launch not found'
        })
    }

    const aborted = await abortedLaunchById(launchId)
    if(!aborted){
        return res.status(400).json({
            error: 'Launch not aborted'
        })
    }

    return res.status(200).json({
        ok: true
    })
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}