import express from "express"
import mysql from 'mysql'
import cors from 'cors'
import session from 'express-session'
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import bcrypt from 'bcryptjs'


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
    if (req.session.login) {
        return res.json({ valid: true, login: req.session.login })
    }
    else {
        return res.json({ valid: false })
    }
})

app.post('/register', (req, res) => {
    const sqlTest = "SELECT * FROM users WHERE email = ? OR login = ?"
    db.query(sqlTest, [req.body.email, req.body.login], (err, result) => {
        if (err) return res.json({ Message: "Błąd bazy danych", code: 701 })
        if (result.length == 0) {
            const sql = "INSERT INTO users (`login`, `email`, `password`, `role`) VALUES (?)"
            const values = [
                req.body.login,
                req.body.email,
                req.body.passwordHash,
                'null'
            ]

            db.query(sql, [values], (err, result) => {
                if (err) return res.json({ Message: "Błąd bazy danych", code: 701 })
                return res.json(result)
            })
        }
        else {
            return res.json({ Message: "Podany email lub nazwa użytkownika są już zajęte", code: 700 })
        }
    })
})

//code 700 - użytkownik istnieje | register
//code 701 - błąd bazy danych (przy wykonywaniu zapytania)
//code 702 - niepoprawne hasło lub email
//code 800 - OK

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ?"
    db.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ Message: "Błąd bazy danych", code: 701 })
        if (result.length > 0) {
            if(bcrypt.compareSync(`${req.body.password}`, result[0].password)){
                req.session.login = result[0].login
                return res.json({ Login: true, Message: "OK", code: 800 })
            }
            else{
                return res.json({ Login: false, Message: "Niepoprawne hasło lub email", code: 702 })
            }
        }
        else {
            return res.json({ Login: false, Message: "Niepoprawne hasło lub email", code: 702 })
        }
    })
})

app.listen(8081, () => {
    console.log("Connected.....")
})
