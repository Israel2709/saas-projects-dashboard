# SaaS Projects Dashboard

This is a modern full-stack web app built with **Next.js 15 (App Router)**, **Tailwind CSS**, **PostgreSQL (via Railway)**, and **Prisma ORM**. It allows you to manage projects, view details, and log events per project.

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Israel2709/saas-projects-dashboard.git
cd saas-projects-dashboard
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up the environment variables

```bash
cp .env.example .env
```

Update the `DATABASE_URL` in `.env` with your PostgreSQL connection string.

### 4. Set up the database

```bash
pnpm prisma migrate dev --name init
```

### 5. (Optional) Seed the database

```bash
pnpm seed
```

### 6. Run the development server

```bash
pnpm dev
```

---

## 🗃️ Database Setup

- **Database**: PostgreSQL (recommended via [Railway](https://railway.app))
- **ORM**: Prisma

### Required `.env` variable:

```env
DATABASE_URL=postgresql://user:password@host:port/dbname
```

---

## 🧱 Architecture Notes

This project is structured using the **Next.js App Router**, embracing server components, route handlers, and file-based routing for both UI and API logic.

### Key tech stack:

- **Next.js 15**: `app/` directory with route-based layout
- **Tailwind CSS**: for styling and dark/light mode support
- **Prisma**: database migrations and ORM
- **React Icons**: for consistent UI elements

### Folder Structure:

```
├── app/
│   ├── dashboard/
│   │   ├── projects/
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── delete/page.tsx
│   │   └── create/page.tsx
│   └── api/
│       └── projects/[id]/events/route.ts
├── components/
├── lib/
├── prisma/
├── scripts/
```

---

## 🧪 API Examples

### Create Event for Project

**Endpoint**: `POST /api/projects/:id/events`

**Request body:**

```json
{
  "type": "deploy",
  "payload": {
    "branch": "main",
    "status": "success"
  }
}
```

**cURL Example:**

```bash
curl -X POST http://localhost:3000/api/projects/abc123/events \
  -H "Content-Type: application/json" \
  -d '{"type": "deploy", "payload": {"branch": "main", "status": "success"}}'
```

---

## 🛠 Useful Commands

| Command                   | Description                     |
| ------------------------- | ------------------------------- |
| `pnpm dev`                | Start local development server  |
| `pnpm build`              | Create production build         |
| `pnpm prisma studio`      | Open Prisma Studio (GUI for DB) |
| `pnpm seed`               | Run seed script                 |
| `pnpm prisma migrate dev` | Run migrations in development   |

---

## 📦 Deployment

Deployment is handled via **Vercel**. Ensure you add the `DATABASE_URL` to your Vercel project’s environment variables.

---
