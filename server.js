const express = require('express');
const { Contenedor } = require('./Contenedor.js');
const app = express();
const PORT = 8080



const container = new Contenedor('./product.txt')
app.get('/products', async (req,res) => {
    try{
        const productos = await container.getAll()
        res.send(productos)

    }catch(error){
        res.send(error)
    }
})

app.get('/random', async (req,res) => {
    try{
        const random = await container.getProductRandom()
        res.send(random)
    }catch(error){
        res.send(error)
    }
})

app.get('/', (req,res)=>{
    res.send('hola')
})

app.listen(PORT,() => console.log('server is listening'))