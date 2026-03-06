const fs = require("fs")
const path = require("path")
const parse = require("csv-parse")

const habitablePlanet = []

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
            .on("data", (data) => {
                if (isHabitablePlanet(data)) {
                    habitablePlanet.push(data)
                }
            })
            .on("error", (error) => {
                console.log(error)
                reject(error)
            })
            .on("end", () => {
                console.log(`${habitablePlanet.length} habitable planets found`)
                resolve()
            })
    })
}

module.exports = {
    loadPlanetsData,
    planets: habitablePlanet
}