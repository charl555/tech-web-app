<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cart = $request->session()->get('cart', []);
        $productIds = array_keys($cart);
        $products = Product::whereIn('id', $productIds)->get(['id', 'name', 'short_description', 'price', 'sale_price', 'quantity']);

        $cartItems = $products->map(function ($product) use ($cart) {
            $item = $cart[$product->id];
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->short_description ?? $product->description,
                'price' => $product->sale_price ?? $product->price,
                'quantity' => $item['quantity'],
                'discount' => $product->sale_price ? $product->price - $product->sale_price : 0,
            ];
        })->values()->all();

        return Inertia::render('public/cart', [
            'cartItems' => $cartItems,
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'nullable|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);
        $quantity = (int) ($request->quantity ?? 1);

        if ($product->quantity < $quantity) {
            return back()->withErrors(['quantity' => 'Requested quantity exceeds available stock.']);
        }

        $cart = $request->session()->get('cart', []);
        $cart[$product->id] = [
            'quantity' => ($cart[$product->id]['quantity'] ?? 0) + $quantity,
            'price' => $product->sale_price ?? $product->price,
        ];
        $request->session()->put('cart', $cart);

        return back()->with('status', 'Product added to cart.');
    }

    public function remove(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
        ]);

        $cart = $request->session()->get('cart', []);
        unset($cart[$request->product_id]);
        $request->session()->put('cart', $cart);

        return back()->with('status', 'Item removed from cart.');
    }

    public function update(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        if ($product->quantity < $request->quantity) {
            return back()->withErrors(['quantity' => 'Requested quantity exceeds available stock.']);
        }

        $cart = $request->session()->get('cart', []);
        $cart[$product->id] = [
            'quantity' => $request->quantity,
            'price' => $product->sale_price ?? $product->price,
        ];
        $request->session()->put('cart', $cart);

        return back()->with('status', 'Cart updated.');
    }

    public function clear(Request $request)
    {
        $request->session()->forget('cart');

        return back()->with('status', 'Cart cleared.');
    }
}
