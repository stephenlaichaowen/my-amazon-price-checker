# 網路爬蟲應用程式
這個 APP 讓你不需要開啟瀏覽器也能知道亞馬遜商店三星固態硬碟的價格是不是低於你心中的價格. 

## 使用方式
- 開啟 terminal
- 安裝 node_modules `npm i`
- 執行應用程序 `node parser.js url minPrice`
說明: 因為我們查詢的是亞馬遜商店商品 Samsung ssd 的價格, 所以默認網址是: `https://www.amazon.com/Samsung-970-EVO-Plus-MZ-V7S1T0B/dp/B07MFZY2F2`
minPrice 是我們設定的價錢
所以如果我們想知道現在三星的固態硬碟價錢是不是小於 200 塊美金, 輸入指令 `node parser.js https://www.amazon.com/Samsung-970-EVO-Plus-MZ-V7S1T0B/dp/B07MFZY2F2 200`
這個過程會花個幾秒鐘時間, 然後自動寄一封 Email 到 temp-email 通知用戶.


## What does nightmare library doe ?
It is a web scraping tool, just like puppeteer, this tech allows you to go through web pages browse from top to bottom grabs the images/text and save in your local project

## 什麼是 SendGrid 電子郵件服務？
SendGrid 是 雲端架構電子郵件服務，能提供可靠的 交易式電子郵件傳遞、擴充性和即時分析，以及有彈性的 API 來輕鬆進行自訂整合。 常見的 SendGrid 使用案例包括︰
自動將收據或採購確認傳送給客戶。
管理通訊群組清單，以便將每月傳單和促銷傳送給客戶。
收集封鎖的電子郵件和客戶參與情形等項目的即時計量。
轉寄客戶查詢。
處理內送電子郵件。

## What does parser.js do ?
It checks the price on amazon and does all the parsing and emails for us

## sendgrid API key
Nodemailer - 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
Amazon Price Checker - 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 

## What does temp-email do ?
It is a service that allows to receive email at a temporary address that self-destructed after a certain time elapses. 

翻譯
這是一個免費的線上服務, 讓用戶可以用暫時的電子郵箱接收信件, 這個帳號會在某個時間內銷毀, 只適合開發測試用.
