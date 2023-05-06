import express from 'express';

const app = express();



function generateMap(size: number): number[][] {
    let new_array: number[][] = []
    for (let row = 0; row < size; row++){
        new_array.push([])
        for (let col = 0; col < size; col++) {
            new_array[row].push(Math.floor(Math.random() * 4))
        }
    }
    new_array[0][Math.random() * size] = 5
    new_array[new_array.length - 1][Math.random() * size] = 6
    return new_array
}

app.get('/', async (_req, res) => {
    res.send("<h1>I'm alive!</h1>")
});

app.get('/generate-map/:size', (req, res) => {
    try {
        const size: number = Number.parseInt(req.params.size)
        if (size < 5) {
            res.status(401).json({ error: "not a number 5 or greater."})
        }
        res.json({map: generateMap(size), error: ''});
    } catch {
        res.status(401).json({ error: "not a number 5 or greater."})
    }
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});