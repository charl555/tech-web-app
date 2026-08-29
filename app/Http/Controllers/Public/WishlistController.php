<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\WishlistItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function toggle(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
        ]);

        $user = $request->user();
        $productId = $request->input('product_id');

        $wishlistItem = WishlistItem::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->first();

        if ($wishlistItem) {
            $wishlistItem->delete();
            Inertia::flash('toast', ['type' => 'success', 'message' => 'Removed from wishlist.']);
        } else {
            WishlistItem::create([
                'user_id' => $user->id,
                'product_id' => $productId,
            ]);
            Inertia::flash('toast', ['type' => 'success', 'message' => 'Added to wishlist.']);
        }

        return back();
    }
}
