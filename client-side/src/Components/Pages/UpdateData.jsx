import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { UserContext } from '../../Assets/UserContext'
import { redirect, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function UpdateData() {
  const navigate = useNavigate()

  const { setUserData, userData } = useContext(UserContext);

  const [defaultName, setName] = useState(userData.registerCheck && userData.registerCheck.name ? userData.registerCheck.name : userData.loginCheck && userData.loginCheck.name ? userData.loginCheck.name : userData.updateDataCheck && userData.updateDataCheck.name ? userData.updateDataCheck.name : '')
  const [defaultEmail, setEmail] = useState(userData.registerCheck && userData.registerCheck.email ? userData.registerCheck.email : userData.loginCheck && userData.loginCheck.email ? userData.loginCheck.email : userData.updateDataCheck && userData.updateDataCheck.email ? userData.updateDataCheck.email : '')
  const id = userData.registerCheck && userData.registerCheck._id ? userData.registerCheck._id : userData.loginCheck && userData.loginCheck._id ? userData.loginCheck._id : userData.updateDataCheck && userData.updateDataCheck._id ? userData.updateDataCheck._id : ''


  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {

    const token=localStorage.getItem("Token");

    console.log(token)
    
    if (!token) {
      redirect("/"); 
  }


    data.id = id;

    const response = await fetch("http://localhost:8000/updatedata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
    const res = await response.json()
    if (response.status === 200) {
      await setUserData(res);
      (toast.success("Data Successfully Updated", {
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
      }, 2000);
    }
    if (response.status === 500) {
      toast.error(res, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/")
      }, 2000);
    }
  }
  const registerOptions = {
    name: { required: "Name is required" },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters"
      }
    }
  };




  return (
    <div>
      <div className="card" style={{ width: "20rem", margin: "100px auto" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input className="form-control" id="Name" aria-describedby="nameHelp" type="text" defaultValue={defaultName} onChange={(e) => { setName(e.target.value) }} {...register('name', registerOptions.name)} />
              <small className="text-danger">
                {errors?.name && errors.name.message}
              </small>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" defaultValue={defaultEmail} onChange={(e) => { setEmail(e.target.value) }}  {...register('email', registerOptions.email)} />
              <small className="text-danger">
                {errors?.email && errors.email.message}
              </small>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
              <input type="password" className="form-control" id="Password" placeholder='Enter your old or a new password'
                name="password"
                {...register('password', registerOptions.password)} />
              <small className="text-danger">
                {errors?.password && errors.password.message}
              </small>
            </div>

            <div className="mb-3">

              <button type="submit" className="btn btn-primary" style={{ margin: "0 100px" }}>Submit</button>

            </div>

          </form>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />
      </div>

    </div>
  )
}
