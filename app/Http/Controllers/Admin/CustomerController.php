<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search', '');

        $customers = User::query()
            ->where('role', 'User')
            ->when($search, fn ($q) => $q->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%"))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('admin/customers/index', [
            'customers' => $customers,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function show($id)
    {
        $customer = User::where('role', 'User')->findOrFail($id);
        $orders = $customer->orders()->latest()->take(10)->get(['id', 'order_number', 'total_amount', 'status', 'payment_status', 'created_at']);
        $addresses = $customer->addresses()->get();
        $wishlistItems = $customer->wishlistItems()->with('product:id,name,price,sale_price,is_active')->get();

        return Inertia::render('admin/customers/show', [
            'customer' => $customer,
            'orders' => $orders,
            'addresses' => $addresses,
            'wishlistItems' => $wishlistItems,
        ]);
    }
}
