#!/usr/bin/env sh
set -e

PG_HOST="${PG_HOST:-db}"
PG_PORT="${PG_PORT:-5432}"

echo "🕒 Waiting for Postgres at $PG_HOST:$PG_PORT ..."
until nc -z "$PG_HOST" "$PG_PORT"; do
  echo "   - still waiting..."
  sleep 1
done

echo "✅ Postgres is up!"

echo "🌱 Running seed..."
npm run seed:products

echo "🚀 Starting dev server..."
npm run dev
