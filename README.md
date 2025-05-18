# Reuse.io

A monorepo containing auth, server, and client applications.

## Project Structure

```
reuse_io/
├── packages/
│   ├── auth/          # Authentication service
│   ├── server/        # API server
│   └── client/        # Next.js frontend
├── docker-compose.yml # Docker Compose configuration
└── package.json       # Root package.json
```

## Prerequisites

- Node.js 18+
- PNPM 9.15.1+
- Docker and Docker Compose

## Getting Started

### Local Development

1. Install dependencies:

```bash
pnpm install
```

2. Create `.env` files for each service:

```bash
cp packages/auth/.env.example packages/auth/.env
cp packages/server/.env.example packages/server/.env
cp packages/client/.env.example packages/client/.env
```

3. Start all services in development mode:

```bash
pnpm run dev
```

This will concurrently start:
- Auth service on port 4000
- Server service on port 3001
- Client application on port 3000

### Using Docker

1. Build and start all services:

```bash
docker compose up
```

2. Access the applications:
   - Client: http://localhost:3000
   - Auth API: http://localhost:4000
   - Server API: http://localhost:3001

## Database Management

Each service has its own PostgreSQL database:

- Auth DB: PostgreSQL on port 5432
- Server DB: PostgreSQL on port 5433

### Running Prisma Migrations

For the auth service:

```bash
cd packages/auth
pnpm prisma migrate dev
```

For the server service:

```bash
cd packages/server
pnpm prisma migrate dev
```

## Building for Production

```bash
pnpm run build
```

## Starting Production Services

```bash
pnpm run start
```