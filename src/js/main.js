
import ProductData from "./productData.js";
import ProductList from "./ProductList.mjs";

console.log("main.js loaded");

const dataSource = new ProductData("tents"); // category = "tents"
const element = document.querySelector(".product-list"); // this must exist in your HTML!

const tentList = new ProductList("tents", dataSource, element);
tentList.init(); // <- make sure this line exists!
