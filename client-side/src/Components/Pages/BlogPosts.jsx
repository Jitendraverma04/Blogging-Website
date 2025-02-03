import React, { useEffect, useState, useContext } from 'react';
import { Link, Navigate, redirect } from 'react-router-dom';
import '../CSS Components/BlogPosts.css';
import { UserContext } from '../../Assets/UserContext';
// import BlogBG from '../../Assets/Images/BlogBG.jpg'



export default function Home() {


    const [homeData, setHomeData] = useState([]);

    
    const [like, setlike] = useState(1);

    const { setPostData, userData } = useContext(UserContext);



    const deletePost = async (postId) => {
        const token=localStorage.getItem("Token");
        try {
           const confirmed= confirm("Are you sure ?")
           if(confirmed)
           {
          const response = await fetch(`http://localhost:8000/deletePost/${postId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`,
            },
        
          });
        }
        else{
            Navigate("/");
        }
      
          if (!response.ok) {
            throw new Error('Failed to delete post');
          }
      
          const data = await response.json();
          console.log('Post deleted successfully:', data);
          Navigate("/");

      
        } catch (error) {
          console.error('Error deleting post:', error.message);
        }

        const fetchHomeData = async () => {
            try {
                const response = await fetch('http://localhost:8000/homedata',{method: "GET",
                    headers: {
                      "Authorization": `Bearer ${token}`,
                    }          
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const res = await response.json();

                const postData = res.posts;
                const userData = res.authorsWithPostsCount;

                const userDataMap = await userData.reduce((acc, user) => {
                    acc[user._id] = user;
                    return acc;
                }, {});

                const mappedData = await postData.map(post => ({
                    ...post,
                    userData: userDataMap[post.creator_id]
                }));

                console.log('Mapped Data:', mappedData);

                setPostData(mappedData);
                setHomeData(mappedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchHomeData();
        
      };



    useEffect(() => {
      
        const token=localStorage.getItem("Token");

          if (!token) {
            return;
        }

        const fetchHomeData = async () => {
            try {
                const response = await fetch('http://localhost:8000/homedata',{method: "GET",
                    headers: {
                      "Authorization": `Bearer ${token}`,
                    }          
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const res = await response.json();

                const postData = res.posts;
                const userData = res.authorsWithPostsCount;

                const userDataMap = await userData.reduce((acc, user) => {
                    acc[user._id] = user;
                    return acc;
                }, {});

                const mappedData = await postData.map(post => ({
                    ...post,
                    userData: userDataMap[post.creator_id]
                }));

                console.log('Mapped Data:', mappedData);

                setPostData(mappedData);
                setHomeData(mappedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchHomeData();

    }, [userData]);
    
    

    // const toggleLike = (component) => {
    //     setActiveComponent(component);
    //     if (component === "register") {
    //       setIsRegisterVisible(true);
    //       setIsLoginVisible(false);
    //     } else if (component === "login") {
    //       setIsRegisterVisible(false);
    //       setIsLoginVisible(true);
    //     }
    //   };
 

    // function toggleLike()
    // {
    //     setlike(like+1);
    //     console.log(like);
    // }






    


    return (
        <div>
            <div className="Post_Container">
            {/* <img src={BlogBG} alt=""  style={{height:"100%",width:"100%",position:"absolute",left:"0",top:"6rem",zIndex:"-1",opacity:"0.7"}}/> */}
                {userData ? (
                    homeData != 0 ? (
                        <>
                            <div className="Post_Container_Content">
                            </div>
                            
                            <div className="Post_cards" style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                {homeData.map(data => {

                                    return (

                                        <div className="card" style={{ width: '18rem',height:"28rem",marginTop:"2rem" }} key={data._id}>
                                            <img
                                                src={`http://localhost:8000/${data.thumbnail.replace("uploads\\", "")}`}
                                                className="card-img-top"
                                                style={{ height: '50%' }}
                                                alt="Post Thumbnail"
                                            />

                                            <div className="card-body">
                                               
                                                <h5 className="card-title" style={{height:"4rem"}}>{data.title && typeof data.title === 'string' && data.title.length > 80
                                                        ? `${data.title.replace(/(<([^>]+)>)/gi, "").slice(0, 80)}...`
                                                        : data.title.replace(/(<([^>]+)>)/gi, "")} </h5>


                                                {/* <div className="card-famous" style={{ display: 'flex',padding:"0rem",gap:"3rem",height:"2rem",marginTop:"1rem",justifyContent:"center" }}>

                                                    <div className="card-likes">
                                                    <button className="btn btn-primary" style={{ margin: '0px 0px',height:'5vh' }} onClick={toggleLike}>Likes</button>
                                                    </div>

                                                    <div className="card-comments">
                                                    <button className="btn btn-danger" style={{ margin: '0px 0px',height:'5vh' }}>Comments</button>
                                                    </div>

                                                </div> */}

                                                <div className="card-author" style={{ display: 'flex',padding:"0rem",gap:"1rem",height:"4rem",marginTop:"1rem" }}>

                                                    <div className="Author-name">
                                                        <b style={{ padding: '0 0px 0 0'}}>Author: {data.userData.name}</b>
                                                    </div>


                                                    <div className="Category" style={{ textDecoration: "none",color:"black",padding: '0 0px 0 0',display:"flex"}}>
                                                        
                                                                <b> Category: {data.category[0].toUpperCase() + data.category.slice(1)}</b>
                                                           
                                                    </div>


                                                </div>
                                                <div className="Card_BottomButton" style={{ display: "flex",justifyContent:"space-around",padding:".2rem",height:"0rem"}}>
                                                    <Link to={`/postdescription/${data._id}`}>
                                                        <button className="btn btn-primary" style={{ margin: '0px 0px',height:'5vh' }}>Read More</button>
                                                    </Link>

                                                    {
                                                        (
                                                            (userData.registerCheck && userData.registerCheck._id === data.creator_id ) ||
                                                            (userData.updateDataCheck && userData.updateDataCheck._id=== data.creator_id )||
                                                                (userData.loginCheck && userData.loginCheck._id === data.creator_id ) ?
                                                                <button type="button" class="btn btn-danger" onClick={() => deletePost(data._id)} style={{height:'5vh',margin: '0px 0px'}}>Delete
                                                                </button>
                                                                : (
                                                                    ""
                                                                )
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                        </>
                    ) : (
                        <h1>No post</h1>
                    )


                ) : (
                    // <div className="Create-post-login">
                    //     <div className="Content">
                    //         <h2>Please login to view all posts</h2>
                    //     </div>

                    //     <div className="Login">
                    //         <Link to="/register" style={{ textDecoration: "none", fontSize: "24px", color: "red" }}>Login/Register</Link>
                    //     </div>
                    // </div>
                    redirect("/")
                )}
            </div>

                
            <div className="sticky-Button">
                
            <Link to="/CreatePost">
                <button>Write</button></Link>
                    </div>

        </div>
    );
}


