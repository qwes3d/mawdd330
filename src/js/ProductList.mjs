import { renderListWithTemplate } from "./utils.mjs";

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

    const hasDiscount = product.ListPrice > product.FinalPrice;
    const discountPercent = hasDiscount
      ? Math.round(((product.ListPrice - product.FinalPrice) / product.ListPrice) * 100)
      : 0;

    card.innerHTML = `
      <a href="../product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="Image of ${product.NameWithoutBrand}">
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.NameWithoutBrand}</h3>
        <p class="product-card__price">
          ${hasDiscount ? `<span class="list-price" style="text-decoration: line-through;">₦${product.ListPrice.toFixed(2)}</span>` : ""}
          <span class="final-price" style="font-weight: bold;">₦${product.FinalPrice.toFixed(2)}</span>
          ${hasDiscount ? `<span class="discount" style="color: red;">Save ${discountPercent}%</span>` : ""}
        </p>
      </a>
    `;

    return card;
  }
}
