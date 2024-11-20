import React, { useEffect, useState } from "react";
import Header from "../../../shared/Components/Header/Header";
import headerImg from "./../../../../assets/images/UsersListHeaderImg.png";
import noData from "./../../../../assets/images/noData.png";

import { toast } from "react-toastify";
import DeleteConfirmation from "../../../shared/Components/DeleteConfirmation/DeleteConfirmation";
import NoData from "../../../shared/Components/NoData/NoData";
import {
  axiosInstans,
  imgBaseUrl,
  RECIPES_URLS,
} from "../../../../services/urls/urls";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function RecipesList() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      categoriesIds: 0,
    },
  });
  const [recipesList, setRecipesList] = useState([]);
  const [selectedrecipe, setSelectedrecipe] = useState(null);
  const getRecipes = async () => {
    try {
      const { data } = await axiosInstans.get(RECIPES_URLS.GET_RECIPES, {
        params: {
          pageSize: 10,
          pageNumber: 1,
        },
        headers: {
          Authorization: localStorage.getItem("foodAppToken"),
        },
      });
      console.log(data.data);
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

  //modal for add new recipe

  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => {
    setShowAdd(true);
    reset();
  };
  const handleCloseAdd = () => setShowAdd(false);

  const onSubmitAdd = async (data1) => {
    try {
      const formData = new FormData();

      formData.append("name", data1.name);
      formData.append("price", data1.price);
      formData.append("description", data1.description);

      formData.append("categoriesIds", data1.categoriesIds);
      formData.append("tagId", data1.tagId);

      formData.append("recipeImage", data1.recipeImage[0]);
      const { data } = await axiosInstans.post(
        RECIPES_URLS.CREATE_RECIPE,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("foodAppToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);

      toast.success("Recipe is added sucsessfuly");
      getRecipes();
      handleCloseAdd();
    } catch (error) {
      console.log(error);
    }
  };

  // Modal for edit recipe
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = (id) => {
    setSelectedId(id);
    const recipe = recipesList.find((rec) => rec.id === id);
    setSelectedrecipe(recipe);

    setShowEdit(true);
  };
  const handleCloseEdit = () => setShowEdit(false);
  const onSubmitEdit = async (data1) => {
    try {
      const formData = new FormData();

      formData.append("name", data1.name);
      formData.append("price", data1.price);
      formData.append("description", data1.description);

      formData.append("categoriesIds", data1.categoriesIds);
      formData.append("tagId", data1.tagId);

      formData.append("recipeImage", data1.recipeImage[0]);
      const { data } = await axiosInstans.put(
        RECIPES_URLS.UPDATE_RECIPE(selectedId),
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("foodAppToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);

      toast.success("Recipe is updated sucsessfuly");
      getRecipes();
      handleCloseAdd();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRecipes();
  }, []);
  useEffect(() => {
    setValue("name", selectedrecipe?.name);
    setValue("description", selectedrecipe?.description);
    setValue("price", selectedrecipe?.price);
    setValue("tagId", selectedrecipe?.tag?.id);
    setValue("categoriesIds", selectedrecipe?.category[0]?.id);
  }, [selectedrecipe]);
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
      <Modal show={showAdd} onHide={handleCloseAdd} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Recipe </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmitAdd)}>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control "
                placeholder="Category Name"
                aria-label="name"
                aria-describedby="basic-addon1"
                {...register("name", {
                  required: "Category Name is required",
                })}
              />
            </div>
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}

            <div className="input-group my-3">
              <input
                type="text"
                className="form-control "
                placeholder="Recipe description"
                aria-label="RecipeDescription"
                aria-describedby="basic-addon1"
                {...register("description", {
                  required: "Recipe description is required",
                })}
              />
            </div>
            {errors.description && (
              <span className="text-danger">{errors.description.message}</span>
            )}
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control "
                placeholder="Recipe Price"
                aria-label="RecipePrice"
                aria-describedby="basic-addon1"
                {...register("price", {
                  required: "Recipe Price is required",
                })}
              />
            </div>
            {errors.price && (
              <span className="text-danger">{errors.price.message}</span>
            )}
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control "
                placeholder="tagid"
                aria-label="tagid"
                aria-describedby="basic-addon1"
                {...register("tagId", { required: "tagid is required" })}
              />
            </div>
            {errors.tagid && (
              <span className="text-danger">{errors.tagid.message}</span>
            )}
            <div className="input-group my-3">
              <input
                type="file"
                className="form-control "
                placeholder="Recipe Image"
                aria-label="recipeImage"
                aria-describedby="basic-addon1"
                accept="image/*"
                {...register("recipeImage")}
              />
            </div>
            {errors.recipeImage && (
              <span className="text-danger">{errors.recipeImage.message}</span>
            )}
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control "
                placeholder="Categories Ids"
                aria-label="categoriesIds"
                aria-describedby="basic-addon1"
                {...register("categoriesIds")}
              />
            </div>
            {errors.categoriesIds && (
              <span className="text-danger">
                {errors.categoriesIds.message}
              </span>
            )}
            <button disabled={isSubmitting} type="submit" className="btn-success w-100 btn my-2">
              {isSubmitting ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "save"
              )}
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={showEdit} onHide={handleCloseEdit} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmitEdit)}>
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control "
                placeholder="Category Name"
                aria-label="name"
                aria-describedby="basic-addon1"
                {...register("name", {
                  required: "Category Name is required",
                })}
              />
            </div>
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}

            <div className="input-group my-3">
              <input
                type="text"
                className="form-control "
                placeholder="Recipe description"
                aria-label="RecipeDescription"
                aria-describedby="basic-addon1"
                {...register("description", {
                  required: "Recipe description is required",
                })}
              />
            </div>
            {errors.description && (
              <span className="text-danger">{errors.description.message}</span>
            )}
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control "
                placeholder="Recipe Price"
                aria-label="RecipePrice"
                aria-describedby="basic-addon1"
                {...register("price", {
                  required: "Recipe Price is required",
                })}
              />
            </div>
            {errors.price && (
              <span className="text-danger">{errors.price.message}</span>
            )}
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control "
                placeholder="tagid"
                aria-label="tagid"
                aria-describedby="basic-addon1"
                {...register("tagId", { required: "tagid is required" })}
              />
            </div>
            {errors.tagid && (
              <span className="text-danger">{errors.tagid.message}</span>
            )}
            <div className="input-group my-3">
              <input
                type="file"
                className="form-control "
                placeholder="Recipe Image"
                aria-label="recipeImage"
                aria-describedby="basic-addon1"
                accept="image/*"
                {...register("recipeImage")}
              />
            </div>
            {errors.recipeImage && (
              <span className="text-danger">{errors.recipeImage.message}</span>
            )}
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control "
                placeholder="Categories Ids"
                aria-label="categoriesIds"
                aria-describedby="basic-addon1"
                {...register("categoriesIds")}
              />
            </div>
            {errors.categoriesIds && (
              <span className="text-danger">
                {errors.categoriesIds.message}
              </span>
            )}
            <button disabled={isSubmitting} type="submit" className="btn-success w-100 btn my-2">
              {isSubmitting ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Update"
              )}
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <div className="d-flex justify-content-between px-5">
        <h5>Recipe Table Details</h5>
        <button onClick={handleShowAdd} className="btn btn-success">
          Add New Recipe
        </button>
      </div>
      <div className="p-5">
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
                    <i
                      className="fa fa-edit text-warning"
                      onClick={() => handleShowEdit(recipe.id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
