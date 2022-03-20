import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { Switch, BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import Products from './pages/Products';
import Shop from './pages/Shop';
import ShopDetail from './pages/ShopDetail';

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Switch >
          <Route path='/' exact component={Home} />
          <Route path='/products' component={Products} />
          <Route path='/category' component={Category} />
          <Route path='/shop' component={Shop} />
          <Route path='/shopDetail' component={ShopDetail} />
        </Switch >
      </Router>
    </>
  );
}

export default App;