import{RouterProvider,Outlet, createBrowserRouter,Navigate} from "react-router-dom";
import WriteProject from "./pages/write_project/Write_Project";
// import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Projects from "./pages/projects/Projects";
import Register from "./pages/auth/Register";
import SingleProject from "./pages/single_project/Single_Project";
import {NavBar,Footer} from "./components";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const App=()=>{ 

const {getCurrentUser}=useContext(AuthContext);
const Layout=()=>{
    
    return(
        <>
            <NavBar />
            <Outlet />
            <Footer />
        
        </>
    )
}

const router=createBrowserRouter([
    {
        // path:"/",
        element:<Layout />,
        children:[
            {
                path:"/projects",
                element:<Projects/>
            },
            {
                path:"/project/:id",
                element:<SingleProject/>
            },
            {
                path:"/write-project",
                element:<WriteProject/>
            },
            {
                path:"/register",
                element:getCurrentUser?<Navigate to="/" replace />:<Register/>
            },
            {
                path:"/login",
                element:getCurrentUser?<Navigate to="/" replace />:<Login/>
            },
            
        ]
    },
    {
        path:"/",
        element:<Home/>
    },
    // {
    //     path:"*",
    //     element:<Error404/>
    // }
    
])

    return(
        <div className="App">
            <div className="App">
                <RouterProvider router={router}/>
            </div>
        </div>
    )
}

export default App;