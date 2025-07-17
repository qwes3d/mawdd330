export default class ProductData {
  constructor(category) {
    this.path = `/public/json/${category}.json`;
  }

  async getData() {
    const response = await fetch(this.path);
    if (!response.ok) throw new Error("Fetch failed");
    return await response.json();
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
