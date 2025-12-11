# 🧩 Ecommerce Monorepo

A full-stack assignment project consisting of:

- Backend: Node.js + Express + TypeScript + Sequelize + PostgreSQL (Dockerized)
- Frontend: Next.js + TypeScript + Tailwind CSS
- Monorepo Dev Tools: Root-level scripts to run both apps with one command

---

## 📁 Project Structure

```py
ecommerce-monorepo/
│
├── backend/               # Node.js API (Dockerized)
│   ├── src/               # Controllers, models, services
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── package.json
│
├── frontend/              # Next.js app with Tailwind
│   ├── app/               # App Router pages
│   ├── lib/               # API helpers
│   ├── types/             # TS shared types
│   └── package.json
│
├── package.json           # Root-level orchestrator (backend + frontend)
└── README.md              # This file
```

---

## 🚀 Features

### Backend

- TypeScript Express API
- PostgreSQL + Sequelize ORM
- Automatic model syncing
- Automatic product seeding on startup
- Fully Dockerized (DB + Server)
- Clean folder structure (models, routes, services)

### Frontend

- Frontend
- Tailwind UI
- Orders screen:
  - List orders
  - Search orders by ID/description
  - Search orders by ID/description
- Delete orders
  - Select products
  - Create an order
  - Cancel navigation

### Monorepo

- One command to run backend & frontend
- Cross-platform support using `concurrently`
- No OS-specific hacks required (works on macOS, Windows, Linux)

---

## 🧭 Best Practices

### 🔖 Branch Naming Conventions

| Branch Type | Prefix     | Example                                |
| ----------- | ---------- | -------------------------------------- |
| Feature     | `feature/` | `feature/user-auth`                    |
| Bugfix      | `bugfix/`  | `bugfix/<jira-id>-<short-description>` |
| Hotfix      | `hotfix/`  | `hotfix/<jira-id>-<short-description>` |
| Release     | `release/` | `release/v1.0.0`                       |

---

### 📝 Commit Message Guidelines

Follow **Conventional Commits**:

```md
Describe what you have done in a sentence.
```

---

### 🔃 Pull Request Guidelines

- Always create a new branch from `dev`
- Ensure tests pass before pushing
- Add clear title and description
- Link relevant issues (e.g. `Closes #42`)
- Request reviews before merging

---

### ✅ Code Quality

- Use ESLint and Prettier (configured in repo)
- Type-safe (strict TypeScript)
- Tests must cover all critical paths
- Document public methods, endpoints, and utilities

---

## 🛠️ Local Development

### 1. Clone the Repo

```bash
git clone git@github.com:PulasthiAbey/ecommerce-orders.git
cd ecommerce-orders
```

### 3. Docker

- Open Docker Demon Application

### 2. Install Dependencies

```bash
npm install
```

### 3. ▶️ Running the Entire Project (One Command)

```bash
npm run dev
```

- Server will start on [`http://localhost:3000]`.
- Deployed app is available at [ecommerce-orders-flax.vercel.app](ecommerce-orders-flax.vercel.app).

---
