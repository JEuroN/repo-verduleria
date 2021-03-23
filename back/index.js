const express = require('express');
const cors = require('cors')
const makeSale = require('./routes/sales');
const getFruits = require('./routes/getFruits');
const { Router } = require('express');

const app = express();

const router = Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use(router)

router.use('/makeSale', makeSale);

router.use('/getFruit', getFruits);

app.set('port', process.env.port || 4000);

app.listen(app.get('port'), ()=>{
    console.log('Escuchando en puerto '+app.get('port'));
})

