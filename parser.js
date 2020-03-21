require('dotenv').config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

process.env.SENDGRID_API_KEY

const nightmare = require('nightmare')()

// const myURL = "https://www.amazon.com/Samsung-970-EVO-Plus-MZ-V7S1T0B/dp/B07MFZY2F2"

/* 
   arg0 arg1      arg2...
   node parser.js url minPrice
   skip node, parse.js these 2 elements and make url the 1st element, and minPrice 2nd element
   this is for when we operate on terminal, we type commands to scrape the web and get results
   使用這個方法可以讓我們不用開啟網頁也能知道資訊
*/
const args = process.argv.slice(2)
const url = args[0]
const minPrice = args[1]

checkPrice()
async function checkPrice() {
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
      - ideal price: ${minPrice}      
    `)
    if (priceNumber < minPrice) {
      await sendEmail(
        `Price is Low`,
        `The price on ${url} has dropped below ${minPrice}`
      )       
      console.log(`
        - a notified email has been sent to your account
        - the price is below your budget, you can purchase it now !
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

// node parser.js https://www.amazon.com/Samsung-970-EVO-Plus-MZ-V7S1T0B/dp/B07MFZY2F2 200


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