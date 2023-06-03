# Udacity: Build A HEXA Website Backend

This is a backend API build in Nodejs for a website for web solution agency (HEXA). It exposes a RESTful API that will be used by the frontend developer on the frontend. 

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md) 

## Installation Instructions
This section contains all the packages used in this project and how to install them. However, you can fork this repo and run the following command at the root directory to install all packages.

`npm install`

### Packages

Here are some of the few packages that were installed.

#### express
`npm i -S express`
`npm i -D @types/express`

#### typescript
`npm i -D typescript`

#### mongoose
`npm install mongoose`

#### cors
`npm install --save cors`

#### bcrypt
`npm -i bcrypt`
`npm -i -D @types/bcrypt`

#### jsonwebtoken
`npm install jsonwebtoken --sav`
`npm -i -D @types/jsonwebtoken`

#### cookie-parser
`npm install cookie-parser`

## Set up Database
### Create Databases
We shall create the dev and test database.

- connect to the MONGO database as the server's root user `psql -U postgres`
- In psql run the following to create a user 
    - `CREATE USER shopping_user WITH PASSWORD 'password123';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE shopping;`
    - `CREATE DATABASE shopping_test;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c shopping`
        - `GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;`
    - Grant for test database
        - `\c shopping_test`
        - `GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;`

### Migrate Database
Navigate to the root directory and run the command below to migrate the database. 

`npm run dev-up`

## Enviromental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development.

**NB:** The given values are used in developement and testing. 
```
DB_NAME = shopping
DB_NAME_TEST = shopping_test
DB_HOST = localhost
DB_PORT = 5432
DB_USER = shopping_user
DB_PASS= password123

BCRYPT_PASSWORD=my-name-is-enow-2021
SALT_ROUNDS=10
TOKEN_TEST = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.J8BgsyqA3Y6F71NXbfuYIfRVuvRa_qb08RStxrCVhlQ
JWT_SECRET = 5ae8adc9731627905ebf0905dbe4a114ba7d8354ae1796772dfa523a2142761b78d48cbfcd98000bb94fbdbd8147f30de6b3484c3a060d389068204df6a50630
ENVI = dev
```

## Start App
`npm run watch`

### Running Ports 
After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access
All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file. 

## Token and Authentication
Tokens are passed along with the http header as 
```
Authorization   Bearer <token>
```

## Testing
Run test with 

`npm run test`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database. 

