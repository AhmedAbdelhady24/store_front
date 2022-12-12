<div align="center" id="top"> 

  &#xa0;

  
</div>

<h1 align="center">Storefront_backend</h1>






##  About ##

this project is a backend for a store managing adding products , users , cart orders with their equivilant routes.

##  Technologies ##

The following tools were used in this project:
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)

## Starting ##

```bash
# unzip this project
# Access
$ cd storefront_backend
# Install dependencies
$ yarn
# create databases for development
db-migrate up -e dev
# create databases for testing 
db-migrate up -e test
# Run the project
$ yarn start
# The server will initialize in the <http://localhost:3000>
# for testing 
$ yarn test
```

## database information ##
testing database = "shopping_test" <br><br>
development database = "shopping"<br><br>
database_username = "shopping_user"<br><br>
password="password123"<br><br>
database_port=5432<br><br>
<br>


## enviromental variables ##
POSTGRES_HOST = '127.0.0.1'<br><br>
POSTGRES_DB = 'shopping'<br><br>
POSTGRES_TEST_DB = 'shopping_test'<br><br>
POSTGRES_USER = 'shopping_user'<br><br>
POSTGRES_PASSWORD = 'password123'<br><br>
ENV=dev<br><br>
BCRYPT_PASSWORD=password123<br><br>
SALT_ROUNDS=10<br><br>
TOKEN_SECRET=hello<br><br>
## Routes ##

### product routes : ###
localhost:3000/products [GET] => show all products<br><br>
localhost:3000/products/:id [GET] => show specific product<br><br>
localhost:3000/products/ [Post] => add product posting (name , price)<br><br>


### user routes : ###
localhost:3000/products [GET] => show all users <br><br>
localhost:3000/products/:id [GET] => show specific user<br><br>
localhost:3000/products/ [Post] => add user posting (username , first_name,last_name,password)<br><br>
localhost:3000/products/login [Post] => authenticate user(username ,password)<br>
<br>
### Order routes : ###
localhost:3000/orders [GET] => show all orders<br><br>
localhost:3000/orders/:id [GET] => show specific order<br><br>
localhost:3000/orders/:id [Post] => add products to order posting (quantity, productId)<br><br>
localhost:3000/orders/ [Post] =>create order posting (user_id, status)<br><br>




<a href="#top">Back to top</a>
