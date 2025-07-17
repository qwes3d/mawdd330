import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    if (!this.product) {
      console.error("Product not found for ID:", this.productId);
      alert("Product not found. Please try again.");
      return;
    }

    this.renderProductDetails();

    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    this.addProductToCart(this.product);
  }

  addProductToCart(product) {
    let cartItems = getLocalStorage("so-cart");

    if (!Array.isArray(cartItems)) {
      if (cartItems && typeof cartItems === 'object') {
        cartItems = [cartItems];
      } else {
        cartItems = [];
      }
    }

    cartItems.push(product);
    setLocalStorage("so-cart", cartItems);
    alert('Product added to cart!');
  }

  renderProductDetails() {
    const brandName = this.product.Brand?.Name || '';
    const name = this.product.NameWithoutBrand || this.product.Name || '';
    const imageSrc = this.product.Image || '';
    const imageAlt = this.product.Name || '';
    const color = this.product.Colors?.[0]?.ColorName || '';
    const description = this.product.DescriptionHtmlSimple || '';

    const listPrice = this.product.ListPrice;
    const finalPrice = this.product.FinalPrice;

    document.querySelector(".product-detail h3").textContent = brandName;
    document.querySelector(".divider h2").textContent = name;
    document.querySelector(".divider img").src = imageSrc;
    document.querySelector(".divider img").alt = imageAlt;
    document.querySelector(".product__color").textContent = color;
    document.querySelector(".product__description").innerHTML = description;
    document.querySelector("#addToCart").dataset.id = this.product.Id;

    const priceContainer = document.querySelector(".product-card__price");
    priceContainer.innerHTML = `$${finalPrice.toFixed(2)}`;

    // 💸 Add original price (ListPrice) if discounted
    if (listPrice > finalPrice) {
      const originalPriceEl = document.createElement("span");
      originalPriceEl.classList.add("list-price");
      originalPriceEl.style.textDecoration = "line-through";
      originalPriceEl.style.marginLeft = "1rem";
      originalPriceEl.style.color = "#888";
      originalPriceEl.textContent = `$${listPrice.toFixed(2)}`;
      priceContainer.appendChild(originalPriceEl);

      // 💰 Discount badge
      const discountAmount = listPrice - finalPrice;
      const discountPercent = ((discountAmount / listPrice) * 100).toFixed(0);

      const discountBadge = document.createElement("p");
      discountBadge.classList.add("discount-indicator");
      discountBadge.innerHTML = `
        <span class="badge" style="
          background-color: #d32f2f;
          color: white;
          padding: 0.3rem 0.7rem;
          border-radius: 4px;
          font-size: 0.9rem;
          display: inline-block;
          margin-top: 0.5rem;">
          Save $${discountAmount.toFixed(2)} (${discountPercent}%)
        </span>
      `;

      priceContainer.after(discountBadge);
    }
  }
}
