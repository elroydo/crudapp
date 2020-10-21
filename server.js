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
    const countryCollection = db.collection('countries')

    app.post('/countries', (req, res) => {
        countryCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.get('/', (req, res) => {
        db.collection('countries').find().toArray()
        .then(results => {
            console.log(results)
            res.render('index.ejs', {countries: results})
        })
        .catch(error => console.error(error))
    })

    app.put('/countries', (req, res) => {
        countryCollection.findOneAndUpdate(
            {country: 'england'
        },
            {
                $set: {
                    country: req.body.country,
                }
            },
            {upsert: false}
        )
        .then(result => {
            console.log(result)
            res.json('success')
        })
        .catch(error => console.error(error))
    })

    app.delete('/countries', (req, res) => {
        countryCollection.deleteOne({
            country: req.body.country 
        })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('no more requested data to delete')
            }
            res.json('deleted entry')
        })
        .catch(error => console.error(error))
    })
})