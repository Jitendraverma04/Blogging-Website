import React, { useEffect,useState,useContext} from 'react'
import { Link } from 'react-router-dom';
import {UserContext} from '../../Assets/UserContext';
import "../CSS Components/Authors.css"

export default function Authors() {
  
  const{userData}=useContext(UserContext)
  const [authors, setAuthors] = useState([]);

  if (!userData) {
    return <Navigate to="/Main" />;
  }

  useEffect(() => {

    const token=localStorage.getItem("Token");

    if (!userData && !token) {
      return; 
  }
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/allauthors", {method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          }
      });
        const res = await response.json();
        console.log("author section response",res)
        await setAuthors(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [userData]);
  
  
  return (
    <div>
      { userData ?(
      <div className="container">
        <h2>ALL AUTHORS </h2>
      <div className="Authors-Content">
        <div className="Authors-Cards">

        {Array.isArray(authors) && authors.length > 0 ? (
            authors.map((author, index) => (
              <div key={index} className="card" style={{ width: "18rem", margin: "30px 0px" }}>
                <h3>{author.name}</h3>
                <h4>Total Post : {author.post_count}</h4>
              </div>
            ))
          ) : (
            <div>No authors found</div>
          )}
        </div>
      </div>
      </div>
      ):
      (
      <div className="Create-post-login">
        <div className="Content">
          <h2>Please login to view all authors</h2>
        </div>

        <div className="Login">
          <Link to="/register" style={{ textDecoration: "none", fontSize: "24px", color: "red" }}>Login/Register</Link>
        </div>
      </div>
      )
      }
    </div>
  )
}
