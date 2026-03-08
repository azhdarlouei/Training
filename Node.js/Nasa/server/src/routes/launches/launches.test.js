const request = require("supertest")
const app = require("../../app")

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200)
    })
})

describe('Test POST /launch', () => {
    const complateLaunchData = {
        mission: 'Alireza',
        rocket: 'NCC 1701-D',
        target: 'kepler-186 f',
        launchDate: 'january 4, 2028'
    }

    const launchDataWithoutDate = {
        mission: 'Alireza',
        rocket: 'NCC 1701-D',
        target: 'kepler-186 f',
    }

    const launchDataWithInvalidData = {
        mission: 'Alireza',
        rocket: 'NCC 1701-D',
        target: 'kepler-186 f',
        launchDate: "test"
    }


    test('It should respond with 201 success', async () => {
        const response = await request(app)
            .post('/launches')
            .send(complateLaunchData)
            .expect('Content-Type', /json/)
            .expect(201)

        const requestDate = new Date(complateLaunchData.launchDate).valueOf()
        const responseDate = new Date(response.body.launchDate).valueOf()
        expect(responseDate).toBe(requestDate)

        expect(response.body).toMatchObject(launchDataWithoutDate)
    })

    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400)

        expect(response.body).toStrictEqual({
            error: 'Missing require launch property'
        })
    })
    test('It should catch invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidData)
            .expect('Content-Type', /json/)
            .expect(400)

        expect(response.body).toStrictEqual({
            error: 'Invalid launch date'
        })
    })

})