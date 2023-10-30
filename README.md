## Installation

NPM Packages

```bash
$ npm install
```

PostgreSQL and Redis Docker Image

```bash
$ docker compose up

# restart PostgreSQL DB
$ npm run db:dev:restart
$ npx prisma migrate dev

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

# swagger documentation
$ http://localhost:4000/api
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
