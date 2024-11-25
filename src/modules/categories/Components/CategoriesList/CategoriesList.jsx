import React, { useEffect, useState } from "react";
import Header from "../../../shared/Components/Header/Header";
import headerImg from "./../../../../assets/images/UsersListHeaderImg.png";

import { toast } from "react-toastify";
import DeleteConfirmation from "../../../shared/Components/DeleteConfirmation/DeleteConfirmation";
import NoData from "../../../shared/Components/NoData/NoData";
import { axiosInstans, CATEGORIES_URLS } from "../../../../services/urls/urls";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useCategories from "./../../../../hooks/useCategories";

export default function CategoriesList() {
  const categoriesQuairy = useCategories();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    reset,
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
  const handleShowAdd = () => {
    setShowAdd(true);
    reset();
  };
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
      categoriesQuairy.triggerCat();
      toast.success("category is added sucsessfuly");
      setShowAdd(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = (id) => {
    setSelectedId(id);
    const category = categoriesQuairy?.categories?.data?.find(
      (cat) => cat.id === id
    );
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

      categoriesQuairy.triggerCat();
      toast.success("category is edited sucsessfuly");

      setShowEdit(false);
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
      categoriesQuairy.triggerCat();
    } catch (error) {
      error;
    }

    handleClose();
  };
  const getNameValue = async (input) => {
    categoriesQuairy.setName(input.target.value);
    categoriesQuairy.triggerCat();
  };

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
        <div className="row mb-3">
          <div className="col-md-10">
            <input
              type="text"
              placeholder="Search here"
              className="form-control"
              onChange={getNameValue}
            />
          </div>
        </div>
        {categoriesQuairy?.categories?.data?.length > 0 ? (
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Creation Data</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoriesQuairy?.categories?.data?.map((category, idx) => (
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
        <nav aria-label="Page navigation example">
          <ul className="pagination">
           
            {categoriesQuairy.arrayOfPages.map((pageNo, idx) => (
              <li
                key={idx}
                onClick={() => {
                  categoriesQuairy.setpageNumber(pageNo);
                  categoriesQuairy.triggerCat();
                }}
                className="page-item"
              >
                <a className="page-link" href="#">
                  {pageNo}
                </a>
              </li>
            ))}

          
          </ul>
        </nav>
      </div>
    </>
  );
}
