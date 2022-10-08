### Installation:


```
npm install class-validator class-transformer cors dotenv express morgan mysql2 typeorm typeorm-naming-strategies typescript
```

Dependencias de desarrollo necesarias:

```
npm install -D @types/cors @types/express @types/morgan concurrently nodemon
```

# Docker + NodeJS  + TypeScript

## For run in locally

`npm i`

## Start database

`docker-compose up`

### Start dev server with nodemon

`npm run start:dev`

### Start the project in production

`npm run start:prod`

### Start built project

`npm start`

## For running Docker Containers

### Build the image

`docker-compose up`

### Start dev server

`make up`

### Stop server

`make down`

### Start the project in production

`make up-prod`


### Command to create our project in order to build it.
`docker build --no-cache --progress=plain -t api-node-ts`