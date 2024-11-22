import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../shared/Components/Header/Header";
import styles from "./RecipeForm.module.css";
import { useForm } from "react-hook-form";
import {
  axiosInstans,
  CATEGORIES_URLS,
  RECIPES_URLS,
  TAGS_URLS,
} from "../../../../services/urls/urls";
import useBeforeUnload from "../../../../hooks/useBeforeUnload";
export default function RecipeForm() {
  const params = useParams();
  const [tags, setTags] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onChange",
  });
  useBeforeUnload()
  const onSubmit = async (data1) => {
    const formData = new FormData();
    formData.append("name", data1?.name);
    formData.append("tagId", data1?.tagId);
    formData.append("price", data1?.price);
    formData.append("categoriesIds", data1?.categoriesIds);
    formData.append("description", data1?.description);
    formData.append("recipeImage", data1?.recipeImage[0]);
    try {
      const { data } = await axiosInstans[params.recipeId ? "put" : "post"](
        params.recipeId
          ? RECIPES_URLS.UPDATE_RECIPE(params.recipeId)
          : RECIPES_URLS.CREATE_RECIPE,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("foodAppToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/dashboard/recipes");
      toast.success("Recipe is added sucsessfuly");
    } catch (error) {
      console.log(error);
    }
  };
  const getTags = async () => {
    try {
      const { data } = await axiosInstans.get(TAGS_URLS.GET_TAGS);
      setTags(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axiosInstans.get(CATEGORIES_URLS.GET_CATEGORIES, {
        params: {
          pageSize: 50,
          pageNumber: 1,
        },
        headers: {
          Authorization: localStorage.getItem("foodAppToken"),
        },
      });

      setCategoriesList(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const gitRecipe = async () => {
    const { data } = await axiosInstans.get(
      RECIPES_URLS.GET_RECIPE(params.recipeId),
      {
        headers: {
          Authorization: localStorage.getItem("foodAppToken"),
        },
      }
    );

    setValue("name", data?.name);
    setValue("description", data?.description);
    setValue("price", data?.price);
    setValue("tagId", data?.tag?.id);
    setValue("categoriesIds", data?.category[0]?.id);
  };

  useEffect(() => {
    (async () => {
      await getCategories();
      await getTags();
      if (params.recipeId) {
        await gitRecipe();
      }
    })();
  }, []);
 
  return (
    <main>
      <header className={styles["header-wrapper"]}>
        <div className={styles["conten-wrapper"]}>
          <h3>{params.recipeId ? "Edit the Recipes" : "Fill the Recipes"} !</h3>
          <p>
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </p>
        </div>
        <Link to={"/dashboard/recipes/"} className={styles["btn-primary"]}>
          All Recipe{" "}
          <svg
            width="18"
            height="15"
            viewBox="0 0 18 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.9927 7.70752C17.9927 8.01676 17.8783 8.28271 17.6494 8.50537L11.5542 14.5913C11.4367 14.7088 11.313 14.7954 11.1831 14.8511C11.0532 14.9067 10.9202 14.9346 10.7842 14.9346C10.4749 14.9346 10.2214 14.8356 10.0234 14.6377C9.82552 14.446 9.72656 14.2048 9.72656 13.9141C9.72656 13.7656 9.75749 13.6265 9.81934 13.4966C9.875 13.3667 9.95231 13.2523 10.0513 13.1533L12.1294 11.0566L15.5156 7.94873L15.8867 8.58887L12.6118 8.78369H1.46045C1.13883 8.78369 0.879069 8.68473 0.681152 8.48682C0.477051 8.2889 0.375 8.02913 0.375 7.70752C0.375 7.39209 0.477051 7.13542 0.681152 6.9375C0.879069 6.73958 1.13883 6.64063 1.46045 6.64063L12.6118 6.64062L15.8867 6.83545L15.5156 7.46631L12.1294 4.36768L10.0513 2.271C9.95231 2.17204 9.875 2.05762 9.81934 1.92773C9.75749 1.79785 9.72656 1.65869 9.72656 1.51025C9.72656 1.21956 9.82552 0.978353 10.0234 0.786621C10.2214 0.588704 10.4749 0.489746 10.7842 0.489746C11.0625 0.489746 11.3161 0.601074 11.5449 0.82373L17.6494 6.91895C17.8783 7.13542 17.9927 7.39827 17.9927 7.70752Z"
              fill="white"
            />
          </svg>
        </Link>
      </header>
      <div>
        <form
          className={styles["form-wrapper"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles["input-wrapper"]}>
            <input
              type="text"
              className="form-control "
              placeholder="Recipe Name"
              aria-label="name"
              aria-describedby="basic-addon1"
              {...register("name", {
                required: "Recipe Name is required",
              })}
            />
          </div>
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
          <div className={styles["input-wrapper"]}>
            <select
              {...register("tagId", { required: "tagid is required" })}
              className="form-control"
            >
              {tags.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          {errors.tagid && (
            <span className="text-danger">{errors.tagid.message}</span>
          )}

          <div className={styles["input-wrapper"]}>
            <input
              type="number"
              className="form-control "
              placeholder="Recipe Price"
              aria-label="RecipePrice"
              aria-describedby="basic-addon1"
              {...register("price", {
                required: "Recipe Price is required",
                min: 0,
              })}
            />
          </div>
          {errors.price && (
            <span className="text-danger">{errors.price.message}</span>
          )}

          <div className={styles["input-wrapper"]}>
            <select
              type="text"
              className="form-control "
              placeholder="Categories Ids"
              aria-label="categoriesIds"
              aria-describedby="basic-addon1"
              {...register("categoriesIds")}
            >
              {categoriesList.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          {errors.categoriesIds && (
            <span className="text-danger">{errors.categoriesIds.message}</span>
          )}
          <div className={styles["input-wrapper"]}>
            <textarea
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
          <div className={styles["input-wrapper"]}>
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
          <div className={styles["action-wrapper"]}>
            {" "}
            <Link to="/dashboard/recipes" className={styles["link-cnasel-btn"]}>
              Cancle
            </Link>
            <button
              disabled={isSubmitting}
              type="submit"
              className={styles["btn-primary"]}
            >
              {isSubmitting ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "save"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
