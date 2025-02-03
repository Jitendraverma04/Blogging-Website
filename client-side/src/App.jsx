

import {RouterProvider,createBrowserRouter} from 'react-router-dom'
// import Register from './Components/Pages/Register';
import Authors from './Components/Pages/Authors';
import BlogPosts from './Components/Pages/BlogPosts';
import Layout from './Components/Pages/Layout';
// import Login from './Components/Pages/Login';
import ErrorPage from './Components/Pages/ErrorPage';
import PostDescription from './Components/Pages/PostDescription';
import CreatePost from './Components/Pages/CreatePost';

import { UserProvider } from './Assets/UserContext';


import Main from './Components/Pages/Main';

import Dashboard from './Components/Pages/Dashboard';
import UpdateData from './Components/Pages/UpdateData';

import Lifestyle from './Components/Category Components/Lifestyle';
import Health from './Components/Category Components/Health';
import Entertainment from './Components/Category Components/Entertainment';
import Travel from './Components/Category Components/Travel';
import Technology from './Components/Category Components/Technology';






function App() {
  const router=createBrowserRouter([
    {
    element:<Layout/>,
    errorElement:<ErrorPage/>,

    children:[
      {path:"/" ,element: <Main/>},
      // {path: "login",element: <Login/>},
      // {path: "register",element: <Register/>},
      {path:"/BlogPosts" ,element: <BlogPosts/>},
      {path: "updatedata",element: <UpdateData/>},
      {path:"dashboard",element:<Dashboard/>},
      {path: "createpost",element: <CreatePost/>},
      {path: "authors",element: <Authors/>},
      {path: "postdescription/:id",element: <PostDescription/>},
     
      //footer pages

      {path: "lifestyle",element: <Lifestyle/>},
      {path: "health",element: <Health/>},
      {path: "technology",element: <Technology/>},
      {path: "travel",element: <Travel/>},
      {path: "entertainment",element: <Entertainment/>},
    ]
   
}])
  return (
    <div className="App">
      
      {/* <Main/> */}
      <UserProvider>
     <RouterProvider router={router}/>
      </UserProvider>

    </div>
  );
}

export default App;