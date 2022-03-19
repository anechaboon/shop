import { useState, React } from 'react';
import Axios from 'axios'

function Shop() {
  const [shopName, setShopName] = useState("");
  const [shopDesc, setShopDesc] = useState("");
  const [shopTel, setShopTel] = useState("");
  const [shopAddress, setShopAddress] = useState("");

  const [shopList, setShopList] = useState([])
  const [showShops, setShowShops] = useState(false)
  const getShops = () => {
    if(!showShops){
      setShowShops(true)
      Axios.get('http://localhost:3001/shops').then((response) => {
        setShopList(response.data)
      })
    }
  }
  getShops()

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

  return (
    <div className="App container">
      <h1>Shop</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Shop Name</label>
            <input type="text" className="form-control" placeholder="Enter Name" onChange={(event)=>{setShopName(event.target.value)}}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Shop Desc</label>
            <input type="text" className="form-control" placeholder="Enter Desc" onChange={(event)=>{setShopDesc(event.target.value)}}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Tel</label>
            <input type="text" className="form-control" placeholder="Enter Tel" onChange={(event)=>{setShopTel(event.target.value)}}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Address</label>
            <input type="text" className="form-control" placeholder="Enter Address" onChange={(event)=>{setShopAddress(event.target.value)}}></input>
          </div>
          <button className="btn btn-success" onClick={addShop}>Add Shop</button>
        </form>
      </div>

      <hr />

      <table className="table table-striped">
        <thead>
          <tr>
            <td>Name</td>
            <td>Description</td>
            <td>Tel</td>
            <td>Address</td>
          </tr>
        </thead>
        {shopList.map((val, key) => {
          return (
            <tr>
              <td>{val.shop_name}</td>
              <td>{val.shop_desc}</td>
              <td>{val.shop_tel}</td>
              <td>{val.shop_address}</td>
            </tr>
          )
        })}
      </table>

    </div>
  );
}

export default Shop;