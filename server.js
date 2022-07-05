const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

//environmental vars
const mongoPW = process.env.MONGOPASSWORD;

let connectionString = `mongodb+srv://thefool:${mongoPW}@the-fool.hed1ifr.mongodb.net/?retryWrites=true&w=majority`
MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('connected to db');
        const db = client.db('tarot-cards');
        const cards = db.collection('cards');

        app.get('/', function (req, res) {
            res.sendFile(__dirname + '/index.html');
        })
        app.get('/add-cards', function (req, res) {
            db.collection('cards').find().toArray()
            .then(results => {
                res.render('add-cards.ejs', {cards: results})
            })
            .catch(error => console.error(error))
        })

        app.post('/add-cards', (req, res) => {
            cards.insertOne(req.body)
                .then(result => {
                    res.redirect('/add-cards')
                })
                .catch(error => console.error(error));
        })
        
        app.put('/add-cards', (req, res) => {
            console.log(req.body)
        })
        
        app.listen(PORT, function () {
            console.log(`listening on ${PORT}`);
        })
    })
    .catch(error => console.error(error));