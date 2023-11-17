const express = require('express');
const app = express();
const prodRoutes = require('./routes/appRoutes');
app.use(express.json());
const port = 3000; 

// POST REGISTRAR AL USUARIO -
// POST LOGIN - IVAN
// GET CATEGORIES - DONE
// GET CAT PRODUCTS - DONE
// GET POST DELETE PUT COMMENTS -
// GET POST PRODUCTS - DONE
// GET RELATED PRODUCTS - DONE
// GET POST PUT DELETE CART -
// GET POST PUT USER -
// GET POST PUT COMENTARIOS - MATY

app.use("/", prodRoutes);


app.listen(port, () =>{
    console.log(`Servidor corriendo en http://localhost:${port}`)
})
