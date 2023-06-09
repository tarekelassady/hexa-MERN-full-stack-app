import{RouterProvider,Outlet, createBrowserRouter} from "react-router-dom";
import WriteProject from "./pages/write_project/Write_Project";
import Error404 from "./pages/error404";
import Home from "./pages/home";
import Login from "./pages/auth/Login";
import Projects from "./pages/projects/Projects";
import Register from "./pages/auth/Register";
import SingleProject from "./pages/single_project/Single_Project";
import {NavBar,Footer} from "./components";
import "./App.css";

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
                element:<Register/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            
        ]
    },
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"*",
        element:<Error404/>
    }
    
])
const App=()=>{ 

    return(
        <div className="App">
            <div className="App">
                <RouterProvider router={router}/>
            </div>
        </div>
    )
}

export default App;