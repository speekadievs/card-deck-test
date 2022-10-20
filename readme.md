# Card Test

## Running tests

### Locally

Create a `tmp` directory for the SQLite database file

```shell
mkdir tmp
```

Install the dependencies

```shell
npm run install
```

Run the tests

```shell
npm run test
```

### Using a real database

Add these values to the `.env.test` file

```dotenv
DB_CONNECTION=pg

PG_HOST=localhost
PG_PORT=5432
PG_USER=lucid
PG_PASSWORD=lucid
PG_DB_NAME=lucid
```

Launch the database using

```shell
docker-compose run postgresql
```

Install the dependencies

```shell
npm run install
```

Run the tests

```shell
npm run test
```

## Building and running

### Locally

Copy the `.env.example` file to `.env`

Install the dependencies

```shell
npm run install
```

Run the project using

```shell
npm run dev
```

Visit http://localhost:3333

### Using Docker

Copy the `.env.example` file to `.env`

Change the `DB_CONNECTION` from `sqlite` to `pg`

Build the project using

```shell
docker-compose build
```

Run the project using

```shell
docker-compose up -d
```

Visit http://localhost
