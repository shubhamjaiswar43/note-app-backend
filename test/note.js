const { assert } = require("chai");
const hostname = 'http://127.0.0.1:5000/api/note'
let note;
//authtoken for testing
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTNkNTljNzI5YzcwYWQyMWY5M2IwZCIsImlhdCI6MTcwNDIwMzc4M30.0QB8jm9pHbP1NaE0ZQXsqQdHZ-e2abjtWlowI917cbo'
describe('note api', () => {
    describe('for /addnote', () => {
        it('should return a bad request for unauthorized', async () => {
            const payload = {
                title: 'title',
                content: 'content',
                tag: 'tag'
            }
            const res = await fetch(hostname + '/addnote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            assert.equal(res.status, 401);
        })
        it('should return error(bad req) for not providing expected payload(validation error)', async () => {
            const payload = {
                title: 't',
                content: 'conten',
                tag: 'tag'
            }
            const res = await fetch(hostname + '/addnote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                },
                body: JSON.stringify(payload)
            });
            const body = await res.json();
            assert.equal(res.status, 400);
            assert.typeOf(body.Error, 'Array');
        })
        it('should add a note for the user', async () => {
            const payload = {
                title: 'title',
                content: 'conten',
                tag: 'tag'
            }
            const res = await fetch(hostname + '/addnote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                },
                body: JSON.stringify(payload)
            });
            const body = await res.json();
            assert.equal(res.status, 200);
            assert.isUndefined(body.Error);
        })
    })


    describe('for /getnotes', () => {
        it('should return all notes', async () => {
            const res = await fetch(hostname + '/getnotes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                },
            });
            const body = await res.json();
            note = body[0];
            assert.equal(res.status, 200);
            assert.isUndefined(body.Error);
        })
    })

    describe('for /updatenote', () => {
        it('should return 200 for updation of note', async () => {
            const res = await fetch(hostname + `/updatenote/${note._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                },
                body: JSON.stringify({ 'title': 'newTitle' })
            });
            assert.equal(res.status, 200);
        })
        it('should return 404 note not exist', async () => {
            const res = await fetch(hostname + `/updatenote/659417930d70267fbb4060b3`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                },
                body: JSON.stringify({ 'title': 'newTitle' })
            });
            assert.equal(res.status, 404);
        })
    })
    
    describe('for /deletenote', () => {
        it('should return 200 for success of deletion of note', async () => {
            const res = await fetch(hostname + `/deletenote/${note._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                },
                body: JSON.stringify({ 'title': 'newTitle' })
            });
            assert.equal(res.status, 200);
        });
    })

});

