require('dotenv').config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const nightmare = require('nightmare')()

const url = "https://www.amazon.com/Samsung-970-EVO-Plus-MZ-V7S1T0B/dp/B07MFZY2F2"

async function checkPrice(minPrice) {
  try {
    // go to url and download info from that page
    const priceString = await nightmare
                                .goto(url)
                                .wait('.a-price-whole') // works with single page application, waits for the DOM is fully loaded and rendered by JS
                                .evaluate(() => document.querySelector('.a-price-whole').innerText) // print the text inside the tag
                                .end()
    // console.log(priceString);
    // const priceNumber = parseFloat(priceString.replace('US$', ''))
    const priceNumber = parseFloat(priceString)
    console.log(`
      - current price: ${priceNumber} 
      - minimum price: ${minPrice}      
    `)
    // let message
    if (priceNumber < minPrice) {
      await sendEmail(
        `Price is Low`,
        `The price on ${url} has dropped below ${minPrice}`
      )       
      // console.log(`
      //   - the price meet your criteria, you can purchase it now !
      //   - a notified email has been sent to your temp-email account
      // `)
      return {
        currentPrice: `${priceNumber}`,
        yourPrice: `${minPrice}`,
        message: `price has dropped below your expectation, time to get it now !`
      }
    } else {
      // console.log(`price is still higher than your budget !`)
      return {
        curentPrice: `${priceNumber}`,
        yourPrice: `${minPrice}`,
        message: 'price is still higher than your expectation, be patience !'
      }
    }
  } catch (e) {    
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

module.exports = checkPrice