import { useState, React } from 'react';
import Axios from 'axios'

function Category() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");

  const [categoryList, setCategoryList] = useState([])
  const [showCategorys, setShowCategorys] = useState(false)
  const getCategorys = () => {
    if(!showCategorys){
      setShowCategorys(true)
      Axios.get('http://localhost:3001/categorys').then((response) => {
        setCategoryList(response.data)
      })
    }
  }
  getCategorys()

  const addCategory = () => {
    Axios.post('http://localhost:3001/category', {
      category_name:categoryName,
      category_desc:categoryDesc,
    }).then(() => {
      setCategoryList([
        ...categoryList,
        {
          category_name:categoryName,
          category_desc:categoryDesc,
        }
      ])
    });
  }

  return (
    <div className="App container">
      <h1>Category</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Category Name</label>
            <input type="text" className="form-control" placeholder="Enter Name" onChange={(event)=>{setCategoryName(event.target.value)}}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Category Desc</label>
            <input type="text" className="form-control" placeholder="Enter Desc" onChange={(event)=>{setCategoryDesc(event.target.value)}}></input>
          </div>
          <button className="btn btn-success" onClick={addCategory}>Add Category</button>
        </form>
      </div>

      <hr />

      <table className="table table-striped">
        <thead>
          <tr>
            <td>Name</td>
            <td>Description</td>
          </tr>
        </thead>
        {categoryList.map((val, key) => {
          return (
            <tr>
              <td>{val.category_name}</td>
              <td>{val.category_desc}</td>
            </tr>
          )
        })}
      </table>

    </div>
  );
}

export default Category;