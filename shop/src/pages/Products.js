import { useState, React } from 'react';
import Axios from 'axios'
import * as AiIcons from 'react-icons/ai';
import $ from 'jquery';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Products() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productUnit, setProductUnit] = useState("");
  const [productCate, setProductCate] = useState("");
  
  const [productList, setProductList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [showProducts, setShowProducts] = useState(false)

  // get all product
  const getProducts = () => {
    if(!showProducts){
      setShowProducts(true)
      Axios.get('http://localhost:3001/products').then((response) => {
        setProductList(response.data)
      })
      Axios.get('http://localhost:3001/categories').then((response) => {
        setCategoryList(response.data)
      })
    }
  }
  getProducts()

  // add new product
  const addProduct = () => {
    Axios.post('http://localhost:3001/product', {
      product_name:productName,
      product_desc:productDesc,
      product_price:productPrice,
      product_unit:productUnit,
      category_id:productCate,
      
    }).then((response) => {
      console.log(response)
      console.log(response.data.cate_name)
      setProductList([
        ...productList,
        {
          product_name:productName,
          product_desc:productDesc,
          product_price:productPrice,
          product_unit:productUnit,
          cate_name:response.data.cate_name
        }
      ])
    });
    cancelUpdate()
  }

  // get data product to edit
  const editProduct = (id) => {
    Axios.get(`http://localhost:3001/product?id=${id}`).then((response) => {
      const data = response.data[0]
      $('#product_name').val(data.product_name);
      $('#product_desc').val(data.product_desc);
      $('#product_price').val(data.product_price);
      $('#product_unit').val(data.product_unit);
      $('#product_unit').val(id);

      setProductName(data.product_name);
      setProductDesc(data.product_desc);
      setProductPrice(data.product_price);
      setProductUnit(data.product_unit);
      setProductCate(data.category_id)
      setProductId(id);

      $('#btn-update').removeClass( "hide" );
      $('#btn-cancel').removeClass( "hide" );
    })
  }

  // update product
  const updateProduct = () => {
    console.log('updateProduct productId',productId)
    Axios.put('http://localhost:3001/product',{
      product_name:productName,
      product_desc:productDesc,
      product_price:productPrice,
      product_unit:productUnit,
      category_id:productCate,
      id:productId
    }).then((response) => {
      setProductList(
        productList.map((val) => {
          return val.id == productId ? {
            id: val.id,
            product_name:productName,
            product_desc:productDesc,
            product_price:productPrice,
            product_unit:productUnit,
            cate_name:response.data.cate_name
          } : val;
        })
      )
    })
    cancelUpdate()
  }

  // delete product
  const deleteProduct = (id) => {
    
    console.log('deleteProduct productId',id)
    Axios.delete(`http://localhost:3001/product?id=${id}`)
    window.location.reload();
    
  } 

  // confirm to delete product
  const confirmDeleteProduct = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do Delete Product.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteProduct(id)
        },
        {
          label: 'No',
        }
      ]
    });

  }

  // clear value input
  const cancelUpdate = () => {
    $('#product_name').val('');
    $('#product_desc').val('');
    $('#product_price').val('');
    $('#product_unit').val('');
    $('#product_cate').val('');
    $('#btn-update').addClass( "hide" );
    $('#btn-cancel').addClass( "hide" );
  } 

  

  return (
    <div className="App container">
      <h1>Product</h1>
      <div className="information">
          <input type="hidden" id="productId" onChange={(event)=>{setProductId(event.target.value)}}></input>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input type="text" className="form-control" placeholder="Enter Name" id="product_name" onChange={(event)=>{setProductName(event.target.value)}}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Product Desc</label>
            <input type="text" className="form-control" placeholder="Enter Name" id="product_desc" onChange={(event)=>{setProductDesc(event.target.value)}}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Price</label>
            <input type="text" className="form-control" placeholder="Enter Name" id="product_price" onChange={(event)=>{setProductPrice(event.target.value)}}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Unit</label>
            <input type="text" className="form-control" placeholder="Enter Author" id="product_unit" onChange={(event)=>{setProductUnit(event.target.value)}}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Category</label>
            <select id="product_cate" className="form-control" onChange={(event)=>{setProductCate(event.target.value)}} value={productCate}>
              <option value="">Select Category Product</option>
              {categoryList.map((val, key) => {
                return (
                  <option value={val.id}>{val.cate_name}</option>
                )
              })}

            </select>
          </div>
          <button className="btn btn-success" onClick={addProduct}>Add Product</button>
          <button className="btn btn-warning pull-r hide" id="btn-update" onClick={updateProduct} >Update Product</button>
          <button type='button' className="btn btn-secondary pull-r me-3 hide" id="btn-cancel" onClick={cancelUpdate}>Cancel</button>
      </div>

      <hr />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Unit</th>
            <th>Categoty</th>
            <th></th>
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
                <td>{val.cate_name}</td>
                <td>
                  {<AiIcons.AiOutlineEdit className="hover i-size-4" onClick={() => editProduct(val.id)}/>} 
                  {<AiIcons.AiOutlineDelete className="hover i-size-4" onClick={() => confirmDeleteProduct(val.id)}/>}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

    </div>
  );
}

export default Products;