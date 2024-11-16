
import React, { useEffect, useState } from "react";
import Header from "../../../shared/Components/Header/Header";
import headerImg from "./../../../../assets/images/UsersListHeaderImg.png";
import axios from "axios";

import { toast } from "react-toastify";
import DeleteConfirmation from "../../../shared/Components/DeleteConfirmation/DeleteConfirmation";
import NoData from "../../../shared/Components/NoData/NoData";
import { axiosInstans, RECIPES_URLS } from "../../../../services/urls/urls";

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const getRecipes = async () => {
    try {
      const { data } = await axiosInstans.get(
       RECIPES_URLS.GET_RECIPES,
        { params:{
          pageSize:10,pageNumber:1
        },
          headers: {
            Authorization: localStorage.getItem("foodAppToken"),
          },
        }
      );
      console.log(data.data);
      setRecipesList(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [show, setShow] = useState(false);

  const [selectedId, setSelectedId] = useState(0);
  const handleClose = () => setShow(false);
  const deleteRecipe = async () => {
    try {
      const { data } = await axiosInstans.delete(
        RECIPES_URLS.DELETE_RECIPE(selectedId),
        {
          headers: {
            Authorization: localStorage.getItem("foodAppToken"),
          },
        }
      );
      console.log(data);
      toast.success("Recipe is deleted sucsessfuly");
      getRecipes();
    } catch (error) {
      console.log(error);
      
    }

    handleClose();
  };
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };
  useEffect(() => {
    getRecipes();
  }, []);
  return (
    <>
      <Header
        title={"Recipes Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imag={headerImg}
      />

      <DeleteConfirmation
        deleteItem={"Recipes"}
        deleteFunc={deleteRecipe}
        show={show}
        handleClose={handleClose}
      />

      <div className="d-flex justify-content-between px-5">
        <h5>Recipe Table Details</h5>
        <button className="btn btn-success">Add New Recipe</button>
      </div>
      <div className="p-5">
        {recipesList.length>0?<table className="table ">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              
              <th scope="col">Category</th>
              <th scope="col">Actions</th>

            </tr>
          </thead>
          <tbody>
            { recipesList.map((recipe, idx) => (
              <tr key={idx}>
                <td>{recipe.name}</td>
                <td>{recipe.imagePath}</td>
                <td>{recipe.price}</td>
                
                <td>{recipe.description}</td>

                <td>{recipe.category}</td>
                <td>
                  <i
                    className="fa fa-trash mx-3 text-danger "
                    onClick={(_) => handleShow(recipe.id)}
                  ></i>
                  <i className="fa fa-edit text-warning"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>:<NoData/>}
      </div>
    </>
  );
}
