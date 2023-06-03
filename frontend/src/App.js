import{RouterProvider,Outlet, createBrowserRouter} from "react-router-dom";
import WriteProject from "./pages/write_project";
import Error404 from "./pages/error404";
import Home from "./pages/home";
import Login from "./pages/login";
import Projects from "./pages/projects";
import Register from "./pages/register";
import SingleProject from "./pages/single_project";
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