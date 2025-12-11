# 🚀 Ecommerce Backend

A clean, dockerized backend built with Node.js, Express, TypeScript, Sequelize, and PostgreSQL.
Designed for simplicity and fast onboarding: one command to run the backend, including database setup and automatic seeding.

This backend exposes APIs for managing Orders, Products, and their relationships — matching the assignment requirements.

---

## 📁 Project Structure

```py
ecommerce-backend/
├── src/
│   ├── app.ts                # Express app config
│   ├── server.ts             # Startup + DB sync
│   ├── config/
│   │   └── db.ts             # Sequelize Postgres connection
│   ├── models/
│   │   ├── order.model.ts
│   │   ├── product.model.ts
│   │   ├── orderProduct.model.ts
│   │   └── index.ts          # Associations + syncModels()
│   ├── routes/
│   │   ├── orders.routes.ts  # CRUD endpoints
│   │   └── products.routes.ts
│   ├── seed/
│   │   └── products.seed.ts  # Auto seeding logic
│   └── types/                # (optional) Type definitions
│
├── scripts/
│   └── start-dev.sh          # Wait for DB → seed → start backend
│
├── docker-compose.yml         # DB + Backend containers
├── Dockerfile                 # Dev + Prod image
├── tsconfig.json              # TypeScript config
├── package.json               # Scripts + dependencies
└── .env.example               # Environment variables template
```

---

## 🧭 Features

- TypeScript-first backend (strict mode)
- Clean, modular Express architecture
- Sequelize ORM with PostgreSQL
- Automatic DB sync + seed on startup
- Dockerized backend + database
- HOT-RELOAD development environment (ts-node-dev inside Docker)
- One command to run EVERYTHING

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

### 2. Setup Script Permission

```bash
chmod +x scripts/start-dev.sh
```

### 3. Docker conditions

- Open Docker Demon tool before running the following command

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Backend & Database (ONE COMMAND 🎉)

```bash
docker compose --profile local up --build
```

Server will start on [`http://localhost:3001]`.

---
