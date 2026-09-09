<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $stats = [
            'totalRevenue' => Order::where('payment_status', 'paid')->sum('total_amount'),
            'totalOrders' => Order::count(),
            'totalCustomers' => User::where('role', 'User')->count(),
            'totalProducts' => Product::where('is_active', true)->count(),
            'lowStockCount' => Product::where('is_active', true)->where('quantity', '<', 10)->count(),
        ];

        $recentOrders = Order::latest()
            ->take(5)
            ->get(['id', 'order_number', 'total_amount', 'status', 'payment_status', 'created_at']);

        $recentCustomers = User::where('role', 'User')
            ->latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'created_at']);

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
            'recentCustomers' => $recentCustomers,
        ])->toResponse($request);
    }
}
