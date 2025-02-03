import React, { useContext } from 'react'
import { UserContext } from '../../Assets/UserContext'
import { redirect, useNavigate } from 'react-router-dom';
import "../CSS Components/Dashboard.css"
import { Link } from 'react-router-dom';
export default function Dashboard() {


  const navigate = useNavigate();
  const { setUserData, userData, postData } = useContext(UserContext);

  const Logout = () => {

    setTimeout(() => {
      setUserData(null)
      navigate("/")
    }, 1300);
  }

  return (
    <div>
      <div className="Dashboard-Component">
        {userData ?
          <>
            <div className="Dashboard-Container">
              <div className="Dashboard-content">

                <div className="container">

                  <div className="User-name">
                    <h3>Name :</h3>
                    <h3>
                      {/* {console.log(userData)} */}
                      {(userData.registerCheck && userData.registerCheck.name) ||
                        (userData.loginCheck && userData.loginCheck.name) ||
                        (userData.updateDataCheck && userData.updateDataCheck.name) ||
                        ""} </h3>
                  </div>
                  <div className="User-email">
                    <h3>Email :</h3>
                    <h3>{(userData.registerCheck && userData.registerCheck.email) ||
                      (userData.loginCheck && userData.loginCheck.email) ||
                      (userData.updateDataCheck && userData.updateDataCheck.email) ||
                      ""}</h3>
                  </div>

                  <div className="button">


                    <div className="LogOut">
                      <button onClick={Logout}

                        className='btn-primary'>Logout</button>
                      {/* <LogoutComponent showLoader={loading} /> */}
                    </div>

                    <div className="Update">
                      <Link to="/updatedata">
                        <button className='btn-primary'>Update</button>
                      </Link>
                    </div>


                  </div>


                </div>
              </div>

              <div className="Dashboard_posts">
              {/* {homeData.map(data => {
                {
                  (
                    (userData.registerCheck && userData.registerCheck._id === data.creator_id) ||
                      (userData.updateDataCheck && userData.updateDataCheck._id === data.creator_id) ||
                      (userData.loginCheck && userData.loginCheck._id === data.creator_id) ?
                      <button type="button" class="btn btn-danger" onClick={() => deletePost(data._id)} style={{ height: '5vh', margin: '0px 0px' }}>Delete
                      </button>
                      : (
                        ""
                      )
                  )
                }
              })
              } */}
              </div>
            </div>



          </>
          : redirect("/")
        }
      </div>
    </div>
  )
}
