import { useState, React } from 'react';
import Axios from 'axios'
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import $ from 'jquery';
import { confirmAlert } from 'react-confirm-alert'; // Import

function Category() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [categoryList, setCategoryList] = useState([])
  const [showCategorys, setShowCategorys] = useState(false)

  // get data list Category Product
  const getCategorys = () => {
    if(!showCategorys){
      setShowCategorys(true)
      Axios.get('http://localhost:3001/categories').then((response) => {
        setCategoryList(response.data)
        console.log('setCategoryList',response.data)
      })
    }
  }
  getCategorys()

  // add new category
  const addCategory = () => {
    Axios.post('http://localhost:3001/category', {
      cate_name:categoryName,
      cate_desc:categoryDesc,
    }).then(() => {
      setCategoryList([
        ...categoryList,
        {
          cate_name:categoryName,
          cate_desc:categoryDesc,
        }
      ])
    });
  }

  // get data to edit category
  const editCategory = (id) => {
    Axios.get(`http://localhost:3001/category?id=${id}`).then((response) => {
      const data = response.data[0]
      $('#category_name').val(data.cate_name);
      $('#category_desc').val(data.cate_desc);

      setCategoryName(data.cate_name);
      setCategoryDesc(data.cate_desc);
      setCategoryId(id);

      $('#btn-update').removeClass( "hide" );
      $('#btn-cancel').removeClass( "hide" );
    })
  }

  // update category
  const updateProduct = () => {
    console.log('updateProduct categoryId',categoryId)
    Axios.put('http://localhost:3001/category',{
      cate_name:categoryName,
      cate_desc:categoryDesc,
      id:categoryId
    }).then((response) => {
      setCategoryList(
        categoryList.map((val) => {
          return val.id == categoryId ? {
            id: val.id,
            cate_name:categoryName,
            cate_desc:categoryDesc,
          } : val;
        })
      )
    })
    cancelUpdate()
  }

  // delete category
  const deleteCategory = (id) => {
    Axios.delete(`http://localhost:3001/category?id=${id}`)
    window.location.reload();
  } 

  // confirm to delete category
  const confirmDeleteCategory = (id) => {
    console.log('confirmDeleteCategory categoryId',id)
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do Delete Category.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteCategory(id)
        },
        {
          label: 'No',
        }
      ]
    });
  }

  // clear value input
  const cancelUpdate = () => {
    $('#category_name').val('');
    $('#category_desc').val('');
    $('#btn-update').addClass( "hide" );
    $('#btn-cancel').addClass( "hide" );
  }

  return (
    <div className="App container">
      <h1>Category</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Category Name</label>
            <input type="text" id="category_name" className="form-control" placeholder="Enter Name" onChange={(event)=>{setCategoryName(event.target.value)}}></input>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Category Desc</label>
            <input type="text" id="category_desc" className="form-control" placeholder="Enter Desc" onChange={(event)=>{setCategoryDesc(event.target.value)}}></input>
          </div>
          <button className="btn btn-success" onClick={addCategory}>Add Category</button>
          <button className="btn btn-warning pull-r hide" id="btn-update" onClick={updateProduct} >Update Product</button>
          <button type='button' className="btn btn-secondary pull-r me-3 hide" id="btn-cancel" onClick={cancelUpdate}>Cancel</button>
        </form>
      </div>

      <hr />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((val, key) => {
            return (
              <tr>
                <td>{val.cate_name}</td>
                <td>{val.cate_desc}</td>
                <td>
                    {<AiIcons.AiOutlineEdit className="hover i-size-4" onClick={() => editCategory(val.id)}/>} 
                    {<AiIcons.AiOutlineDelete className="hover i-size-4" onClick={() => confirmDeleteCategory(val.id)}/>}
                  </td>
              </tr>
            )
          })}
        </tbody>
      </table>

    </div>
  );
}

export default Category;