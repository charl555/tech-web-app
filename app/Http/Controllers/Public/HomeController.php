<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $featuredProducts = Product::where('is_active', true)
            ->where('is_featured', true)
            ->with(['brand', 'category'])
            ->get(['id', 'name', 'slug', 'short_description', 'price', 'sale_price', 'is_featured']);

        return Inertia::render('public/home', [
            'featuredProducts' => $featuredProducts,
        ]);
    }
}
