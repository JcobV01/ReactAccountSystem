import  express  from "express"
import mysql from 'mysql'
import cors from 'cors'
import session from 'express-session'
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"


const app = express()
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
}))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "loginformdb",
})

app.get('/', (req, res) => {
    if(req.session.login){
        return res.json({valid: true, login: req.session.login})
    }
    else {
        return res.json({valid: false})
    }
})

app.post('/register', (req, res) => {
    const sql = "INSERT INTO users (`login`, `email`, `password`, `role`) VALUES (?)"
    const values = [
        req.body.login,
        req.body.email,
        req.body.password,
        'null'
    ]

    db.query(sql, [values], (err, result) => {
        if(err) return res.json({Message: err})
        return res.json(result)
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? and password = ?"
    db.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({Message: "Error"})
        if(result.length > 0){
            req.session.login = result[0].login
            return res.json({Login: true})
        }
        else{
            return res.json({Login: false})
        }
    })
})

app.listen(8081, ()=>{
    console.log("Connected.....")
})
