import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="Image of ${product.NameWithoutBrand}">
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.NameWithoutBrand}</h3>
        <p class="product-card__price">₦${product.FinalPrice.toFixed(2)}</p>
      </a>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }

  renderList(productList) {
    this.listElement.innerHTML = ""; // clear any existing content
    productList.forEach(product => {
      const card = this.renderOneProduct(product);
      this.listElement.appendChild(card);
    });
  }
renderOneProduct(product) {
  const card = document.createElement("li");
  card.classList.add("product-card");

  // Discount logic
  const hasDiscount = product.ListPrice > product.FinalPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.ListPrice - product.FinalPrice) / product.ListPrice) * 100)
    : 0;

  card.innerHTML = `
    <a href="../product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="${product.NameWithoutBrand}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">
        ${hasDiscount ? `<span class="list-price">₦${product.ListPrice.toFixed(2)}</span>` : ""}
        <span class="final-price">₦${product.FinalPrice.toFixed(2)}</span>
        ${hasDiscount ? `<span class="discount">Save ${discountPercent}%</span>` : ""}
      </p>
    </a>
  `;

  return card;
}

}

