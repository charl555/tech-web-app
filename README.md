# TechParts

A full-featured ecommerce platform built with Laravel 13, React 19, Inertia.js, and shadcn/ui. It includes a customer-facing storefront and a complete admin panel for managing products, orders, customers, coupons, and analytics.

## What is TechParts

TechParts is a tech parts ecommerce system. Customers can browse products, manage a cart, toggle wishlist items, and place orders. Admins can manage the product catalog, view and update orders, manage customers and coupons, and review reports and activity logs.

## How It Works

- **Customer-facing pages** use a shared public layout with cart badge updates, search navigation, account dropdown, and toast notifications via `sonner`.
- **Admin pages** use a sidebar layout with role-gated access. Admin CRUD pages use native HTML forms bound to Inertia's `useForm` hook for reliable submission behavior.
- **Controllers** return Inertia responses with flash toast messages using `Inertia::flash('toast', ...)`.
- **Database seeders** provide starter data for categories, brands, and products.

## Tech Stack

- Laravel 13
- React 19
- Inertia.js 3
- shadcn/ui
- Tailwind CSS 4
- Vite
- Laravel Fortify
- TypeScript

## Getting Started

```bash
cp .env.example .env
php artisan key:generate
php artisan migrate --force
composer install
npm install
npm run build
```

## Available Scripts

- `composer dev` — start server, queue worker, and Vite
- `npm run dev` — start Vite
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm run types:check` — run TypeScript checks
- `vendor/bin/pint` — run Laravel code style fixer

## Admin Features

- Dashboard with stats, recent orders, recent customers, and quick actions
- Product, Category, Brand, Coupon management with create/edit/delete
- Order list with filters and order detail view
- Customer list with detail view including orders, addresses, and wishlist
- Reports & Analytics
- Activity Logs
- Site Settings
