const db = require('../db/db');
query = 'SELECT * FROM fruits'

const getFruits = async (req, res) => {
  return await db.many(query)
  .then(r => {
    res.status(200).json({
        msg: r,
        status: 'ok',
        statusCode: '200'
    })
  })
  .catch(r => {
    res.status(404).json({
        msg: r,
        status: 'Not found',
        statusCode: '404'
    })
  })
}

module.exports = getFruits;