console.log('server is live')

const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;
var connectionString = 'mongodb+srv://admin:root@cluster0.ew0w5.mongodb.net/test?retryWrites=true&w=majority';

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.listen(3000, function(){
    console.log('listening on 3000')
})

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
}) 
.then(client => {
    console.log('Connected to Database')
    const db = client.db('test')
    const nameCollection = db.collection('names')

    app.post('/name', (req, res) => {
        nameCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.get('/', (req, res) => {
        db.collection('names').find().toArray()
        .then(results => {
            console.log(results)
            res.render('index.ejs', {names: results})
        })
        .catch(error => console.error(error))
    })

    app.put('/name', (req, res) => {
        nameCollection.findOneAndUpdate(
            {forename: 'bo',
            surname: 'burnham'
        },
            {
                $set: {
                    forename: req.body.forename,
                    surname: req.body.surname
                }
            },
            {upsert: false}
        )
        .then(result => {
            console.log(result)
            res.json('Success')
        })
        .catch(error => console.error(error))
    })
})




