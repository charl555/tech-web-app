<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $statusFilter = $request->query('status', 'all');
        $paymentStatusFilter = $request->query('payment_status', 'all');
        $search = $request->query('search', '');

        $orders = Order::query()
            ->with(['user:id,name,email'])
            ->when($statusFilter !== 'all', fn ($q) => $q->where('status', $statusFilter))
            ->when($paymentStatusFilter !== 'all', fn ($q) => $q->where('payment_status', $paymentStatusFilter))
            ->when($search, fn ($q) => $q->where('order_number', 'like', "%{$search}%"))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('admin/orders/index', [
            'orders' => $orders,
            'filters' => [
                'status' => $statusFilter,
                'payment_status' => $paymentStatusFilter,
                'search' => $search,
            ],
        ]);
    }

    public function show($id)
    {
        $order = Order::with(['user:id,name,email', 'items.product:id,name,price', 'payments'])->findOrFail($id);

        return Inertia::render('admin/orders/show', [
            'order' => $order,
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|string|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $order->update(['status' => $validated['status']]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Order status updated successfully.']);

        return back();
    }

    public function updatePaymentStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $validated = $request->validate([
            'payment_status' => 'required|string|in:pending,paid,failed,refunded',
        ]);

        $order->update(['payment_status' => $validated['payment_status']]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Payment status updated successfully.']);

        return back();
    }
}
