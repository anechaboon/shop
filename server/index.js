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

//add a new book
app.post('/product', (req, res) => {
    let name = req.body.product_name;
    let desc = req.body.product_desc;
    let price = req.body.product_price;
    let unit = req.body.product_unit;

    //validate
    if(!name || !price || !unit){
        return res.status(400).send({ error: true, message: "please provide product name, price and unit"});
    }else{
        db.query("INSERT INTO product (product_name, product_desc, product_price, product_unit) VALUES(?, ?, ?, ?) ", [name, desc, price, unit], (error, results, fields) => {
            if (error) throw error;
            let message = ""
            return res.send({ error: false, data: results, message: "add new Product succesfully"});

        });
    }
});


const port = 3001;
app.listen(port, () => {
    console.log(`Server is running oon port ${port}`)
})