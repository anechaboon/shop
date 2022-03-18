const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shop",
})

app.get('/products', (req, res) => {
    db.query("SELECT * FROM product", (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running oon port ${port}`)
})