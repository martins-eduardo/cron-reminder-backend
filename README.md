# Cron Lembretes - Backend

API REST para gerenciamento de lembretes, com um cron job que verifica e dispara os lembretes pendentes a cada minuto.

## Stack

- Node.js + TypeScript
- Express 5
- Prisma (PostgreSQL)
- node-cron

## Requisitos

- Node.js 18+
- Docker (para o banco de dados PostgreSQL)

## Configuração

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz do projeto:

   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5439/lembretes?schema=public"
   PORT=3333
   ```

3. Suba o banco de dados com Docker:

   ```bash
   docker-compose up -d
   ```

4. Rode as migrations do Prisma:

   ```bash
   npx prisma migrate dev
   ```

## Executando

```bash
npm run dev
```

O servidor inicia na porta definida em `PORT` (padrão `3333`) e o cron job de verificação de lembretes é iniciado automaticamente, rodando a cada minuto.

## Endpoints

### `GET /health`

Verifica se a API está no ar.

### `GET /reminder`

Lista todos os lembretes, ordenados por data agendada (`scheduledAt`).

### `POST /reminder/create`

Cria um novo lembrete.

**Body:**

```json
{
  "title": "Título do lembrete",
  "scheduledAt": "2026-09-20T10:00:00.000Z"
}
```

### `DELETE /reminder/:id`

Remove um lembrete pelo `id`.

## Cron Job

O job em [src/jobs/check-reminders.ts](src/jobs/check-reminders.ts) roda a cada minuto e:

- Busca lembretes com `sent: false` e `scheduledAt` menor ou igual ao horário atual.
- Marca cada lembrete encontrado como `sent: true` após "disparar" o aviso (via log no console).
