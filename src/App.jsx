import { useEffect, useState } from "react";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./modules/authentication/AuthLayout/AuthLayout";
import NotFound from "./modules/shared/Components/NotFound/NotFound";
import Registeration from "./modules/authentication/Components/Registeration/Registeration";
import Login from "./modules/authentication/Components/Login/Login";
import ForgetPass from "./modules/authentication/Components/ForgetPass/ForgetPass";
import ResetPass from "./modules/authentication/Components/ResetPass/ResetPass";
import MainLayout from "./modules/shared/MainLayout/MainLayout";
import RecipesList from "./modules/recipes/Components/RecipesList/RecipesList";
import RecipeData from "./modules/recipes/Components/RecipeData/RecipeData";
import CategoriesList from "./modules/categories/Components/CategoriesList/CategoriesList";
import CategoryData from "./modules/categories/Components/CategoryData/CategoryData";
import UsersList from "./modules/users/Components/UsersList/UsersList";
import ChangePass from "./modules/authentication/Components/ChangePass/ChangePass";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";
import Dashboard from "./modules/shared/Components/Dashboard/Dashboard";
import ProtectedRoute from "./modules/shared/Components/ProtectedRoute/ProtectedRoute";

function App() {
  const [loginData, setLoginData] = useState(null)
  let saveLoginData = () => {
    let decodedToken  = localStorage.getItem("foodAppToken");
    let encodedToken = jwtDecode(decodedToken);
    setLoginData(encodedToken);
    console.log(loginData);
    
  }
  useEffect(()=>{
    if(localStorage.getItem("foodAppToken")){
      saveLoginData()
    }
   
    },[])
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Registeration />,
        },
        {
          path: "register",
          element: <Registeration />,
        },
        {
          path: "login",
          element: <Login saveLoginData={saveLoginData}/>,
        },
        {
          path: "forget-password",
          element: <ForgetPass />,
        },
        {
          path: "reset-password",
          element: <ResetPass />,
        },
      ],
    },
    {
      path: "dashboard",
      element:<ProtectedRoute loginData={loginData}><MainLayout loginData={loginData}/></ProtectedRoute> ,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Dashboard loginData={loginData}/>,
        },
        {
          path: "recipes",
          element: <RecipesList />,
        },
        {
          path: "recipe-data",
          element: <RecipeData />,
        },
        {
          path: "categories",
          element: <CategoriesList />,
        },
        {
          path: "category-data",
          element: <CategoryData />,
        },
        {
          path: "users",
          element: <UsersList />,
        },
        {
          path:"change-password",
          element:<ChangePass/>
        }
      ],
    },
  ]);

  return <>
  <ToastContainer />
  <RouterProvider router={routes}></RouterProvider>
  </>;
}

export default App;
