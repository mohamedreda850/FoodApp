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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./modules/shared/Components/Dashboard/Dashboard";
import ProtectedRoute from "./modules/shared/Components/ProtectedRoute/ProtectedRoute";
import RecipeForm from "./modules/recipes/Components/RecipeForm/RecipeForm";
import Favourits from "./modules/Favourits/components/Favourits";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import AdminProtectedRoute from "./modules/shared/Components/AdminProtectedRoute/AdminProtectedRoute";
import UserProtectedRoute from "./modules/shared/Components/UserProtectedRoute/UserProtectedRoute";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import VerifyAccount from "./modules/authentication/Components/VerifyAccount/VerifyAccount";

function App() {
  const { loginData,  } = useContext(AuthContext);

  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "register",
          element: <Registeration />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forget-password",
          element: <ForgetPass />,
        },
        {
          path: "reset-password",
          element: <ResetPass />,
        },
        {
          path:'verfy-password',
          element: <VerifyAccount/>
        }
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute loginData={loginData}>
          <MainLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "recipes",
          element: <RecipesList />,
        },
        {
          path: "recipes/new-recipe",
          element: (
            <AdminProtectedRoute>
              {" "}
              <RecipeForm />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "recipes/:recipeId",
          element: (
            <AdminProtectedRoute>
              {" "}
              <RecipeForm />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "recipe-data",
          element: <RecipeData />,
        },
        {
          path: "categories",
          element: (
            <AdminProtectedRoute>
              {" "}
              <CategoriesList />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "category-data",
          element: <CategoryData />,
        },
        {
          path: "users",
          element: (
            <AdminProtectedRoute>
              <UsersList />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "change-password",
          element: <ChangePass />,
        },
        {
          path: "favorites",
          element: (
            <UserProtectedRoute>
              {" "}
              <Favourits />
            </UserProtectedRoute>
          ),
        },
      ],
    },
  ]);


  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}>
       
      </RouterProvider>
    </>
  );
}

export default App;
