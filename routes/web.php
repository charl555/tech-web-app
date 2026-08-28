<?php

use App\Http\Controllers\Public\BrandController;
use App\Http\Controllers\Public\CartController;
use App\Http\Controllers\Public\CategoryController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');
Route::get('/categories', [CategoryController::class, 'index'])->name('categories');
Route::get('/brands', [BrandController::class, 'index'])->name('brands');
Route::get('/cart', [CartController::class, 'index'])->name('cart');
Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
Route::post('/cart/remove', [CartController::class, 'remove'])->name('cart.remove');
Route::post('/cart/update', [CartController::class, 'update'])->name('cart.update');
Route::post('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');
Route::get('/about', function () {
    return Inertia::render('public/about');
})->name('about');
Route::get('/contact', function () {
    return Inertia::render('public/contact');
})->name('contact');

Route::inertia('/account/login', 'public/login')->name('customer.login');
Route::post('/account/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|string',
        'remember' => 'boolean',
    ]);

    if (!Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    $request->session()->regenerate();

    return redirect()->intended('/');
});

Route::post('/account/logout', function (Request $request) {
    Auth::logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect('/');
})->name('customer.logout');

Route::inertia('/account/register', 'public/register')->name('customer.register');
Route::post('/account/register', function (Request $request) {
    $validated = \Illuminate\Support\Facades\Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => ['required', 'confirmed', \Illuminate\Validation\Rules\Password::defaults()],
    ])->validate();

    $user = \App\Models\User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => $validated['password'],
        'role' => 'User',
    ]);

    Auth::login($user);

    return redirect('/');
});

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/settings.php';
