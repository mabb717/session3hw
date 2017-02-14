const express = require('express') 
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

// require the npm library
const app = express() 
// create a var for the app to be built using express
// app is the global variable namespace for the program we are building
const port = 9000

app.use(bodyParser.urlencoded({extended: true}))
// app.use(express.static('public'))

app.set('view engine', 'ejs')



MongoClient.connect('mongodb://mtabb:password@ds163698.mlab.com:63698/session3hw', (err, database) => {
	   if (err) return console.log(err)
    db = database
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
  })
})


// app.listen(port, function () {
//   console.log(`Listening on port ${port}!`)
// })

app.get('/', (req, res) => {
  db.collection('entries').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {entries: result})
  })
})


// app.get('/', (req, res) => {
//   db.collection('entries').find().toArray((err, results) => {
//     console.log(results)
//     res.sendFile(__dirname + '/index.html')
//   })
// })

// app.post('/entries', (req, res) => {
//   console.log(req.body)
// })

// app.get('/', (req, res) => {
//   // console.log(__dirname)
//   res.sendFile(__dirname + '/index.html')
// })

// app.post('/entries', (req, res) => {
//   console.log('Hello')
// })

// app.get('/', (req, res) => res.send('Hello World!')) // our first route

app.post('/entries', (req, res) => {
  db.collection('entries').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


app.get('/entry/:name?/:link?', function(req, res){
  let name = req.params.name
  let hashlink = `#${req.params.link}`
  res.send(`
    <h1>${name}</h1>
    <p>Commentary on ${name} will go here.</p>
    <p>${hashlink}
    `)
})



app.get('*', function(req, res){
  res.send(`
    <h1>Page not found</h1>
    `)
})