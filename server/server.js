const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

try {
  mongoose.connect('mongodb://localhost:27017/tu-base-de-datos', { useNewUrlParser: true, useUnifiedTopology: true });
} catch (error) {
  console.log(error);
}
// Definición del modelo de productos

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String
});
const Product = mongoose.model('Product', productSchema);

// Middleware para manejar solicitudes HTTP incorrectas
app.use((req, res, next) => {
  if (['GET', 'POST', 'PUT', 'DELETE'].indexOf(req.method) !== -1) {
    next();
  } else {
    res.status(405).send('Método no permitido');
  }
});


// Ruta para obtener todos los productos

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener los productos');
  }
});


// Ruta para crear un nuevo producto
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image
    });
    const objetoGuardado = await product.save();
    res.send(objetoGuardado);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al guardar el objeto');
  }
});
 
  
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
