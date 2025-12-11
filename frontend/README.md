# 🧭 Ecommerce Frontend

A simple, clean frontend built with Next.js (App Router), TypeScript, and Tailwind CSS.

This app connects to the Ecommerce Backend (Node.js + Express + Sequelize + PostgreSQL) and provides:

- An Order Management screen (list + search)
- A Book Order screen (create new orders with products)

---

## 📁 Project Structure

```py
ecommerce-frontend/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Redirects to /orders
│   └── orders/
│       ├── page.tsx         # Orders list + search
│       └── new/
│           └── page.tsx     # Book Order form
│
├── lib/
│   └── api.ts               # API helper (GET/POST/PUT/DELETE)
│
├── types/
│   └── order.ts             # Shared TS types (Order, Product, etc.)
│
├── public/                  # Static assets (if any)
├── styles/                  # Global styles (Tailwind)
├── .env.local.example       # Frontend env template
└── package.json             # Scripts + dependencies
```

---

## 🧭 Features

- Next.js App Router with TypeScript
- Orders List page:
  - Table view of orders
  - Search by Order ID or Order Description
  - Delete order action
- Book Order page:
  - Text input for order description
  - Checkbox list for selecting products
  - Buttons: Book Order and Cancel
- Uses the backend APIs:
  - `GET /api/order`
  - `GET /api/products`
  - `POST /api/orders`
  - `DELETE /api/orders/:id`

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

### 2. Install Dependencies

```bash
npm install
```

### 3. ▶️ Running the App (Development)

```bash
npm run dev
```

Server will start on [`http://localhost:3000]`.

---
