import React, { useState,useContext } from 'react'
import "../CSS Components/Main.css"
import { Link, Navigate } from 'react-router-dom';

import Register from './Register';
import Login from './Login';
import Footer from '../Footer Components/Footer';

import HomeImg1 from "../../Assets/Images/HomeImg1.jpg"
import HomeImg2 from "../../Assets/Images/HomeImg2.jpg"
import HomeImg3 from "../../Assets/Images/HomeImg3.jpg"
import HomeImg4 from "../../Assets/Images/HomeImg4.jpg"

import { UserContext } from '../../Assets/UserContext';


export default function Main() {

  const [activeComponent, setActiveComponent] = useState("register");
  const [isRegisterVisible, setIsRegisterVisible] = useState(true);
  const [isLoginVisible, setIsLoginVisible] = useState(false);


  
  const { userData } = useContext(UserContext);


  if (userData) {
    return <Navigate to="/BlogPosts" />;
  }


  const handleComponentSwitch = (component) => {
    setActiveComponent(component);
    if (component === "register") {
      setIsRegisterVisible(true);
      setIsLoginVisible(false);
    } else if (component === "login") {
      setIsRegisterVisible(false);
      setIsLoginVisible(true);
    }
  };


  return (
    <div>
      <div className="HomeComponent">

        <div className="LeftSide">
          <h1>Welcome to DailyBlogs</h1><br />
          <p>Your Go-To Source for Inspiration and Insight!
            Discover, Learn, and Connect with Ideas that Matter

            At DailyBlogs, we believe in the power of stories, ideas, and fresh perspectives.
            Our mission is to bring you engaging, thought-provoking content that sparks your creativity and encourages growth in all aspects of life.
            Whether you're here to find helpful tips, explore new topics, or simply enjoy a good read, you've come to the right place!</p>
        </div>

        <div className="RightSide">

          <div className="navigate">
            <a onClick={() => handleComponentSwitch("register")} style={{ display: isRegisterVisible ? "none" : "block" ,color:"blue",cursor:"pointer"}}> Register </a>
            <a onClick={() => handleComponentSwitch("login")} style={{ display: isLoginVisible ? "none" : "block" ,color:"blue",cursor:"pointer"}}>Login </a>
          </div>
          
          <div>
            {activeComponent === "register" && <Register />}
            {activeComponent === "login" && <Login />}
          </div>
        </div>

      </div>



      <div className="AboutUsComponent">

        <div className="LeftSide">
          <div className="Grid-box">
            <img src={HomeImg1} alt="" />
            <img src={HomeImg2} alt="" />
            <img src={HomeImg3} alt="" />
            <img src={HomeImg4} alt="" />
          </div>
        </div>

        <div className="RightSide">
          <p> At DailyBlogs, we are passionate about sharing fresh, insightful, and thought-provoking content with our readers every single day.
            Whether you're here to find inspiration, explore new ideas, or stay updated on the latest trends, we’ve got something for you</p>
        </div>

      </div>


<Footer/>

    </div>
  )
}
