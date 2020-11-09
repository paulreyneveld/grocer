const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose');

const url = `mongodb+srv://dbUser:efg293@cluster0.wszyx.mongodb.net/items?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => console.log('Connected to DB'))
    .catch(error => console.log('Failed to connect', error.message))

const itemSchema = new mongoose.Schema({
    item: String
})

itemSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Item = mongoose.model("Item", itemSchema)

app.use(express.static('build'))

app.use(express.json())
app.use(cors())
app.get('/api', async (req, res) => {
    const results = await Item.find({})
    console.log(results)
    res.json(results)
})

app.post('/api', async (req, res) => {
    const body = req.body
    const item = new Item ({
        item: body.item
    })
    const someData = await item.save()
    res.json(someData)
})

app.delete('/api/:id', async (req, res) => {
    const target = req.params.id
    console.log(target)
    console.log(typeof target)
    await Item.findByIdAndRemove(target)
    res.status(204).end()
})

app.listen(3001, () => {
    console.log("App listening on port 3001")
})
