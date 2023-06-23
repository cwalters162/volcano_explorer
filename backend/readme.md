# Volcano Explorer API Server

# Development

1. Set node_env to "development"
   - Zsh/Bash 
     - `export node_env="development"`
   - PowerShell
     - `$env:node_env="development"`
2. Install NPM packages.
   - `npm install`
3. Start the development server.
   - `npm run dev`

# Production
1. Install NPM packages.
    - `npm install`
2. Build the files for deployment.
   - `npm run build`
3. sftp into your server of choice.
   - Linux/MacOS
     - Command Line
       - `sftp username@ip_address`
       - Enter your password.
       - `put ./build/src/* remote/directory/location`
       - Wait for the transfer to complete
     - Tool with GUI
       - [FileZilla](https://filezilla-project.org/)
   - Windows
     - Tool with Graphical User Interface
       - [FileZilla](https://filezilla-project.org/)
4. ssh into the hosting server
   - `ssh user@ip_address`
5. Cd intro the directory the deployed files were uploaded
   - `cd directory/files/uploaded`
6. Install required packages
   - `npm install express`
7. Generate certificates for SSL/TLS
   - Go to [certbot](https://certbot.eff.org/) and follow the instructions.
   - With the certificates generated copy them into the same directory as server.js on the host system.
     - `cp directory/cert.pem server/directory/cert.pem`
8. Use pm2 to launch the express server as a daemon
   1. Install pm2
      - `npm install pm2`
   2. create daemon and set environment variables
      - `node_env="production fqdn="yourfqdn.com" pm2 start server.js -watch`
9. Verify Access via web browser
    - go to yourfqdn.com and see if it loads as expected.

## Tech Stack

- [x] Language: TypeScript
- [x] HTTP Server: Express
- [x] Auth: express-session
- [x] Json TypeSafety: Zod
- [ ] Websocket: Socket.io
- [ ] ORM: Prisma - Maybe
- [ ] Database: SQLite

## Endpoints