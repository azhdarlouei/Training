const fs = require("fs")
const path = require("path")
const parse = require("csv-parse")

const planets = require('./planets.mongo')


const isHabitablePlanet = (planet) => {
    return planet['koi_disposition'] == 'CONFIRMED'
        && planet['koi_prad'] < 1.6
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
}

const loadPlanetsData = () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, "..", "..", "data", "kepler_data.csv"))
            .pipe(parse.parse({
                comment: "#",
                columns: true
            }))
            .on("data", async (data) => {
                if (isHabitablePlanet(data)) {
                    savePlanets(data)
                }
            })
            .on("error", (error) => {
                console.log(error)
                reject(error)
            })
            .on("end", async () => {
                const countPlanetsFound = (await getAllPlanets()).length
                console.log(`${countPlanetsFound} habitable planets found`)
                resolve()
            })
    })
}

const getAllPlanets = async ()=>{
    return await planets.find({})
}

const savePlanets = async (planet) => {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name
        }, {
            keplerName: planet.kepler_name
        }, {
            upsert: true
        })
    } catch (err) {
        console.error(`Could not save planet ${err}`)
    }
}

module.exports = {
    loadPlanetsData,
    // planets: habitablePlanet
}