const API_BASE_URL = '/api';

async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);
  const products = await response.json();
  return products;
}

async function createProduct(product) {
    console.log('AAAAAAAAAAAAA')
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  const createdProduct = await response.json();
  return createdProduct;
}

export { getProducts, createProduct };