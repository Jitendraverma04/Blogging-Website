import React, { useContext } from 'react'

import { UserContext } from '../../Assets/UserContext'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Travel() {



    const navigate = useNavigate();

    const { postData, userData } = useContext(UserContext);
    if (Array.isArray(postData)) {
        var foundItems = postData.filter(item => item.category === "travel");
    } else {
        foundItems = 0
    }



    const deletePost = async (postId) => {
        try {
            alert("Are you sure ?")
            const response = await fetch(`http://localhost:8000/deletePost/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            const data = await response.json();
            console.log('Post deleted successfully:', data);

            navigate("/");

        } catch (error) {
            console.error('Error deleting post:', error.message);
        }
    };



    return (
        <>
            <div className="Post_Container">
                {userData ? (
                    foundItems != 0 ? (
                        <>
                            <div className="Post_Container_Content">
                                <h1>Travel Posts</h1>
                            </div>
                            <div className="Post_cards" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                {foundItems.map(data => {
                                    
                                    return (

                                        <div className="card" style={{ width: '18rem', height: "28rem", marginTop: "2rem" }} key={data._id}>
                                            <img
                                                src={`http://localhost:8000/${data.thumbnail.replace("uploads\\", "")}`}
                                                className="card-img-top"
                                                style={{ height: '50%' }}
                                                alt="Post Thumbnail"
                                            />

                                            <div className="card-body">

                                                <h5 className="card-title" style={{ height: "5rem" }}>{data.title && typeof data.title === 'string' && data.title.length > 80
                                                    ? `${data.title.replace(/(<([^>]+)>)/gi, "").slice(0, 80)}...`
                                                    : data.title.replace(/(<([^>]+)>)/gi, "")} </h5>


                                                {/* <div className="card-text" style={{height:"4rem"}}>
                                                {data.description && typeof data.description === 'string' && data.description.length > 110
                                                    ? `${data.description.replace(/(<([^>]+)>)/gi, "").slice(0, 110)}...`
                                                    : data.description.replace(/(<([^>]+)>)/gi, "")}
                                            </div> */}


                                                <div className="card-author" style={{ display: 'flex', padding: "0rem", gap: "1rem", height: "4rem", marginTop: "1rem" }}>

                                                    <div className="Author-name">
                                                        <b style={{ padding: '0 0px 0 0' }}>Author: {data.userData.name}</b>
                                                    </div>


                                                    <div className="Category" style={{ textDecoration: "none", color: "black", padding: '0 0px 0 0', display: "flex" }}>

                                                        <b> Category: {data.category[0].toUpperCase() + data.category.slice(1)}</b>

                                                    </div>


                                                </div>
                                                <div className="Card_BottomButton" style={{ display: "flex", justifyContent: "space-around", padding: ".2rem", height: "0rem" }}>
                                                    <Link to={`/postdescription/${data._id}`}>
                                                        <button className="btn btn-primary" style={{ margin: '0px 0px', height: '5vh' }}>Read More</button>
                                                    </Link>

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
                                                </div>
                                            </div>
                                        </div>
                                    )

                                })}
                            </div>

                        </>
                    ) : (
                        <h1>No post for Travel</h1>
                    )
                ) : (
                    <div className="Create-post-login">
                        <div className="Content">
                            <h2>Please login to view travel posts</h2>
                        </div>

                        <div className="Login">
                            <Link to="/register" style={{ textDecoration: "none", fontSize: "24px", color: "red" }}>Login/Register</Link>
                        </div>
                    </div>
                )}

                <div className="sticky-Button">

                    <Link to="/CreatePost">
                        <button>Write</button>
                    </Link>
                </div>
            </div>
        </>
    )

}
