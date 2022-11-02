const request = require('supertest')
const { connect } = require('./database')
const UserModel = require('../model/userModel')
const app = require('../index');

describe('Auth: Signup', () => {
    let conn;

    beforeAll(async () => {
        conn = await connect()
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should signup a user', async () => {
        const response = await request(app).post('/signup')
            .set('content-type', 'application/json')
            .send({
                first_name: 'tobie',
                last_name: 'Augustina',
                email: 'tobi@mail.com',
                password: 'Password123'
            })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('first_name', 'tobie')
        expect(response.body.user).toHaveProperty('last_name', 'Augustina')
        expect(response.body.user).toHaveProperty('email', 'tobi@mail.com')
    })


    it('should login a user', async () => {
        // create user in out db
        const user = await UserModel.create({ email: 'tobi@mail.com', password: '123456' });

        // login user
        const response = await request(app)
            .post('/login')
            .set('content-type', 'application/json')
            .send({
                email: 'tobi@mail.com',
                password: '123456'
            });


        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')
    })
})