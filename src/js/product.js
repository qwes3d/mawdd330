// product.js
import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

const productId = getParam('product'); // e.g. "880RR"
const dataSource = new ProductData('tents');

dataSource.findProductById(productId).then((product) => {
  if (product) {
    renderProductDetails(product); // Make sure this is a function or call ProductDetails.render(product)
  } else { 
    document.getElementById("product-detail").textContent = "Product not found.";
  }
}).catch((err) => {
  console.error("Error loading product:", err);
  document.getElementById("product-detail").textContent = "There was an error loading the product.";
});
