const nightmare = require('nightmare')()

const url = "https://www.amazon.com/Samsung-970-EVO-Plus-MZ-V7S1T0B/dp/B07MFZY2F2"

async function checkPrice() {
  try {    
    const priceString = await nightmare
      .goto(url)
      .wait('.a-color-price') 
      .evaluate(() => document.querySelector('.a-color-price').innerText)
        
    const priceNumber = parseFloat(priceString.replace('US$', ''))   
    console.log(`current price: ${priceNumber}`)
    return { currentPrice: `${priceNumber}` }
  } catch (e) { 
    console.log(e) 
  }
}

module.exports = checkPrice