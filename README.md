# HTTP & HTTP/2 REST Playground

App to learn http/http2 protocol and REST principles using Node.js with Express.

## Requirements

- Node.js 18+
- npm
- openssl
- Docker Desktop

## Running in development mode

1. Install dependencies
```bash
npm install
```

2. Rename the `.env.example` file to `.env` and set up the database environment variables.

3. Configure the PostgreSQL database with Docker
```bash
docker compose up -d
```

4. To run execute the following command:
```bash
npm run dev
```

5. To run using http2 `app.http2.ts`, you must generate a self-signed certificate, the following command creates the `server.key` and `server.crt` files:
```bash
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```

4. Create a directory named `keys` in the project root directory and move `server.key` and `server.crt` files.

> [!TIP]
> Change the `dev` script in `package.json` to run http2 with `"dev": "tsx watch src/app.http2.ts"` and http2 with `"dev": "tsx watch src/app.http.ts"`
