import React, { useEffect, useState } from "react";
import Header from "../../../shared/Components/Header/Header";
import headerImg from "./../../../../assets/images/UsersListHeaderImg.png";
import noData from "./../../../../assets/images/noData.png";

import { toast } from "react-toastify";
import DeleteConfirmation from "../../../shared/Components/DeleteConfirmation/DeleteConfirmation";
import NoData from "../../../shared/Components/NoData/NoData";
import {
  axiosInstans,
  CATEGORIES_URLS,
  imgBaseUrl,
  RECIPES_URLS,
  TAGS_URLS,
} from "../../../../services/urls/urls";

import { Link } from "react-router-dom";

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [tags, setTags] = useState([]);
  const [nameValue, setNameValue] = useState('')
  const getRecipes = async (pageNo, pageSize ,name) => {
    try {
      const { data } = await axiosInstans.get(RECIPES_URLS.GET_RECIPES, {
        params: {
          pageSize: pageSize,
          pageNumber: pageNo,
          name: name
        },
        headers: {
          Authorization: localStorage.getItem("foodAppToken"),
        },
      });
      console.log(data.data);
      setArrayOfPages(
        Array(data.totalNumberOfPages)
          .fill()
          .map((_, idx) => idx + 1)
      );
      setRecipesList(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  //Delete modale
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
  //end Delete modale
  const getTags = async () => {
    try {
      const { data } = await axiosInstans.get(TAGS_URLS.GET_TAGS);
      console.log(data);

      setTags(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axiosInstans.get(CATEGORIES_URLS.GET_CATEGORIES, {
        params: {
          pageSize: 10,
          pageNumber: 1,
        },
        headers: {
          Authorization: localStorage.getItem("foodAppToken"),
        },
      });
      console.log(data.data);

      setCategoriesList(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getNameValue = async(input)=>{
    setNameValue(input.target.value)
    getRecipes(1,3,input.target.value)
  }
  useEffect(() => {
    getRecipes(1, 3);
    getTags();
    getCategories();
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
        <Link to="/dashboard/recipes/new-recipe" className="btn btn-success">
          Add New Recipe
        </Link>
      </div>
      <div className="p-5">
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Search here"
              className="form-control"
              onChange={getNameValue}
            />
          </div>
          <div className="col-md-3">
            <select className="form-control">
              {tags.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-control">
              {categoriesList.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {recipesList.length > 0 ? (
          <table className="table ">
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
              {recipesList.map((recipe, idx) => (
                <tr key={idx}>
                  <td>{recipe.name}</td>
                  <td>
                    {recipe.imagePath ? (
                      <img
                        className="recipe-img"
                        src={`${imgBaseUrl}/${recipe.imagePath}`}
                      />
                    ) : (
                      <img className="recipe-img" src={noData} />
                    )}
                  </td>
                  <td>{recipe.price}</td>

                  <td>{recipe.description}</td>

                  <td>{recipe?.category[0]?.name}</td>
                  <td>
                    <i
                      className="fa fa-trash mx-3 text-danger "
                      onClick={(_) => handleShow(recipe.id)}
                    ></i>
                    <Link to={`/dashboard/recipes/${recipe.id}`}>
                      <i className="fa fa-edit text-warning"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}{" "}
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {arrayOfPages.map((pageNo, idx) => (
              <li
                key={idx}
                onClick={() => getRecipes(pageNo, 3)}
                className="page-item"
              >
                <a className="page-link" href="#">
                  {pageNo}
                </a>
              </li>
            ))}

            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
