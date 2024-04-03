const express = require('express');
const cors = require('cors')

const app = express();
// CORS (Cross-Origin Resource Sharing) used when creating API with NodeJS
app.use(cors());

const PORT = process.env.PORT || 8000;

const advices = require('./array').advices;
const data = [];

//add id for each objects
advices.forEach((item, i) => {
    data.push(Object.assign({id: i, ...item}))
})

//function to get random object
function random(arr) {
    const randomItem = Math.floor(Math.random() * arr.length);
    const item = arr[randomItem];

    return item;
}

//routing
app.get('/', (req, res) => {
    res.json('Islamic advices API');
})

app.get('/advices', (req, res) => {
    res.json(data);
})

app.get('/advice', (req, res) => {
    res.json(random(data));
})

app.get('/advice/:id', (req, res) => {
    const adviceId = parseInt(req.params.id);
    const advice = data.find(item => item.id === adviceId);

    if (advice) {
        res.json(advice);
    } else {
        res.status(404).json({ error: 'Advice not found' });
    }
})


app.listen(PORT, () => console.log(`PORT is running on ${PORT}`))