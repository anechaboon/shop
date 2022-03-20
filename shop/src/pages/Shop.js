import { useState, React } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios'
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import $ from 'jquery';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Shop() {
  const [shopId, setShopId] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopDesc, setShopDesc] = useState("");
  const [shopTel, setShopTel] = useState("");
  const [shopAddress, setShopAddress] = useState("");

  const [shopList, setShopList] = useState([])
  const [showShops, setShowShops] = useState(false)

  // get all shop
  const getShops = () => {
    if(!showShops){
      setShowShops(true)
      Axios.get('http://localhost:3001/shops').then((response) => {
        setShopList(response.data)
      })
    }
  }
  getShops()

  // add new shop
  const addShop = () => {
    Axios.post('http://localhost:3001/shop', {
      shop_name:shopName,
      shop_desc:shopDesc,
      shop_tel:shopTel,
      shop_address:shopAddress,
    }).then(() => {
      setShopList([
        ...shopList,
        {
          shop_name:shopName,
          shop_desc:shopDesc,
          shop_tel:shopTel,
          shop_address:shopAddress,
        }
      ])
    });
  }

  // get data shop to edit
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

  // update shop
  const updateShop = () => {
    console.log('updateShop shopId',shopId)
    Axios.put('http://localhost:3001/shop',{
      shop_name:shopName,
      shop_desc:shopDesc,
      shop_tel:shopDesc,
      shop_address:shopAddress,
      id:shopId
    }).then((response) => {
      setShopList(
        shopList.map((val) => {
          return val.id == shopId ? {
            id: val.id,
            shop_name:shopName,
            shop_desc:shopDesc,
            shop_tel:shopDesc,
            shop_address:shopAddress,
          } : val;
        })
      )
    })
    cancelUpdate()
  }

  // delete shop
  const deleteShop = (id) => {
    
    console.log('deleteShop shopId',id)
    Axios.delete(`http://localhost:3001/shop?id=${id}`)
    window.location.reload();
    
  } 

  // confirm to delete shop
  const confirmDeleteShop = (id) => {
    console.log('confirmDeleteShop shopId',id)
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do Delete Shop.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteShop(id)
        },
        {
          label: 'No',
        }
      ]
    });

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

  return (
    <div className="App container">
      <h1>Shop</h1>
      <div className="information">
        
          <input type="hidden" id="shopId" onChange={(event)=>{setShopId(event.target.value)}}></input>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Shop Name</label>
            <input type="text" className="form-control" placeholder="Enter Name" id="shop_name" onChange={(event)=>{setShopName(event.target.value)}}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Shop Desc</label>
            <input type="text" className="form-control" placeholder="Enter Desc" id="shop_desc" onChange={(event)=>{setShopDesc(event.target.value)}}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Tel</label>
            <input type="text" className="form-control" placeholder="Enter Tel" id="shop_tel" onChange={(event)=>{setShopTel(event.target.value)}}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Address</label>
            <input type="text" className="form-control" placeholder="Enter Address" id="shop_address" onChange={(event)=>{setShopAddress(event.target.value)}}></input>
          </div>
          <button className="btn btn-success" onClick={addShop}>Add Shop</button>
          <button className="btn btn-warning pull-r hide" id="btn-update" onClick={updateShop} >Update Shop</button>
          <button type='button' className="btn btn-secondary pull-r me-3 hide" id="btn-cancel" onClick={cancelUpdate}>Cancel</button>
      </div>

      <hr />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Tel</th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {shopList.map((val, key) => {
            return (
              <tr>
                <td>{val.shop_name}</td>
                <td>{val.shop_desc}</td>
                <td>{val.shop_tel}</td>
                <td>{val.shop_address}</td>
                <td>
                    {<AiIcons.AiOutlineEdit className="hover i-size-4" onClick={() => editShop(val.id)}/>} 
                    {<AiIcons.AiOutlineDelete className="hover i-size-4" onClick={() => confirmDeleteShop(val.id)}/>}
                    {
                      <Link to={`shopDetail?id=${val.id}`}>
                        <IoIcons.IoIosInformationCircleOutline className="hover i-size-4" />
                      </Link>
                    }
                  </td>
              </tr>
            )
          })}
        </tbody>
      </table>

    </div>
  );
}

export default Shop;