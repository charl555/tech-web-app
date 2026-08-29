<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\WishlistItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $orders = Order::where('user_id', $user->id)
            ->latest()
            ->take(10)
            ->get([
                'id',
                'order_number',
                'status',
                'total_amount',
                'payment_status',
                'created_at',
            ]);

        $wishlistItems = WishlistItem::where('user_id', $user->id)
            ->with(['product' => function ($query) {
                $query->select('id', 'name', 'slug', 'price', 'sale_price', 'quantity', 'is_active');
            }])
            ->latest()
            ->get();

        return Inertia::render('public/account', [
            'user' => $user,
            'orders' => $orders,
            'wishlistItems' => $wishlistItems,
        ]);
    }
}
