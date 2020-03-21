const express = require('express')
const app  = express()
const engine = require('ejs-locals')
const port = process.env.PORT || 3000
const checkPrice = require('./check-price')
const bodyParser = require('body-parser')

app.engine('ejs', engine)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static('client'))
// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

let myMessage
app.get('/', (req, res) => {  
  // res.render('index', { myMessage })
  res.render('index')
})

app.post('/checkPrice', async (req, res) => {  
  const { price } = req.body
  console.log(`minPrice: ${price}`)
  let { message } = await checkPrice(price)
  console.log(`信息: ${message}`)
  // myMessage = message
  res.status(200).redirect('/')
})


app.listen(port, () => {
  console.log(`Port running on ${port}`);
})

