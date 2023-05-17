# Volcano Explorer Backend

# Development

Set node_env to "development"

run npm install

run npm run dev

# Production

npm run build

ftp the build files to the server you wish to host on and run the following commands.

Set node_env to "production"

Set fqdn to "yourefqdn.com"

`npm install express`

cd into the directory you placed the build files.

`node ./server.js`

## Tech Stack

- [x] Language: TypeScript
- [x] HTTP Server: Express
- [x] Auth: express-session
- [x] Json TypeSafety: Zod
- [ ] GraphQL Server: express-graphql
- [ ] Websocket: Socket.io
- [ ] ORM: Prisma - Maybe
- [ ] Database: SQLite

## Endpoints
OUT OF DATE
- `/graphql` endpoints without ever using this.