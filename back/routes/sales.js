const db = require('../db/db');

const makeSale = async (req, res) => {
    await req.body.forEach(element => {
        let query = `UPDATE fruits SET list_stock = ${element.list_stock - element.list_cantidad} WHERE list_id = ${element.list_id}`
        console.log(query);
        db.any(query)
        .then((r)=>{
            console.log(r);
        })
        .catch((r)=>{
            console.log(r);
        })
    })
    res.status(200).json({
        status: 'ok',
        statusCode: 200
    })
}
module.exports = makeSale;
