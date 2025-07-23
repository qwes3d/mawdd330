import Alert from './js/alert.js';

import ProductData from "./productData.js";
import ProductList from "./ProductList.mjs";


console.log("main.js loaded");

const dataSource = new ProductData("tents"); // category = "tents"
const element = document.querySelector(".product-list"); // this must exist in your HTML!

const tentList = new ProductList("tents", dataSource, element);
tentList.init(); // <- make sure this line exists!

// Load templates and initialize page
document.addEventListener('DOMContentLoaded', async () => {
  await loadHeaderFooter();
  
  // Initialize alert system
  const alertSystem = new Alert();
  alertSystem.showAlerts();
  
  // Other page-specific initialization
});
