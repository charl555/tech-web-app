<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::where('is_active', true)
            ->with(['brand', 'category'])
            ->get(['id', 'name', 'slug', 'short_description', 'price', 'sale_price', 'quantity', 'is_featured', 'brand_id', 'category_id']);

        $categories = \App\Models\Category::where('is_active', true)->get(['id', 'name', 'slug']);
        $brands = \App\Models\Brand::where('is_active', true)->get(['id', 'name', 'slug']);

        return Inertia::render('public/products', [
            'products' => $products,
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }

    public function show($id)
    {
        $product = Product::where('is_active', true)
            ->with(['brand', 'category', 'images', 'reviews'])
            ->findOrFail($id);

        return Inertia::render('public/product-detail', [
            'product' => $product,
        ]);
    }

    public function overview($id)
    {
        $product = Product::where('is_active', true)
            ->with(['brand', 'category', 'images', 'reviews'])
            ->findOrFail($id);

        $isWishlisted = false;
        if (auth()->check()) {
            $isWishlisted = \App\Models\WishlistItem::where('user_id', auth()->id())
                ->where('product_id', $product->id)
                ->exists();
        }

        return Inertia::render('public/product-overview', [
            'product' => $product,
            'isWishlisted' => $isWishlisted,
        ]);
    }
}
