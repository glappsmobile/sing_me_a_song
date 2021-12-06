# Sing Me a Song

## Deployment 🚀
You can check the application in production here: [https://sing-me-a-song-glauco.herokuapp.com](https://sing-me-a-song-glauco.herokuapp.com)

### Tooling:
* [ExpressJS](https://expressjs.com/)
* [JavaScript](https://www.javascript.com/)
* [NodeJS](https://nodejs.org/en/about/)
* [PostreSQL](https://www.postgresql.org/)
* [JestJS](https://jestjs.io/)

### Prerequisites
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)
* [PostgreSQL](https://www.postgresql.org/)

### Repository
* Clone this repository
```sh
git clone https://github.com/glappsmobile/sing_me_a_song
```
* Install NPM packages
```sh
npm install
```

### Database
* Create the dev database using PostgreSQL
```sh
CREATE DATABASE sing_me_a_song_dev;
```

* Import [DATABASE.sql](https://github.com/glappsmobile/sing_me_a_song/blob/main/DATABASE.sql) to the dev database 
```sh
pg_dump sing_me_a_song_dev < path/to/DATABASE.sql
```

* Create the .env.development file in the project root, take [.env.develpment.example](https://github.com/glappsmobile/sing_me_a_song/blob/main/.env.development.example) as example.

### How to run:
To start the development server, run:
```sh
npm run start:dev
```
To start the frontend, run:
```sh
npm start
```
