# NestJS Tutorial 2024

## For developers

### 1st time setup

- Copy env file for develop in local environment: .env.sample to .env
- Copy env file for test in local environment: .env.sample to .env.test
- Replace the variable in env file with the appropriate values

```sh
cp .env.sample .env
cp .env.sample .env.test
```

- Install package
- Run your app in your expected mode

```sh
npm install
npm run start # production
npm run start:dev # dev
npm run start:debug # debug
```

## 1st step

1. Config vscode to allow debug
2. Unit Test
3. Config vscode to allow debug when run unit test

## Overview

### Main concepts

1. Controllers
2. Providers
3. Modules
4. Middleware
5. Exception Filters
6. Pipes
7. Guards
8. Interceptors
9. Custom Decorators
