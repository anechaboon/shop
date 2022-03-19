import Axios from 'axios'
import { useState } from 'react'
import { Routes , 
          BrowserRouter, 
          Route } from "react-router-dom";
import Navbar from "./components/Navbar"

function App() {

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
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes >
          <Route path="/" />

          
        </Routes >
      </BrowserRouter>

      
    </>
  )
}

const Layout = () => {
  return <h1>Home</h1>;
};

export default App;
