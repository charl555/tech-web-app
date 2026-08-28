<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::where('is_active', true)->get(['id', 'name', 'slug', 'description', 'image']);

        return Inertia::render('public/categories', [
            'categories' => $categories,
        ]);
    }
}
