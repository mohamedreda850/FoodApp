import React, { useState } from "react";
import useFetch from "./useFetch";
import { axiosInstans, CATEGORIES_URLS } from "../services/urls/urls";
import { set } from "react-hook-form";

export default function useCategories() {
 const [searchName, setSearchNameName] = useState()
const [pageNumber, setpageNumber] = useState(0)
 const [arrayOfPages, setArrayOfPages] = useState([]);
 const getCategories = async ( name ) => {
  const response = await axiosInstans.get(CATEGORIES_URLS.GET_CATEGORIES, {
    params: {
      pageSize: 5,
      pageNumber: pageNumber,
      name : name
    },
    headers: {
      Authorization: localStorage.getItem("foodAppToken"),
    },
  });
  setArrayOfPages(
    Array(response.data.totalNumberOfPages)
      .fill()
      .map((_, idx) => idx + 1)
  );
  return response;
};
  const setName = (name) => {
    setSearchNameName(name)
  console.log('Name received:', name);
  // Perform actions with the input value
};
  const { data, error, isError, isLoading ,trigger } = useFetch(() => getCategories(searchName));
  
  return {
    categories: data,
    categoriesError: error,
    categoriesIsError: isError,
    categoriesIsLoading: isLoading,
    triggerCat : trigger,
    setName,
    arrayOfPages,
    setpageNumber,
    pageNumber
  };
}
