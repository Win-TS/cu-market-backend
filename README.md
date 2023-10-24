## Installation

NPM Packages
NPM Packages

```bash
$ npm install
```

PostgreSQL Docker Image

```bash
$ docker compose up

# restart DB
$ npm run db:dev:restart

# run seed script for initial (dummy) data
npx prisma db seed
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
