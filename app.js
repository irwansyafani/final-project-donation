const express = require('express')
const session = require('express-session')// sessions
const routes = require('./routes')

const app = express()
const PORT = process.env.port || config.httpPort || 5000

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended:false }))
app.use(express.static(__dirname + '/public'));
app.use(session({ 
    secret: "keyboard cat", 
    resave: false, 
    saveUninitialized: false,
    cookie: { secure: false } 
}))

app.use('/', routes)

app.listen(PORT, () => { console.log('http://localhost:3000/ connect to port:', PORT) })