import React, { useEffect, useState } from "react";
import Header from "../../../shared/Components/Header/Header";
import headerImg from "./../../../../assets/images/UsersListHeaderImg.png";

import { toast } from "react-toastify";
import DeleteConfirmation from "../../../shared/Components/DeleteConfirmation/DeleteConfirmation";
import NoData from "../../../shared/Components/NoData/NoData";
import { axiosInstans, CATEGORIES_URLS } from "../../../../services/urls/urls";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const {
    register,
    formState: { errors , isSubmitting},
    handleSubmit,
    setValue,
  } = useForm({ defaultValues: { name: "" } });

  const [selectedCategory, setSelectedCategory] = useState(null);
  //modal for delete category
  const [show, setShow] = useState(false);
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  //modal for add new category
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => setShowAdd(false);
  const onSubmitAdd = async (data1) => {
    try {
      const { data } = await axiosInstans.post(
        CATEGORIES_URLS.CREATE_CATEGORY,
        data1,
        {
          headers: {
            Authorization: localStorage.getItem("foodAppToken"),
          },
        }
      );
      console.log(data.data);
      getCategories();
      toast.success("category is added sucsessfuly");
      setShowAdd(false);
    } catch (error) {
      console.log(error);
    }
  };
  // Modal for edit category

  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = (id) => {
    setSelectedId(id);
    const category = categoriesList.find((cat) => cat.id === id);
    setSelectedCategory(category);

    setShowEdit(true);
  };
  const handleCloseEdit = () => setShowEdit(false);
  const onSubmitEdit = async (data1) => {
    try {
      const { data } = await axiosInstans.put(
        CATEGORIES_URLS.UPDATE_CATEGORY(selectedId),
        data1,
        {
          headers: {
            Authorization: localStorage.getItem("foodAppToken"),
          },
        }
      );

      getCategories();
      toast.success("category is edited sucsessfuly");

      setShowEdit(false);
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

  const [selectedId, setSelectedId] = useState(0);

  const deleteCategory = async () => {
    try {
      const { data } = await axiosInstans.delete(
        CATEGORIES_URLS.DELETE_CATEGORY(selectedId),
        {
          headers: {
            Authorization: localStorage.getItem("foodAppToken"),
          },
        }
      );
      console.log(data);
      toast.success("category is deleted sucsessfuly");
      getCategories();
    } catch (error) {
      error;
    }

    handleClose();
  };

  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    setValue("name", selectedCategory?.name);
  }, [selectedCategory]);
  return (
    <>
      <Header
        title={"Category Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imag={headerImg}
      />

      <DeleteConfirmation
        deleteItem={"category"}
        deleteFunc={deleteCategory}
        show={show}
        handleClose={handleClose}
      />
      <Modal show={showAdd} onHide={handleCloseAdd} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category </Modal.Title>
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
                {...register("name", { required: "Category Name is required" })}
              />
            </div>
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}

            <button
              disabled={isSubmitting}
              type="submit"
              className="btn-success w-100 btn my-2"
            >
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
          <Modal.Title>Edit Category </Modal.Title>
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
                {...register("name", { required: "Category Name is required" })}
              />
            </div>
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}

            <button
              disabled={isSubmitting}
              type="submit"
              className="btn-success w-100 btn my-2"
            >
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
        <h5>Categories Table Details</h5>
        <button onClick={handleShowAdd} className="btn btn-success">
          Add New Category
        </button>
      </div>
      <div className="p-5">
        {categoriesList.length > 0 ? (
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Creation Data</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((category, idx) => (
                <tr key={idx}>
                  <td>{category.name}</td>
                  <td>{category.creationDate}</td>
                  <td>
                    <i
                      className="fa fa-trash mx-3 text-danger "
                      onClick={(_) => handleShow(category.id)}
                    ></i>
                    <i
                      className="fa fa-edit text-warning"
                      onClick={(_) => handleShowEdit(category.id)}
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
