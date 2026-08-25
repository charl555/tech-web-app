<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'public/home')->name('home');

Route::inertia('/products', 'public/products')->name('products');
Route::inertia('/products/{id}', 'public/product-detail')->name('products.show');
Route::inertia('/categories', 'public/categories')->name('categories');
Route::inertia('/brands', 'public/brands')->name('brands');
Route::inertia('/cart', 'public/cart')->name('cart');
Route::inertia('/about', 'public/about')->name('about');
Route::inertia('/contact', 'public/contact')->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/settings.php';
