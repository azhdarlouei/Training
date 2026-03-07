const {launches, addNewLaunche} = require("../../models/launches.model")

const httpGetAllLunches = (req, res)=>{
    return res.status(200).json(Array.from(launches.values()))
}

const httpAddNewLaunch = (req, res) => {
    const launch = req.body

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error: 'Missing require launch property'
        })
    }

    launch.launchDate = new Date(launch.launchDate)
    if(launch.launchDate.toString() === 'Invalid Date'){
        return res.status(400).json({
            error: 'Invalid launch date'
        })
    }

    addNewLaunche(launch)
    return res.status(201).json(launch)
}

module.exports = {
    httpGetAllLunches,
    httpAddNewLaunch
}