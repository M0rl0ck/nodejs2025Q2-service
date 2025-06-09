# Home Library Service

### This repository is the part of [nodejs](https://github.com/AlreadyBored/nodejs-assignments) course

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

### Clone this repository:

```
git clone https://github.com/M0rl0ck/nodejs2025Q2-service.git
```

### Go to project directory:

```
$ cd nodejs2025Q2-service
```

### Go to branch develop:

```
$ git checkout dev-docker-postgres
```

### Rename file `.env.example` to `.env`

### Install dependence:

```
npm ci
```

### Running application

- #### To run the application in dev mode:

```
npm run start:docker-dev
```

This command pulls images from docker-hub (if they don't exist locally) and runs the application.
If you don't want to pull the images, you can create them instead:

```
npm run build:docker-dev
```

To build images.
And then:

```
npm run start:docker-dev
```

To start application.

- #### To run the application in prod mode:

```
npm run start:docker-prod
```

To pull and start application
or:

```
npm run build:docker-prod
```

and then

```
npm run start:docker-prod
```

to build and start application

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

### Checking image vulnerabilities

```
npm run vulnerabilities-scanning
```

This script checks the latest created image for vulnerabilities.
If the images have not been built yet, you will need to create the image in advance.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
