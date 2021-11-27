# <b>Bricks

### Create a user profile and add the lego kits you already own. Using the rebrickable API, users will have a complete inventory of lego pieces already owned and be able to view user-created kits retrieved from rebrickable.<br></br>

## <b>Prerequisites

### MongoDB must be installed on your system prior to running, so you'll need the Homebrew pkg manager to get your local database configured. Alternatively, MongoDB Atlas could also be configured with minimal effort. You'll also have to register for a rebrickable API key at https://rebrickable.com/api/.<br></br>

## <b>Setup

### With the prerequisites out of the way:

```
$ git clone https://github.com/cpalmer-atx/bricks.git
```

<br></br>

### From the root directory, use the provided update script to install/update dependencies.

```
$ npm run update
```

<br></br>

### Setup environment variables in ./config/config.env (you'll have to create this). Here's a template for the config file:

```
MODE=
PORT=
BRICKS_KEY=
MONGO_URI=
JWT_TOKEN=
TOKEN_EXP=
```

<br></br>

### MODE/PORT is user preference, but 'development' mode will enable Morgan for server feedback in the terminal. BRICKS_KEY must be set to the API key provided by rebrickable. MONGO_URI points to your database, either local or Atlas cloud. JWT_TOKEN is your jwt private key, and TOKEN_EXP is the token expiration time in seconds for logged in users.<br></br>

## <b>Endpoint testing

### The optional CRUD_tests.http file works with the VSCode REST Client extention by Huachao Mao. Postman works great, but being able to move endpoint tests inside of VSCode has made the process much more efficient.<br></br>

## <b>Inspiration

### I'm a father first with a deep passion for software development. My 9 and 10 year old boys have built an impressive lego collection over the years, and rebrickable gives me an excuse to hone by programming skills while making something the kids can play with.
