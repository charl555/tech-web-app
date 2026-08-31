<?php

use App\Http\Controllers\Admin\ActivityLogController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CouponController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Public\CartController;
use App\Http\Controllers\Public\CategoryController as PublicCategoryController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\PasswordController;
use App\Http\Controllers\Public\ProductController as PublicProductController;
use App\Http\Controllers\Public\WishlistController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/products', [PublicProductController::class, 'index'])->name('products');
Route::get('/products/{id}', [PublicProductController::class, 'show'])->name('products.show');
Route::get('/products/{id}/overview', [PublicProductController::class, 'overview'])->name('products.overview');
Route::get('/categories', [PublicCategoryController::class, 'index'])->name('categories');
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/account', [App\Http\Controllers\Public\AccountController::class, 'index'])->name('account');
    Route::post('/account/password', [App\Http\Controllers\Public\PasswordController::class, 'update'])->name('account.password');
    Route::post('/wishlist/toggle', [App\Http\Controllers\Public\WishlistController::class, 'toggle'])->name('wishlist.toggle');
    Route::middleware(['admin'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('admin/products', ProductController::class)->names('admin.products');
        Route::resource('admin/categories', CategoryController::class)->names('admin.categories');
        Route::resource('admin/brands', BrandController::class)->names('admin.brands');
        Route::resource('admin/coupons', CouponController::class)->names('admin.coupons');
        Route::get('admin/orders', [OrderController::class, 'index'])->name('admin.orders.index');
        Route::get('admin/orders/{id}', [OrderController::class, 'show'])->name('admin.orders.show');
        Route::post('admin/orders/{id}/status', [OrderController::class, 'updateStatus'])->name('admin.orders.updateStatus');
        Route::post('admin/orders/{id}/payment', [OrderController::class, 'updatePaymentStatus'])->name('admin.orders.updatePaymentStatus');
        Route::get('admin/customers', [CustomerController::class, 'index'])->name('admin.customers.index');
        Route::get('admin/customers/{id}', [CustomerController::class, 'show'])->name('admin.customers.show');
        Route::get('admin/activity-logs', [ActivityLogController::class, 'index'])->name('admin.activity-logs.index');
        Route::get('admin/reports', [ReportController::class, 'index'])->name('admin.reports.index');
        Route::get('admin/settings', [SettingsController::class, 'index'])->name('admin.settings.index');
        Route::post('admin/settings', [SettingsController::class, 'update'])->name('admin.settings.update');
    });
});

require __DIR__ . '/settings.php';
