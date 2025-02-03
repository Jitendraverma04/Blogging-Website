import '../CSS Components/Header.css';
import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Assets/Images/Logo.jpg';
import { UserContext } from '../../Assets/UserContext';

export default function Header() {
  const { userData } = useContext(UserContext);
  const navbarCollapseRef = useRef(null);


  // const [isLHeaderVisible, setIsHeaderVisible] = useState(false);


  //   const name = userData.registerCheck?.name 
  //   ?? userData.loginCheck?.name 
  //   ?? userData.updateDataCheck?.name 
  //   ?? '';

  // const updateName = name.toUpperCase();


  const handleNavLinkClick = () => {
    if (navbarCollapseRef.current) {
      const isNavbarExpanded = navbarCollapseRef.current.classList.contains('show');
      if (isNavbarExpanded) {
        const bootstrapCollapse = new window.bootstrap.Collapse(navbarCollapseRef.current);
        bootstrapCollapse.hide();
      }
    }
  };

  return (
    <div>
      <div className="Header_Container" style={{ display: userData ? "block" : "none" }}>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <div className="Header_Logo">
              <Link to="/">
                <img src={Logo} alt="Logo" />
              </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>


            <div className="collapse navbar-collapse" id="navbarNav" ref={navbarCollapseRef} >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/BlogPosts" style={{ textDecoration: 'none' }}>
                    <button className="nav-link active" onClick={handleNavLinkClick}>
                      BlogPosts
                    </button>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/createpost" style={{ textDecoration: 'none' }}>
                    <button className="nav-link" onClick={handleNavLinkClick}>
                      Create Post
                    </button>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/authors" style={{ textDecoration: 'none' }}>
                    <button className="nav-link" onClick={handleNavLinkClick}>
                      Authors
                    </button>
                  </Link>
                </li>


                <li className="nav-item category">
                  <Link to="" style={{ textDecoration: 'none' }}>
                    <button className="nav-link" onClick={handleNavLinkClick}>
                      Categories
                    </button>
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link to="/">ALL Category</Link></li>
                    <li><Link to="/entertainment">Entertainment</Link></li>
                    <li><Link to="/health">Health And Wellness</Link></li>
                    <li><Link to="/lifestyle">Lifestyle</Link></li>
                    <li><Link to="/technology">Technology</Link></li>
                    <li><Link to="/travel">Travel</Link></li>
                  </ul>
                </li>


                <li className="nav-item">
                  {userData ? (
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                      <button className="nav-link" onClick={handleNavLinkClick}>
                        {userData.registerCheck && userData.registerCheck.name ? userData.registerCheck.name : userData.loginCheck && userData.loginCheck.name ? userData.loginCheck.name : userData.updateDataCheck && userData.updateDataCheck.name ? userData.updateDataCheck.name : ''}
                        {/* {updateName} */}
                      </button>
                    </Link>
                  ) : (
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                      <button className="nav-link" onClick={handleNavLinkClick}>
                        Register
                      </button>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
