require('dotenv').config()
const sgMail = require('@sendgrid/mail')
const express = require('express')
const app  = express()
const engine = require('ejs-locals')
const port = process.env.PORT || 3000
const nightmare = require('nightmare')()
const url = "https://www.amazon.com/Samsung-970-EVO-Plus-MZ-V7S1T0B/dp/B07MFZY2F2"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.engine('ejs', engine)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.listen(port, () => {
  console.log(`Port running on ${port}`);
})

app.get('/', (req, res) => {
  res.render('index')
})

checkPrice(200)
/* functions */
async function checkPrice(minPrice) {
  try {
    // go to url and download info from that page
    const priceString = await nightmare
                                .goto(url)
                                .wait('#priceblock_ourprice') // works with single page application, waits for the DOM is fully loaded and rendered by JS
                                .evaluate(() => document.querySelector('#priceblock_ourprice').innerText) // print the text inside the tag
                                .end()
  
    // get rid of decimal and replace 'US$' with white space and make sure it is a decimal numbers
    // e.x. US$199.99 => 199
    const priceNumber = parseFloat(priceString.replace('US$', ''))
    console.log(`
      - current price: ${priceNumber} 
      - minimum price: ${minPrice}      
    `)
    if (priceNumber < minPrice) {
      await sendEmail(
        `Price is Low`,
        `The price on ${url} has dropped below ${minPrice}`
      )       
      console.log(`
        - the price meet your criteria, you can purchase it now !
        - a notified email has been sent to your tem-email account
      `)
    } else {
      console.log(`the price is still higher than your budget !`)
    }
  } catch (e) {
    // 如果 Email 的程式碼有錯誤, 寄一封 Email 告知
    await sendEmail(`Amazon Price Checker Error`, e.message)
    throw e
  }
}

function sendEmail(subject, body) {
  const email = {
    to: 'teserex795@provamail.com',
    from: 'amazon-price-checker@example.com',
    subject: subject,
    text: body,
    html: body
  }

  return sgMail.send(email)
}

