<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::where('is_active', true)->get(['id', 'name', 'slug', 'description', 'logo']);

        return Inertia::render('public/brands', [
            'brands' => $brands,
        ]);
    }
}
