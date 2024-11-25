import React, { useEffect, useState } from "react";
import Header from "../../../shared/Components/Header/Header";
import headerImg from "./../../../../assets/images/UsersListHeaderImg.png";
import {
  axiosInstans,
  imgBaseUrl,
  USERS_URLS,
} from "../../../../services/urls/urls";
import noData from "./../../../../assets/images/noData.png";
import NoData from "../../../shared/Components/NoData/NoData";
import DeleteConfirmation from "../../../shared/Components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";

export default function UsersList() {
  const [userslist, setUserslist] = useState([]);
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [groubValue , setGroubValue] = useState("");
  const getUsers = async (pageNo, pageSize, userName , groups) => {
    try {
      let response = await axiosInstans.get(USERS_URLS.GET_USERS_LIST, {
        params: {
          pageSize: pageSize,
          pageNumber: pageNo,
          userName: userName,
          groups: groups,
        },
        headers: {
          Authorization: localStorage.getItem("foodAppToken"),
        },
      });
      console.log(response.data.data);
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, idx) => idx + 1)
      );
      setUserslist(response.data.data);
    } catch (error) {}
  };

  //Delete modale
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const handleClose = () => setShow(false);
  const deleteUser = async () => {
    try {
      const { data } = await axiosInstans.delete(
        USERS_URLS.DELETE_USER(selectedId),
        {
          headers: {
            Authorization: localStorage.getItem("foodAppToken"),
          },
        }
      );

      toast.success("User is deleted sucsessfuly");
      getUsers();
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
  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getUsers(1, 30, input.target.value, groubValue);
  };
  const getGroubValue = (input) => {
    setGroubValue(input.target.value);
    getUsers(1, 30, nameValue, input.target.value);
  };
  useEffect(() => {
    getUsers(1, 30);
  }, []);
  return (
    <>
      <Header
        title={"Users List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imag={headerImg}
      />
      <DeleteConfirmation
        deleteItem={"User"}
        deleteFunc={deleteUser}
        show={show}
        handleClose={handleClose}
      />
      <div className="d-flex justify-content-between px-5">
        <h5>Users Table Details</h5>
      </div>

      <div className="p-5">
        <div className="row mb-3">
          <div className="col-md-8">
            <input
              type="text"
              placeholder="Search here"
              className="form-control"
              onChange={getNameValue}
            />
          </div>
          <div className="col-md-4">
            <select className="form-control" onChange={getGroubValue}>
              
              <option value={1}>admin</option>

              <option value={2}>user</option>
            </select>
          </div>
        </div>
        {userslist.length > 0 ? (
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Phone number</th>
                <th scope="col">Email</th>

                <th scope="col">Country</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userslist.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.userName}</td>
                  <td>
                    {user.imagePath ? (
                      <img
                        className="recipe-img"
                        src={`${imgBaseUrl}/${user.imagePath}`}
                      />
                    ) : (
                      <img className="recipe-img" src={noData} />
                    )}
                  </td>
                  <td>{user.phoneNumber}</td>

                  <td>{user.email}</td>

                  <td>{user.country}</td>
                  <td>
                    <i
                      className="fa fa-trash text-danger "
                      onClick={(_) => handleShow(user.id)}
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
            
            {arrayOfPages.map((pageNo, idx) => (
              <li
                key={idx}
                onClick={() => getUsers(pageNo, 30)}
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
