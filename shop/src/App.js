
function App() {
  return (
    <div className="App container">
      <h1>Shop</h1>
      <div className="information">
        {/* Product Name */}
        <div className="mb-3">
          <label htmlFor="product_name" className="form-label">
            Product Name :
          </label>
          <input type="text" className="form-control" placeholder="Product Name"></input>
        </div>
        {/* Product Desc */}
        <div className="mb-3">
          <label htmlFor="product_desc" className="form-label">
            Product Desc :
          </label>
          <input type="text" className="form-control" placeholder="Product Desc"></input>
        </div>
        {/* Product Tel */}
        <div className="mb-3">
          <label htmlFor="product_tel" className="form-label">
            Tel :
          </label>
          <input type="text" className="form-control" placeholder="Tel"></input>
        </div>
        {/* Product Address */}
        <div className="mb-3">
          <label htmlFor="product_address" className="form-label">
          Address :
          </label>
          <input type="text" className="form-control" placeholder="Address"></input>
        </div>
      </div>
      <div className="pull-right">
        <button className="btn btn-success">Add Product</button>
      </div>
    </div>
  );
}

export default App;
