const express = require('express')
const app  = express()
const engine = require('ejs-locals')
const port = process.env.PORT || 3000
const checkPrice = require('./check-current-price')

app.engine('ejs', engine)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.json())

app.get('/',  (req, res) => {  
  res.render('index')  
})

app.post('/checkPrice', async (req, res) => {  
  const { price } = req.body
  console.log(`minPrice: ${price}`)

  const { currentPrice } = await checkPrice()  
  res.send({ price: currentPrice })
})

app.listen(port, () => {
  console.log(`Port running on ${port}`);
})

