const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('react-app/dist'));
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

app.get('/api/pirates/:id', (req, res) => {
    const id = req.params.id;
    const pirate = getPirate(id);
    if (!pirate) {
        res.status(404).send({ error: `Pirate ${id} not found`});
    }
    else {
        res.send({ data: pirate});
    }
})

function getPirate(id) {
    const pirates = [
    {id: 1, name: 'test name'}
    ];

    return pirates.find(p => p.id == id);
}

