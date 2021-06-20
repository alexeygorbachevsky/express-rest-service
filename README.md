# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

Follow next steps for running app ```not from Docker```  ```or``` 
just change host value to ``` 'localhost' ``` in ```src/common/ormconfig.ts``` (See 13-14 lines) and ```npm start```.

1. Open any text editor from ```admin roots```.
2. Open ```hosts``` file (Path for Windows users is C:\Windows\System32\drivers\etc.)
If you don't know path for hosts file in your OS, check in google.
3. Insert ```127.0.0.1       postgres``` in the end of file.

4. ```npm start```

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

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
