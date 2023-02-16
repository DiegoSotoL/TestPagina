import { useEffect, useState } from 'react';
import { getProducts, createProduct } from './api';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  async function loadProducts() {
    const products = await getProducts();
    setProducts(products);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleCreateProduct(event) {
    event.preventDefault();

    const product = {
      name,
      description,
      price,
      image,
    };

    await createProduct(product);
    setName('');
    setDescription('');
    setPrice('');
    setImage('');

    loadProducts();
  }

  return (
    <div>
      <h1>Productos</h1>

      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <img src={product.image} alt={product.name} />
          </li>
        ))}
      </ul>

      <h2>Agregar producto</h2>

      <form onSubmit={handleCreateProduct}>
        <div>
          <label>
            Nombre:
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Descripción:
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Precio:
            <input
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Imagen:
            <input
              type="text"
              value={image}
              onChange={(event) => setImage(event.target.value)}
            />
          </label>
        </div>

        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default App;
