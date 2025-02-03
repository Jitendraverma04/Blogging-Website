import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import "../CSS Components/PostDescription.css"
import { UserContext } from '../../Assets/UserContext';
import { Link } from 'react-router-dom'


export default function PostDescription() {
    const { id } = useParams();

    const { postData } = useContext(UserContext);

    const foundItem = postData.find(item => item._id === id);
    console.log("founditem",foundItem)

    return (
        <div>

            <div className="PostDescription" >
            <div className="PostDescriptionHeader">

                <div className="Post-Img">
                
                    <img 
                    src={`http://localhost:8000/${foundItem.thumbnail.replace("uploads\\", "")}`}
                     alt="Thumbnail" />
                </div>

                <div className="Post-Author">
                    {/* <img src={foundItem.thumbnail} alt="" /> */}
                    <p>Author : {foundItem.userData.name}</p>
                </div>

                <div className="Post-Title">
                    <p>Title : {foundItem.title}</p>
                </div>
                
            </div>

                <div className="Post-Desc">
                    <p><b>Description :</b> {foundItem.description.replace(/(<([^>]+)>)/gi, "")}</p>
                </div>

                <div className="Post-Date">
                <b>Create Date : </b>
                    <p>{foundItem.createDate.slice(8, 10)}-{foundItem.createDate.slice(5, 7)}-{foundItem.createDate.slice(0, 4)}  </p>
                </div>
                <Link to="/">
      <button type='submit' className='btn btn-primary'>Go Back</button>
      </Link>
            </div>
        </div>
    );

}
