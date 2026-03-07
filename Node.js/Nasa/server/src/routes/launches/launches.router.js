const express = require("express")

const { httpGetAllLunches,
    httpAddNewLaunch
} = require("./launches.controller")

const launchesRouter = express.Router()

launchesRouter.get('/launches', httpGetAllLunches)
launchesRouter.post('/launches', httpAddNewLaunch)

module.exports = launchesRouter