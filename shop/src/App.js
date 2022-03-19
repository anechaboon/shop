import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Switch, BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import Products from './pages/Products';
import Shop from './pages/Shop';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch >
          <Route path='/' exact component={Home} />
          <Route path='/products' component={Products} />
          <Route path='/category' component={Category} />
          <Route path='/shop' component={Shop} />
        </Switch >
      </Router>
    </>
  );
}

export default App;