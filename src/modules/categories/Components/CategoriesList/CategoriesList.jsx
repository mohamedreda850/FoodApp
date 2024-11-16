import React, { useEffect, useState } from "react";
import Header from "../../../shared/Components/Header/Header";
import headerImg from "./../../../../assets/images/UsersListHeaderImg.png";
import axios from "axios";

import { toast } from "react-toastify";
import DeleteConfirmation from "../../../shared/Components/DeleteConfirmation/DeleteConfirmation";
import NoData from "../../../shared/Components/NoData/NoData";
import { axiosInstans, CATEGORIES_URLS } from "../../../../services/urls/urls";

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const getCategories = async () => {
    try {
      const { data } = await axiosInstans.get(
        CATEGORIES_URLS.GET_CATEGORIES,
        {
          params:{
            pageSize:10,pageNumber:1
          },
          headers: {
            Authorization: localStorage.getItem("foodAppToken"),
          },
        }
      );
      console.log(data.data);
      setCategoriesList(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [show, setShow] = useState(false);

  const [selectedId, setSelectedId] = useState(0);
  const handleClose = () => setShow(false);
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
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };
  useEffect(() => {
    getCategories();
  }, []);
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

      <div className="d-flex justify-content-between px-5">
        <h5>Categories Table Details</h5>
        <button className="btn btn-success">Add New Category</button>
      </div>
      <div className="p-5">
      {categoriesList.length> 0?<table className="table ">
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
