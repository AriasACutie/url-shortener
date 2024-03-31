const express = require('express');
const cors = require('cors');
const shortid = require('shortid');
const app = express();

app.use(cors());
app.use(express.json());

let urls = {};

app.post('/shorten', (req, res) => {
    const { url } = req.body;
    const id = shortid.generate();
    urls[id] = url;
    res.send({ id });
});

app.get('/:id', (req, res) => {
    const { id } = req.params;
    const url = urls[id];
    if (url) {
        res.redirect(url);
    } else {
        res.sendStatus(404);
    }
});

module.exports = app;
