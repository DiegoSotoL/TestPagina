const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

//FALTA EL LISTAR
/* app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
}); */

app.post('/api/products', async (req, res) => {
    console.log('BBBB')
  const product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  };

    //FALTA EL GUARDAR EN BD
  /* await product.save(); */

  res.json(product);
});
 
  
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
