import React, { useEffect, useState } from "react";
import Header from "../../shared/Components/Header/Header";
import headerImg from "../../../assets/images/UsersListHeaderImg.png";
import {
  axiosInstans,
  FAVORITES_URLS,
  imgBaseUrl,
} from "../../../services/urls/urls";
import NoData from "../../shared/Components/NoData/NoData";
import noDataImg from "./../../../assets/images/noData.png";
import { toast } from "react-toastify";
export default function Favourits() {
  const [favList, setFavList] = useState([]);
  const getFavorite = async () => {
    try {
      const { data } = await axiosInstans.get(FAVORITES_URLS.GET_FAVORITES, {
        headers: {
          Authorization: localStorage.getItem("foodAppToken"),
        },
      });
      console.log(data);
      setFavList(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromFavorite = async (id) => {
    try {
      const { data } = await axiosInstans.delete(
        `${FAVORITES_URLS.DELETE_FAVORITE}${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("foodAppToken"),
          },
        }
      );
      console.log(data);
      toast.success("item removed from favorite");
      getFavorite();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getFavorite();
  }, []);
  return (
    <>
      <Header
        title={`Favorite Items`}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imag={headerImg}
      />
      <div className="container-fluid   mx-4">
        <div className="row  gutter-x-0">
          {favList.length > 0 ? (
            favList.map((item ,idx) => {
              return (
                
                <div key={idx} className="col-sm-12 col-md-6 col-lg-3 p-3 ">
                
                  {item.recipe.imagePath ? (
                    <img
                      className="favImage"
                      src={`${imgBaseUrl}/${item.recipe.imagePath}`}
                    />
                  ) : (
                    <img className="nodataImg" src={noDataImg} />
                  )}
                  <div className="item">
                    <h4 className="my-3">{item.recipe.name}</h4>
                    <div className="d-flex w-100  justify-content-between px-3 ">
                    <p>{item.recipe.description}</p>
                    <i className="fa fa-heart fa-regular fa-2x text-danger" onClick={()=>removeFromFavorite(item.id)}></i>
                    </div>
                  </div>
                
                </div>
              );
            })
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </>
  );
}
