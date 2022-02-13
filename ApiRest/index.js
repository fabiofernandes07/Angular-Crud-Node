//config
const express = require("express");
const  mongoose  = require("mongoose");
const cors = require('cors');
const app = express();

const elementRoutes = require('./routes/elementRoutes')

const allowedOrigins = [
    'http://localhost',
    'http://localhost:4200',
    'http://localhost:3000'
];

const corsOptions = {
    origin:(origin, callback) => {
        if( allowedOrigins.includes(origin) || !origin) {
            callback(null,true);
        } else {
            callback(new Error('origin not allowed ny CORS'))
        }
    }
}



// forma de ler JSOJN / middlewares
app.use(
    express.urlencoded({
        extended: true
    }), cors(corsOptions)
)

app.use(express.json())

// rotas da api
app.use('/element', elementRoutes)

// rota inicial / endpoint
app.get('/', (req, res) => {

    // mostrar req
    res.json({message: 'oi express!'})
})

const DB_USER = 'fabio'
const DB_PASS = encodeURIComponent('********')
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.7rljh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    )
    .then(()=> {
        console.log("Conectado com sucesso")
        app.listen(3000)
    })
    .catch((err) => console.log("erro"))
