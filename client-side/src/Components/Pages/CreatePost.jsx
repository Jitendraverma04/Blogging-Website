import React, { useState, useContext } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../CSS Components/CreatePost.css'
import { UserContext } from '../../Assets/UserContext';
import { Link, redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const { userData } = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");

  const navigate=useNavigate();


  const models = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'lists': 'ordered' }, { 'lists': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'lists', 'bullet', 'indent',
    'link', 'image'
  ]



  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail((file));
    }
  };

  const handleOnCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let creator_id;

    if (userData.registerCheck && userData.registerCheck._id !== null) {
      creator_id = userData.registerCheck._id;
    } else if (userData.loginCheck && userData.loginCheck._id !== null) {
      creator_id = userData.loginCheck._id;
    } 
    else if (userData.updateDataCheck && userData.updateDataCheck._id !== null) {
      creator_id = userData.updateDataCheck._id;
    } 
    else {
      console.error("Neither registerCheck nor loginCheck nor updateData has a valid _id in the userData.");
    }


    var createDate = new Date();
    var dd = String(createDate.getDate()).padStart(2, '0');
    var mm = String(createDate.getMonth() + 1).padStart(2, '0');
    var yyyy = createDate.getFullYear();
    createDate = mm + '/' + dd + '/' + yyyy;

    
  const formData = new FormData();
  formData.append('title', title);
  formData.append('category', category);
  formData.append('description', description);
  formData.append('creator_id', creator_id);
  formData.append('thumbnail', thumbnail); 
  formData.append('createDate', createDate); 

  try {

    
    const token=localStorage.getItem("Token");

    if (!token) {
      return;
  }

    const response = await fetch("http://localhost:8000/createpost", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      } ,
      body: formData
    });
    
    const res = await response.json();

    if (response.status === 200) {
         (toast.success("Post Created Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }));
      setTimeout(() => {
         navigate("/")
      }, 3000);
    }
     if(response.status === 500) {
      navigate("/") 
      toast.error("Post Does Not Created", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  } 
}
  catch (error) {
    console.error("Error fetching data:", error);
  }
 
  setThumbnail("")
  setTitle("")
  setDescription("")
  setCategory("")
  
  };


  return (

    <>
      {userData ? (
        <form action="" method="post" enctype="multipart/form-data">

        <div className="CreatePost-Container">

        <h2> Welcome <span style={{ color: userData.registerCheck?.name || userData.loginCheck?.name || userData.updateDataCheck?.name ? 'red' : 'inherit' }}>
    {userData.registerCheck?.name || userData.loginCheck?.name || userData.updateDataCheck?.name || ''}
  </span>
</h2>

 <h3>Create Your Post</h3>
          <img src={thumbnail} alt="" />
          <div className="CreatePost">
            <form className='CreatePost-Form'>
              <input className='Title' type="text" placeholder='Title' value={title} onChange={e => { setTitle(e.target.value) }} autoFocus /><br />
              <div className="SelectCategory">
                <select name="category" id="category" onChange={handleOnCategoryChange}>
                  <option value="">Select An Option</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="health">Health and Wellness</option>
                  <option value="technology">Technology</option>
                  <option value="travel">Travel</option>
                  <option value="entertainment">Entertainment</option>
                </select>

              </div>
              <br />
              <ReactQuill className='ReactQuill' modules={models} formats={formats} value={description} onChange={e=>{setDescription(e)}} style={{height:"30vh",width:"80%",marginLeft:"10%"}} />
              
              <input className='ChooseFile' type="file" accept='png,jpg,jpeg' name='thumbnail' onChange={handleThumbnailChange} required/><br /><br />
              <button type='submit' className='btn btn-primary' onClick={handleSubmit}>Create Post</button>
            </form>
          </div>
        </div>
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" />
        </form>
      ) : (


        // <div className="Create-post-login">
        //   <div className="Content">
        //     <h2>Please login to create a post</h2>
        //   </div>

        //   <div className="Login">
        //     <Link to="/register" style={{ textDecoration: "none", fontSize: "24px", color: "red" }}>Login/Register</Link>
        //   </div>
        // </div>
        redirect("/")
      )}

    </>


  )
}
