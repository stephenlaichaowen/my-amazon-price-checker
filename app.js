const express = require('express')
const app  = express()
const engine = require('ejs-locals')
const port = process.env.PORT || 3000
const checkPrice = require('./check-current-price')
const cors = require('cors')

app.engine('ejs', engine)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(cors())
app.use(express.static(__dirname + '/client'))
app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
})

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

