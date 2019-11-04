# Assignment 1 - Agile Software Practice.

Name: Shiqian Yan

## Overview.

This system intends to assist to manage bank account. Which has a lot of useful functions, including
add users, add cards, save money, purchase foreign exchange, etc.

## API endpoints.

 + GET /user - Get all users.
 + GET /user/:id - Get a specific user.
 + GET /rate - Get all rates.
 + GET /card - Get all cards.
 + GET /card/:id - Get a specific card.
 + GET /cardVUN/:userName - Get a card via user name.
 + POST /user - Add a user.
 + POST /card - Add a card.
 + PUT /card/save/:id - Save money in a card.
 + PUT /card/withdraw/:id - Withdraw money in a card.
 + PUT /card/purchase/:id - Purchase foreign exchange.
 + PUT /card/settle/:id - Settle foreign exchange.
 + DELETE /user/:id - Delete a user.
 + DELETE /card/:id - Delete a card.

## Data model.

cardInfo:
	cardNumber: String,
	CNYBalance: {type: Number, default: 0},
       	EURBalance: {type: Number, default: 0},
  	password: String

exchangeRate:
  	fromEURtoCNY: Number,
  	fromCNYtoEUR: Number,
  	fromEURtoUSD: Number,
  	fromUSDtoEUR: Number

userInfo:
  	name: String,
  	userName: String,
  	cardNumber: String,
  	phoneNumber: String


## Sample Test execution.

~~~
GET /user 200 468.498 ms - 872
      √ should return all users (487ms)
    GET /user/:id
      When the id is valid
GET /user/5db3307c1c9d440000ff784b 200 22.703 ms - 179
        √ should return the specific user
      When the id is invalid
GET /user/1243314314 200 1.445 ms - 238
        √ should return the Not Found message
    POST /user
POST /user 200 49.720 ms - 190
      √ should return confirmation message and update database (53ms)
GET /user/5dc06f6e1ebcb22d10c73dcc 200 16.628 ms - 188
    DELETE /user/:id
      When the id is valid
DELETE /user/5dc06f6e1ebcb22d10c73dcc 200 27.636 ms - 39
        √ should return the confirmation message and delete the user
GET /user 200 16.904 ms - 872
      When the id is invalid
DELETE /user/12433142314 200 0.519 ms - 243
        √ should return the Not Found message
    GET /card
GET /card 200 16.230 ms - 777
      √ should return all cards
    GET /card/:id
      When the id is valid
GET /card/5db3433c1c9d4400005ea2cf 200 15.923 ms - 155
        √ should return the specific card
      When the id is invalid
GET /card/1243314314 200 0.581 ms - 238
        √ should return the Not Found message
    GET /cardVUN/:userName
GET /cardVUN/876212493@gmail.com 200 34.163 ms - 196
      √ should return the card
    POST /card
POST /card 200 25.809 ms - 169
      √ should return confirmation message and update database
GET /card/5dc06f6e1ebcb22d10c73dcd 200 16.470 ms - 167
    DELETE /card/:id
      When the id is valid
DELETE /card/5dc06f6e1ebcb22d10c73dcd 200 25.486 ms - 171
        √ should return the confirmation message and delete the card
GET /card 200 19.181 ms - 777
      When the id is invalid
DELETE /card/12433142314 200 0.448 ms - 243
        √ should return the Not Found message
    PUT /card/save/:id
      When the id is valid
        When the password is valid
PUT /card/save/5db343801c9d4400005ea2d1 200 46.516 ms - 168
          √ should return the confirmation message and save the money (49ms)
GET /card/5db343801c9d4400005ea2d1 200 17.813 ms - 158
        When the password is invalid
PUT /card/save/5db343801c9d4400005ea2d1 200 23.376 ms - 30
          √ should return a confirmation message
      When the id is invalid
PUT /card/save/12433142314 200 0.413 ms - 241
        √ should return the Not Found message
    PUT /card/withdraw/:id
      When the id is valid
        When the password is valid
          When the balance is sufficient
PUT /card/withdraw/5db343801c9d4400005ea2d1 200 35.604 ms - 171
            √ should return the confirmation message and withdraw the money (38ms)
GET /card/5db343801c9d4400005ea2d1 200 18.982 ms - 158
          When the balance is insufficient
PUT /card/withdraw/5db343801c9d4400005ea2d1 200 21.216 ms - 34
            √ should return a confirmation message
        When the password is invalid
PUT /card/withdraw/5db343801c9d4400005ea2d1 200 17.354 ms - 30
          √ should return a confirmation message
      When the id is invalid
PUT /card/withdraw/12433142314 200 0.385 ms - 241
        √ should return the Not Found message
    GET /rate
GET /rate 200 17.141 ms - 113
      √ should return the rate
    PUT /card/purchase/:id
      When the id is valid
        When the password is valid
          When the balance is sufficient
PUT /card/purchase/5db343801c9d4400005ea2d1 200 55.689 ms - 183
            √ should return the confirmation message and purchase CNY (58ms)
GET /card/5db343801c9d4400005ea2d1 200 18.895 ms - 158
          When the balance is insufficient
PUT /card/purchase/5db343801c9d4400005ea2d1 200 18.629 ms - 38
            √ should return a confirmation message
        When the password is invalid
PUT /card/purchase/5db343801c9d4400005ea2d1 200 19.152 ms - 30
          √ should return a confirmation message
      When the id is invalid
PUT /card/purchase/12433142314 200 0.403 ms - 241
        √ should return the Not Found message
    PUT /card/settle/:id
      When the id is valid
        When the password is valid
          When the balance is sufficient
PUT /card/settle/5db343801c9d4400005ea2d1 200 54.238 ms - 181
            √ should return the confirmation message and settle CNY (56ms)
GET /card/5db343801c9d4400005ea2d1 200 17.991 ms - 158
          When the balance is insufficient
PUT /card/settle/5db343801c9d4400005ea2d1 200 24.515 ms - 38
            √ should return a confirmation message
        When the password is invalid
PUT /card/settle/5db343801c9d4400005ea2d1 200 16.574 ms - 30
          √ should return a confirmation message
      When the id is invalid
PUT /card/settle/12433142314 200 0.490 ms - 241
        √ should return the Not Found message


  29 passing (1s)
~~~

## Extra features.

Find the card via username. I use the userName in userInfo collection to find all the information about 
the card of this userName in cardInfo collection by directly contacting the two collections of cardInfo and userInfo.