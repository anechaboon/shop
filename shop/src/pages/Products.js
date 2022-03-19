import { useState, React } from 'react';
import Axios from 'axios'

function Products() {
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productUnit, setProductUnit] = useState("");

  const [productList, setProductList] = useState([])
  const [showProducts, setShowProducts] = useState(false)
  const getProducts = () => {
    if(!showProducts){
      setShowProducts(true)
      Axios.get('http://localhost:3001/products').then((response) => {
        setProductList(response.data)
      })
    }
  }
  getProducts()

  const addProduct = () => {
    Axios.post('http://localhost:3001/product', {
      product_name:productName,
      product_desc:productDesc,
      product_price:productPrice,
      product_unit:productUnit,
    }).then(() => {
      setProductList([
        ...productList,
        {
          product_name:productName,
          product_desc:productDesc,
          product_price:productPrice,
          product_unit:productUnit,
        }
      ])
    });
  }

  return (
    <div className="App container">
      <h1>Product</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input type="text" className="form-control" placeholder="Enter Name" onChange={(event)=>{setProductName(event.target.value)}}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Product Desc</label>
            <input type="text" className="form-control" placeholder="Enter Name" onChange={(event)=>{setProductDesc(event.target.value)}}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Price</label>
            <input type="text" className="form-control" placeholder="Enter Name" onChange={(event)=>{setProductPrice(event.target.value)}}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Unit</label>
            <input type="text" className="form-control" placeholder="Enter Author" onChange={(event)=>{setProductUnit(event.target.value)}}></input>
          </div>
          <button className="btn btn-success" onClick={addProduct}>Add Product</button>
        </form>
      </div>

      <hr />

      <table className="table table-striped">
        <thead>
          <tr>
            <td>Name</td>
            <td>Description</td>
            <td>Price</td>
            <td>Unit</td>
          </tr>
        </thead>
        <tbody>
          {productList.map((val, key) => {
            return (
              <tr>
                <td>{val.product_name}</td>
                <td>{val.product_desc}</td>
                <td>{val.product_price}</td>
                <td>{val.product_unit}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

    </div>
  );
}

export default Products;