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
            })
            Axios.get(`http://localhost:3001/shopProduct?shopId=${id}`).then((response) => {
                setProductList(response.data)
            })
        }
    }
    getShopData()

    const editShop = (id) => {
        Axios.get(`http://localhost:3001/shop?id=${id}`).then((response) => {
        const data = response.data[0]
        $('#shop_name').val(data.shop_name);
        $('#shop_desc').val(data.shop_desc);
        $('#shop_tel').val(data.shop_tel);
        $('#shop_address').val(data.shop_address);
        $('#shop_address').val(id);

        setShopName(data.shop_name);
        setShopDesc(data.shop_desc);
        setShopTel(data.shop_tel);
        setShopAddress(data.shop_address);
        setShopId(id);

        $('#btn-update').removeClass( "hide" );
        $('#btn-cancel').removeClass( "hide" );
        })
    }

    const updateShop = () => {
        console.log('updateShop shopId',shopId)
        Axios.put('http://localhost:3001/shop',{
        shop_name:shopName,
        shop_desc:shopDesc,
        shop_tel:shopDesc,
        shop_address:shopAddress,
        id:shopId
        })
        cancelUpdate()
    }

    const cancelUpdate = () => {
        $('#shop_name').val('');
        $('#shop_desc').val('');
        $('#shop_tel').val('');
        $('#shop_address').val('');
        $('#btn-update').addClass( "hide" );
        $('#btn-cancel').addClass( "hide" );
    }

    const AddShopProduct = (productId) => {
        const queryParams = new URLSearchParams(window.location.search)
        const shopId = queryParams.get("id")
        Axios.put('http://localhost:3001/addShopProduct',{
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
                        spId:shopId,
                    } : val;
                })
            )
        })

        setProductList(
            productList.map((val) => {
                return val.id == productId ? {
                    id: val.id,
                    product_name:val.product_name,
                    product_desc:val.product_desc,
                    product_price:val.product_price,
                    product_unit:val.product_unit,
                    spId:shopId,
                } : val;
            })
        )
    }

    const RemoveShopProduct = (productId) => {
        const queryParams = new URLSearchParams(window.location.search)
        const shopId = queryParams.get("id")
        setProductList(
            productList.map((val) => {
                return val.id == productId ? {
                    id: val.id,
                    product_name:val.product_name,
                    product_desc:val.product_desc,
                    product_price:val.product_price,
                    product_unit:val.product_unit,
                    spId:null,
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
            <button className="btn btn-warning pull-r" id="btn-update" onClick={updateShop} >Update Shop</button>
            <button type='button' className="btn btn-secondary pull-r me-3" id="btn-cancel" onClick={cancelUpdate}>Cancel</button>
        </div>


        <table className="table table-striped">
            <thead>
            <tr>
                <th>Category</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Unit</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {productList.map((val, key) => {
                let action =  <FontAwesomeIcon id={val.id} className="add hover" onClick={() => AddShopProduct(val.id)}  icon={faPlus}/> 
                if(val.spId != null){
                    action =  <FontAwesomeIcon id={val.id} className="remove hover" onClick={() => RemoveShopProduct(val.id)}  icon={faXmark}/> 
                }
                return (
                <tr data-id={val.id}>
                    <td>{val.cate_name}</td>
                    <td>{val.product_name}</td>
                    <td>{val.product_desc}</td>
                    <td>{val.product_price}</td>
                    <td>{val.product_unit}</td>
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