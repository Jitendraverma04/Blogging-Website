import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import "../CSS Components/Category.css"
import { UserContext } from '../../Assets/UserContext';
export default function Category() {

      
  const { userData } = useContext(UserContext);



  return (
    <div>
     <footer style={{ display: userData ? "block" : "none"}}>
      
     <div className="Footer-Category-Container ">
           
           <h2>Category</h2>


      <div className="Category-Container">

      <div className="category">
      <img src="" alt="" />
            <Link to="/" style={{textDecoration:"none",color:"black"}}>
      <button>
        <div className="content"><p>All</p></div>
      </button>
        </Link>
     </div>


     <div className="category">
      <img src="" alt="" />
      
      <Link to="/lifestyle" style={{textDecoration:"none",color:"black"}}>
            <button>
            <div className="content"><p>Lifestyle</p></div>
            </button>
            </Link>
     
     </div>

     <div className="category">
      <img src="" alt="" />
      <Link to="/health" style={{textDecoration:"none",color:"black"}}>
            
      <button>
<div className="content"><p>Health and Wellness</p></div>
      </button>
</Link>
     </div>

     <div className="category">
      <img src="" alt="" />
      <Link to="/technology" style={{textDecoration:"none",color:"black"}}>
      <button>
<div className="content"><p>Technology</p></div>
</button>
</Link>
     </div>


     <div className="category">
      <img src="" alt="" />
    
      <Link to="/travel" style={{textDecoration:"none",color:"black"}}>
      <button>
      <div className="content"><p>Travel</p></div>
      </button>
      </Link>
     </div>


     <div className="category">
      <img src="" alt="" />

      <Link to="/entertainment" style={{textDecoration:"none",color:"black"}}>
      <button>
<div className="content"><p>Entertainment</p></div>
      </button>
</Link>
     </div>

    

      </div>
      </div>
     </footer>
    </div>
  )
}
