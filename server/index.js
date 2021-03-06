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

///////// Product /////////
    // get all product
    app.get('/products', (req, res) => {
        db.query("SELECT p.*, pc.cate_name FROM product p JOIN product_category pc on p.category_id = pc.id", (err, result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    })

    // get product by id
    app.get('/product', (req, res) => {
        let id = req.query.id;
        db.query(`SELECT p.*, pc.cate_name FROM product p JOIN product_category pc on p.category_id = pc.id WHERE p.id = ${id}`, (err, result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    })

    //add a new product
    app.post('/product', (req, res) => {
        let name = req.body.product_name;
        let desc = req.body.product_desc;
        let price = req.body.product_price;
        let unit = req.body.product_unit;
        let category_id = req.body.category_id;
        let cate_name = '';
        //validate
        if(!name || !price || !unit){
            return res.status(400).send({ error: true, message: "please provide product name, price and unit"});
        }else{
            db.query(`SELECT cate_name FROM product_category WHERE id = ${category_id}`, (err, result) => {
                if(err){
                    console.log(err)
                }else{
                    if(result[0]){
                        cate_name = result[0].cate_name
                    }
                }
            })

            db.query("INSERT INTO product (product_name, product_desc, product_price, product_unit, category_id) VALUES(?, ?, ?, ?, ?) ", [name, desc, price, unit, category_id], (error, results, fields) => {
                if (error) throw error;
                let message = ""
                return res.send({ error: false, data: results, message: "add new Product succesfully", cate_name:cate_name});
            });
        }
    });

    //update product with id
    app.put('/product', (req, res) => {
        let id = req.body.id;
        let name = req.body.product_name;
        let desc = req.body.product_desc;
        let price = req.body.product_price;
        let unit = req.body.product_unit;
        let category_id = req.body.category_id;
        let cate_name = '';
        
        if(!name || !price || !unit){
            return res.status(400).send({ error: true, message: "please provide product name, price and unit"});
        }else{
            db.query(`SELECT cate_name FROM product_category WHERE id = ${category_id}`, (err, result) => {
                if(err){
                    console.log(err)
                }else{
                    if(result[0]){
                        cate_name = result[0].cate_name
                    }
                }
            })

            db.query("UPDATE product SET product_name = ?, product_desc = ?, product_price = ?, product_unit = ?, category_id = ? WHERE id = ?", [name, desc, price, unit, category_id, id],  (error, results, fields) => {
                if (error) throw error;
                let message = ""
                if(results.changedRows == 0){
                    message = "product not found or data same "
                }else{
                    message = "Succesfully updated product"
                }
                return res.send({ error: false, data: results, message: message, cate_name:cate_name});
            });
        }
    });

    //delete product by id
    app.delete('/product', (req, res) => {
        let id = req.query.id;
        if(!id){
            return res.status(400).send({ error: true, message: "please provide product id"});
        }else{
            db.query("DELETE FROM product WHERE id = ?", id,  (error, results, fields) => {
                if (error) throw error;
                let message = ""
                if(results.affectedRows === 0){
                    message = "product not found"
                }else{
                    message = "Succesfully deleted product"
                }
                return res.send({ error: false, data: results, message: message});
            });
        }
    });
///////// End Product /////////


///////// Shop /////////
    // get all shop
    app.get('/shops', (req, res) => {
        db.query("SELECT * FROM shop", (err, result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    })

    // get shop by id
    app.get('/shop', (req, res) => {
        let id = req.query.id;
        db.query(`SELECT * FROM shop WHERE id = ${id}`, (err, result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    })

    //add a new shop
    app.post('/shop', (req, res) => {
        let name = req.body.shop_name;
        let desc = req.body.shop_desc;
        let tel = req.body.shop_tel;
        let address = req.body.shop_address;

        //validate
        if(!name || !address ){
            return res.status(400).send({ error: true, message: "please provide shop name and address"});
        }else{
            db.query("INSERT INTO shop (shop_name, shop_desc, shop_tel, shop_address) VALUES(?, ?, ?, ?) ", [name, desc, tel, address], (error, results, fields) => {
                if (error) throw error;
                let message = ""
                return res.send({ error: false, data: results, message: "add new Product succesfully"});

            });
        }
    });

    //update shop with id
    app.put('/shop', (req, res) => {
        let id = req.body.id;
        let name = req.body.shop_name;
        let desc = req.body.shop_desc;
        let tel = req.body.shop_tel;
        let address = req.body.shop_address;

        if(!name || !tel || !address){
            return res.status(400).send({ error: true, message: "please provide shop name, tel and address"});
        }else{
            db.query("UPDATE shop SET shop_name = ?, shop_desc = ?, shop_tel = ?, shop_address = ? WHERE id = ?", [name, desc, tel, address, id],  (error, results, fields) => {
                if (error) throw error;
                let message = ""
                if(results.changedRows == 0){
                    message = "shop not found or data same "
                }else{
                    message = "Succesfully updated shop"
                }
                return res.send({ error: false, data: results, message: message});
            });
        }
    });

    //delete shop by id
    app.delete('/shop', (req, res) => {
        let id = req.query.id;
        if(!id){
            return res.status(400).send({ error: true, message: "please provide shop id"});
        }else{
            db.query("DELETE FROM shop WHERE id = ?", id,  (error, results, fields) => {
                if (error) throw error;
                let message = ""
                if(results.affectedRows === 0){
                    message = "shop not found"
                }else{
                    message = "Succesfully deleted shop"
                }
                return res.send({ error: false, data: results, message: message});
            });
        }
    });

///////// End Shop /////////

///////// Shop Product /////////
    // get all shop_product
    app.get('/shopProducts', (req, res) => {
        let id = req.query.shopId;
        const query = `SELECT sp.shop_id as spId,
                        p.*, 
                        pc.cate_name,
                        sp.deleted_at,
                        sp.qty
                        FROM product p 
                        JOIN product_category pc on p.category_id = pc.id
                        LEFT JOIN shop_product sp on p.id = sp.product_id
                        ORDER BY p.id ASC, sp.id DESC`;
        db.query(query, (err, result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    })

    // check in shop product exist
    app.get('/shopProduct', (req, res) => {
        let product_id = req.query.product_id;
        let shop_id = req.query.shop_id;
        let qty = req.query.qty;
        const query = `SELECT * FROM shop_product 
                        WHERE product_id = ${product_id} AND 
                            shop_id = ${shop_id}`;
        db.query(query, (err, result) => {
            if(err){
                console.log(err)
            }else{
                let response = {}
                if(result[0]){
                    response = {status:'found'}
                }else{
                    response = {status:'notfound'}
                }

                res.send(response)
            }
        })
        
    })

    // add to shop product
    app.post('/addShopProduct', (req, res) => {
        let shop_id = req.body.shop_id;
        let product_id = req.body.product_id;
        let qty = req.body.qty;
        db.query("INSERT INTO shop_product (qty, shop_id, product_id) VALUES (?, ?, ?) ", [qty, shop_id, product_id],  (error, results, fields) => {
            if (error) throw error;
            let message = ""
            if(results.changedRows == 0){
                message = "shop not found or data same "
            }else{
                message = "Succesfully insert shop product"
            }
            return res.send({ error: false, data: results, message: message});
        });
    })

    // update shop product
    app.put('/addShopProduct', (req, res) => {
        let shop_id = req.body.shop_id;
        let product_id = req.body.product_id;
        let qty = req.body.qty;
        db.query("UPDATE shop_product SET qty = ? , deleted_at = NULL WHERE shop_id = ? AND product_id = ?", [qty, shop_id, product_id],  (error, results, fields) => {
            if (error) throw error;
            let message = ""
            if(results.changedRows == 0){
                message = "shop not found or data same "
            }else{
                message = "Succesfully updated shop product"
            }
            return res.send({ error: false, data: results, message: message});
        });
    })

    // update shop product
    app.put('/removeShopProduct', (req, res) => {
        let shop_id = req.body.shop_id;
        let product_id = req.body.product_id;

        db.query("UPDATE shop_product SET deleted_at = NOW() WHERE shop_id = ? AND product_id = ?", [ shop_id, product_id],  (error, results, fields) => {
            if (error) throw error;
            let message = ""
            if(results.changedRows == 0){
                message = "shop not found or data same "
            }else{
                message = "Succesfully updated shop product"
            }
            return res.send({ error: false, data: results, message: message});
        });
    })
///////// End Shop Product /////////

///////// Category /////////

    // get all category 
    app.get('/categories', (req, res) => {
        db.query("SELECT * FROM product_category", (err, result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    })

    // get category by id
    app.get('/category', (req, res) => {
        let id = req.query.id;
        db.query(`SELECT * FROM product_category WHERE id = ${id}`, (err, result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
    })

    //add a new product
    app.post('/category', (req, res) => {
        let cate_name = req.body.cate_name;
        let cate_desc = req.body.cate_desc;
        //validate
        if(!cate_name){
            return res.status(400).send({ error: true, message: "please provide category name "});
        }else{

            db.query("INSERT INTO product_category (cate_name, cate_desc) VALUES(?, ?) ", [cate_name, cate_desc], (error, results, fields) => {
                if (error) throw error;
                let message = ""
                return res.send({ error: false, data: results, message: "add new Product succesfully", cate_name:cate_name});
            });
        }
    });

    //update category with id
    app.put('/category', (req, res) => {
        let id = req.body.id;
        let cate_name = req.body.cate_name;
        let cate_desc = req.body.cate_desc;

        if(!cate_name ){
            return res.status(400).send({ error: true, message: "please provide category name"});
        }else{
            db.query("UPDATE product_category SET cate_name = ?, cate_desc = ? WHERE id = ?", [cate_name, cate_desc, id],  (error, results, fields) => {
                if (error) throw error;
                let message = ""
                if(results.changedRows == 0){
                    message = "category not found or data same "
                }else{
                    message = "Succesfully updated category"
                }
                return res.send({ error: false, data: results, message: message});
            });
        }
    });

    //delete category by id
    app.delete('/category', (req, res) => {
        let id = req.query.id;
        if(!id){
            return res.status(400).send({ error: true, message: "please provide category id"});
        }else{
            db.query("DELETE FROM product_category WHERE id = ?", id,  (error, results, fields) => {
                if (error) throw error;
                let message = ""
                if(results.affectedRows === 0){
                    message = "category not found"
                }else{
                    message = "Succesfully deleted category"
                }
                return res.send({ error: false, data: results, message: message});
            });
        }
    });

///////// End Category /////////

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running oon port ${port}`)
})