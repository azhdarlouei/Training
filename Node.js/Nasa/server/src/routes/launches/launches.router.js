const express = require("express")

const { 
    httpGetAllLunches,
    httpAddNewLaunch,
    httpAbortLaunch
} = require("./launches.controller")

const launchesRouter = express.Router()

launchesRouter.get('/launches', httpGetAllLunches)
launchesRouter.post('/launches', httpAddNewLaunch)
launchesRouter.delete('/launches/:id', httpAbortLaunch)

module.exports = launchesRouter