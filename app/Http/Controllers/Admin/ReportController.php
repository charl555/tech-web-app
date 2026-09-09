<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request): Response
    {
        $period = $request->query('period', 'month');

        $revenueQuery = Order::where('payment_status', 'paid');

        if ($period === 'week') {
            $revenue = $revenueQuery->whereBetween('created_at', [now()->subWeek(), now()])->sum('total_amount');
            $orders = Order::whereBetween('created_at', [now()->subWeek(), now()])->count();
        } elseif ($period === 'year') {
            $revenue = $revenueQuery->whereBetween('created_at', [now()->subYear(), now()])->sum('total_amount');
            $orders = Order::whereBetween('created_at', [now()->subYear(), now()])->count();
        } else {
            $revenue = $revenueQuery->whereBetween('created_at', [now()->subMonth(), now()])->sum('total_amount');
            $orders = Order::whereBetween('created_at', [now()->subMonth(), now()])->count();
        }

        $avgOrderValue = $orders > 0 ? $revenue / $orders : 0;

        $topProducts = Product::withCount(['orderItems as sold_count' => function ($q) {
            $q->whereHas('order', fn ($q2) => $q2->where('payment_status', 'paid'));
        }])
            ->orderByDesc('sold_count')
            ->take(10)
            ->get(['id', 'name', 'price']);

        $topCustomers = User::where('role', 'User')
            ->whereHas('orders', fn ($q) => $q->where('payment_status', 'paid'))
            ->withSum('orders as total_spent', 'total_amount')
            ->orderByDesc('total_spent')
            ->take(10)
            ->get(['id', 'name', 'email']);

        $newCustomers = User::where('role', 'User')->count();

        return Inertia::render('admin/reports/index', [
            'stats' => [
                'revenue' => $revenue,
                'orders' => $orders,
                'avgOrderValue' => $avgOrderValue,
                'newCustomers' => $newCustomers,
            ],
            'topProducts' => $topProducts,
            'topCustomers' => $topCustomers,
            'period' => $period,
        ])->toResponse($request);
    }
}
