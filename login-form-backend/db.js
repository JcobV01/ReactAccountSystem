import  express  from "express"
import mysql from 'mysql'
import cors from 'cors'


const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "loginformdb",
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
