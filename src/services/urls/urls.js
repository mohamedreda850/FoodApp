import axios from "axios"


const baseURL = "https://upskilling-egypt.com:3006/api/v1"

export const axiosInstans=axios.create({baseURL })
//USERs urls
export const USERS_URLS={
    LOGIN:`/Users/Login`,
    RESET_REQUEST:`/Users/Reset/Request`,
    FORGET_PASS:`/Users/Reset`,
    GET_USER:(id)=>`/Users/${id}`,
    REGISTER:`/Users/Register`,
}

//categories urls
export const CATEGORIES_URLS={
    CREATE_CATEGORY :(id)=>`/Category${id}`,
    GET_CATEGORIES:`/Category`,
    GET_CATEGORY:(id)=>`/Category/${id}`,
    DELETE_CATEGORY:(id)=>`/Category/${id}`,
    UPDATE_CATEGORY:(id)=>`/Category/${id}`,
}
//recipes urls
export const RECIPES_URLS={
    CREATE_RECIPE:`/Recipe`,
    GET_RECIPES:`/Recip`,
    GET_RECIPE:(id)=>`/Recipe/${id}`,
    DELETE_RECIPE:(id)=>`/Recipe/${id}`,
    UPDATE_RECIPE:(id)=>`/Recipe/${id}`,
}