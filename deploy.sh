#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "==> Pulling latest code"
git pull --rebase origin main

echo "==> Installing PHP dependencies (production)"
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction --no-progress

echo "==> Preparing environment"
if [ ! -f .env ]; then
    cp .env.example .env
    php artisan key:generate --force
    echo "Created .env from example — please review DB credentials before continuing."
fi

if [ -z "$(grep '^APP_KEY=' .env | cut -d= -f2- | tr -d ' ')" ]; then
    php artisan key:generate --force
fi

echo "==> Running migrations"
php artisan migrate --force

echo "==> Seeding database (idempotent)"
php artisan db:seed --force

echo "==> Linking storage"
[ -L public/storage ] || php artisan storage:link

echo "==> Building frontend"
if [ -d node_modules ]; then
    npm run build
else
    npm ci && npm run build
fi

echo "==> Caching config, routes and views"
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "==> Fixing permissions"
chmod -R 775 storage bootstrap/cache

echo "Deploy complete."
