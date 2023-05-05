import express from 'express';

const app = express();

app.get('/', async (_req, res) => {
    res.send("<h1>I'm alive!</h1>")
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});