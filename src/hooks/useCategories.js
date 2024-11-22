import React from "react";
import useFetch from "./useFetch";
import { axiosInstans, CATEGORIES_URLS } from "../services/urls/urls";
const getCategories = async () => {
  const response = await axiosInstans.get(CATEGORIES_URLS.GET_CATEGORIES, {
    params: {
      pageSize: 10,
      pageNumber: 1,
    },
    headers: {
      Authorization: localStorage.getItem("foodAppToken"),
    },
  });
  return response;
};
export default function useCategories() {
  const { data, error, isError, isLoading ,trigger } = useFetch(() => getCategories());
  
  return {
    categories: data,
    categoriesError: error,
    categoriesIsError: isError,
    categoriesIsLoading: isLoading,
    triggerCat : trigger
  };
}
