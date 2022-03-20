import { useState, React } from 'react';
import Axios from 'axios'
import * as MdIcons from 'react-icons/md';
import $ from 'jquery';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
function ShopDetail() {
    const [shopId, setShopId] = useState("");
    const [shopName, setShopName] = useState("");
    const [shopDesc, setShopDesc] = useState("");
    const [shopTel, setShopTel] = useState("");
    const [shopAddress, setShopAddress] = useState("");
    
    const [productList, setProductList] = useState([])
    const [showShops, setShowShops] = useState(false)
    const [iconList, setIconList] = useState([])
    

    // get shop data and shop product
    const getShopData = () => {
        const queryParams = new URLSearchParams(window.location.search)
        const id = queryParams.get("id")
        if(!showShops){
            setShowShops(true)
            Axios.get(`http://localhost:3001/shop?id=${id}`).then((response) => {
                const data = response.data[0];
                setShopName(data.shop_name)
                setShopDesc(data.shop_desc)
                setShopTel(data.shop_tel)
                setShopAddress(data.shop_address)
                setShopId(id);

            })
            Axios.get(`http://localhost:3001/shopProducts?shopId=${id}`).then((response) => {
                setProductList(response.data)
            })
        }
    }
    getShopData()

    // update shop data
    const updateShop = () => {
        console.log('updateShop shopId',shopId)
        Axios.put('http://localhost:3001/shop',{
            shop_name:shopName,
            shop_desc:shopDesc,
            shop_tel:shopDesc,
            shop_address:shopAddress,
            id:shopId
        })
    }

    // clear value input
    const cancelUpdate = () => {
        $('#shop_name').val('');
        $('#shop_desc').val('');
        $('#shop_tel').val('');
        $('#shop_address').val('');
        $('#btn-update').addClass( "hide" );
        $('#btn-cancel').addClass( "hide" );
    }

    // add product to shop
    const AddShopProduct = (productId) => {
        const queryParams = new URLSearchParams(window.location.search)
        const shopId = queryParams.get("id")
        const qty = $(`tr[data-id="${productId}"] > td.qty > input.qty`).val()
        if(qty != ''){
            // check has row product in tb 
            Axios.get(`http://localhost:3001/shopProduct?product_id=${productId}&shop_id=${shopId}`).then((response) => {

                if(response.data.status == 'found'){
                    // update data
                    Axios.put('http://localhost:3001/addShopProduct',{
                        product_id:productId,
                        shop_id:shopId,
                        qty:qty,
                    }).then((response) => {
                        renderTable(productId)
                    })
                    
                }else{
                    // insert new 
                    Axios.post('http://localhost:3001/addShopProduct',{
                        product_id:productId,
                        shop_id:shopId,
                        qty:qty,
                    }).then((response) => {
                        renderTable(productId)
                    })
                }
            })
            
        }else{
            // alert validate value
            confirmAlert({
                title: 'Validate Quantity',
                message: 'Please Input Quantity.',
                buttons: [
                {
                    label: 'Ok',
                }
                
            ]
            });
        }
        
    }

    // remove product from shop
    const RemoveShopProduct = (productId) => {
        const queryParams = new URLSearchParams(window.location.search)
        const shopId = queryParams.get("id")
        $(`tr[data-id="${productId}"] > td.qty > input.qty`).val(null)
        Axios.put('http://localhost:3001/removeShopProduct',{
                    product_id:productId,
                    shop_id:shopId,
        }).then((response) => {
            setProductList(
                productList.map((val) => {
                    return val.id == productId ? {
                        id: val.id,
                        product_name:val.product_name,
                        product_desc:val.product_desc,
                        product_price:val.product_price,
                        product_unit:val.product_unit,
                        cate_name:val.cate_name,
                        spId:null,
                    } : val;
                })
            )
        })
    }

    // show data after add or remove product from shop
    const renderTable = (productId) => {
        setProductList(
            productList.map((val) => {
                return val.id == productId ? {
                    id: val.id,
                    product_name:val.product_name,
                    product_desc:val.product_desc,
                    product_price:val.product_price,
                    product_unit:val.product_unit,
                    cate_name:val.cate_name,
                    spId:shopId,
                } : val;
            })
        )
    }

    return (
        <div className="App container">
        <h1>Shop Detail</h1>
        <div className="information">
            <input type="hidden" id="shopId" onChange={(event)=>{setShopId(event.target.value)}}></input>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Shop Name</label>
                <input type="text" className="form-control" placeholder="Enter Name" id="shop_name" onChange={(event)=>{setShopName(event.target.value)}} value={shopName} ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Shop Desc</label>
                <input type="text" className="form-control" placeholder="Enter Desc" id="shop_desc" onChange={(event)=>{setShopDesc(event.target.value)}} value={shopDesc}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Tel</label>
                <input type="text" className="form-control" placeholder="Enter Tel" id="shop_tel" onChange={(event)=>{setShopTel(event.target.value)}} value={shopTel}></input>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Address</label>
                <input type="text" className="form-control" placeholder="Enter Address" id="shop_address" onChange={(event)=>{setShopAddress(event.target.value)}} value={shopAddress}></input>
            </div>
            <button type='button' className="btn btn-warning pull-r" id="btn-update" onClick={updateShop} >Update Shop</button>
            <button type='button' className="btn btn-secondary pull-r me-3" id="btn-cancel" onClick={cancelUpdate}>Cancel</button>
        </div>

        <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Category</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {productList.map((val, key) => {
                    let action =  <FontAwesomeIcon id={val.id} className="add hover" onClick={() => AddShopProduct(val.id)}  icon={faPlus} title="Add to Shop"/> 
                    let disabledQty = '';
                    let qty = null;
                    console.log(`shopId ${shopId} | spId ${val.spId} ${val.product_name}`);

                    if(val.spId != null && val.spId == shopId && val.deleted_at == null){
                        qty = val.qty
                        disabledQty = 'readonly';
                        action =  <FontAwesomeIcon id={val.id} className="remove hover" onClick={() => RemoveShopProduct(val.id)}  icon={faXmark} title="Remove from Shop"/> 
                    }
                    return (
                        <tr data-id={val.id}>
                            <td>{val.product_name}</td>
                            <td>{val.product_desc}</td>
                            <td>{val.product_price}</td>
                            <td>{val.product_unit}</td>
                            <td>{val.cate_name}</td>
                            <td className='qty'>     
                                <input type="number" className="form-control qty" placeholder="Enter Quantity" value={qty} readOnly={disabledQty}></input>
                            </td>
                            <td className='action'>{action}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

        </div>
    );
}

export default ShopDetail;