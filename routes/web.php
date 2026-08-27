<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::inertia('/', 'public/home')->name('home');

Route::inertia('/products', 'public/products')->name('products');
Route::inertia('/products/{id}', 'public/product-detail')->name('products.show');
Route::inertia('/categories', 'public/categories')->name('categories');
Route::inertia('/brands', 'public/brands')->name('brands');
Route::inertia('/cart', 'public/cart')->name('cart');
Route::inertia('/about', 'public/about')->name('about');
Route::inertia('/contact', 'public/contact')->name('contact');

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
