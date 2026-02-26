import { fetchAPI } from "./client";

/* ----------------------------
   GET ALL PRODUCTS
-----------------------------*/
export const getAllProducts = () =>
    fetchAPI("/product/?skip=0&limit=100");

/* ----------------------------
   GET PRODUCT BY ID
-----------------------------*/
export const getProductById = (id: number) =>
    fetchAPI(`/product/${id}`);
