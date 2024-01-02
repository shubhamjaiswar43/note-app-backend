const {assert} = require("chai");
const hostname = 'http://127.0.0.1:5000/api/auth'
describe('auth api', () => {
    describe('for /createuser', () => {
        it('should return a bad request for user already exist', async () => {
            const payload = {
                name: 'Shubham',
                email: 'shubhamjaiswar08@gmail.com',
                password: 'password'
            }
            const res = await fetch(hostname + '/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const body = await res.json();
            assert.equal(res.status, 400);
            assert.equal(body[0].msg, 'User Already Exist With The Given Email,Please Login');
        })
    })

    describe('for /login', () => {
        it('should return User Not Exist,Please Signup', async () => {
            const payload = {
                email: 'notexist@gmail.com',
                password: 'password'
            }
            const res = await fetch(hostname + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const body = await res.json();
            assert.equal(res.status,400);
            assert.equal(body[0].msg, 'User Not Exist,Please Signup');
        })
        it('should return 200 status for successfully login', async () => {
            const payload = {
                email: 'shubhamjaiswar08@gmail.com',
                password: 'password'
            }
            const res = await fetch(hostname + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const body = await res.json();
            assert.equal(res.status,200);
            assert.equal(body.msg, 'Login Successfully!!!');
        })
        it('should return 400 status for wrong password', async () => {
            const payload = {
                email: 'shubhamjaiswar08@gmail.com',
                password: 'wrong password'
            }
            const res = await fetch(hostname + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const body = await res.json();
            assert.equal(res.status,400);
            assert.equal(body[0].msg, 'Please Enter a Correct Email/Password');
        })
    })

    describe('for /getuser', () => {
        it('should return unauthorized status', async () => {
            const res = await fetch(hostname + '/getuser');
            assert.equal(res.status, 401);
        });
    })
});
