const express = require('express')
const db = require('./database/db')
const port = process.env.PORT || 8080
const app = express();
const routes = require('./routes/index');
const session = require('express-session')

db.hasConection()
app.set('view engine', 'ejs')

app.use(session({
    secret: "keyblognode", cookie:{ maxAge: 1800000},
    resave: true,
    saveUninitialized: true
}))

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}));

app.use(express.json())
app.use(routes);

app.listen(port, () => {
    console.log(` O Servidor está rodando na porta: ${port}!`)
})