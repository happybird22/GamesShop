# The GamesShop Backend

Breif Description
Server built to serve data from MongoDB to frontend.

## Schemas
-Users
    -Name
    -email
    -pwd
    -admin
-Games
    -Title
    -Price
    -Category
    -Description
    -Num of players
    -qty
-Cart
    -items for purchase
    -total cost
    -userID

## Routes
Users
-Post/create user
-read user
-update user
-delete user

Games
-Get all
-Get one
-admin update
-admin delete

Cart
-add to cart
-remove from cart
-checkout

## Technologies
-Mongoose
-Express
-dotenv
-logger/morgan
-cors - for connecting to frontend
