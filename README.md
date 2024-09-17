# REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing

```
1. npm install (npm modules installing)
2. Download pgAdmin (postrges database). You can change name of db and other credentials in .env file.
3. Install and run Docker if you want run app from it.
```

## Running application

1. For running app ```from Docker``` change ```POSTGRES_HOST``` value to ``` 'host.docker.internal' ``` in ```.env``` file. 

2. ```npm start```

Use one of the next commands for build docker images, create and start docker containers:
```
docker compose up
```
or
```
docker-compose up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

To run load test scenarios

```
npm run test:load
```

Generate load test report after scenarios run

```
npm run artillery:report
```

## Compare Performance (Fastify vs Express) 

1. [Express test results](https://alexeygorbachevskiy.github.io/express-rest-service/express-artillery-report.html)
2. [Fastify test results](https://alexeygorbachevskiy.github.io/express-rest-service/fastify-artillery-report.html)


## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

---

## Tasks

### Task 1. Caesar cipher CLI tool

* Execute in: **private repository**
* [Description](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/descriptions/caesar-cipher-cli-tool.md)
* [Cross-check criteria](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/cross-check/caesar-cipher-cli-tool.md)

### Task 2. Express REST service

* Execute in: **template**
* [Description](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/descriptions/express-rest-service.md)
* [Cross-check criteria](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/cross-check/express-rest-service.md)

### Task 3. Debug in Node.js

* Execute in: **private repository**
* [Description](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/descriptions/debug-nodejs.md)
* [Cross-check criteria](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/cross-check/debug-nodejs.md)

### Task 4. Typescript basics

* Execute in: **template**
* [Description](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/descriptions/typescript-basics.md)
* [Cross-check criteria](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/cross-check/typescript-basics.md)

### Task 5. Logging & Error Handling

* Execute in: **template**
* [Description](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/descriptions/logging-error-handling.md)
* [Cross-check criteria](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/cross-check/logging-error-handling.md)

### Task 6. Docker basics

* Execute in: **template**
* [Description](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/descriptions/docker-basics.md)
* [Cross-check criteria](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/cross-check/docker-basics.md)

### Task 7. PostgreSQL & Typeorm

* Execute in: **template**
* [Description](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/descriptions/postgresql-typeorm.md)
* [Cross-check criteria](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/cross-check/postgresql-typeorm.md)

### Task 8. Authentification & JWT

* Execute in: **template**
* [Description](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/descriptions/authentification-jwt.md)
* [Cross-check criteria](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/cross-check/authentification-jwt.md)

### Task 9. NestJS

* Execute in: **template**
* [Description](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/descriptions/nestjs.md)
* [Cross-check criteria](https://github.com/rolling-scopes-school/basic-nodejs-2021Q2/blob/master/cross-check/nestjs.md)

---

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
