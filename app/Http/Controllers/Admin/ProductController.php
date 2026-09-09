<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $products = Product::with(['brand', 'category'])
            ->latest()
            ->get(['id', 'name', 'slug', 'sku', 'price', 'sale_price', 'quantity', 'is_featured', 'is_active', 'brand_id', 'category_id']);

        $categories = Category::where('is_active', true)->get(['id', 'name']);
        $brands = Brand::where('is_active', true)->get(['id', 'name']);

        return Inertia::render('admin/products/index', [
            'products' => $products,
            'categories' => $categories,
            'brands' => $brands,
        ])->toResponse($request);
    }

    public function create(Request $request): Response
    {
        $categories = Category::where('is_active', true)->get(['id', 'name']);
        $brands = Brand::where('is_active', true)->get(['id', 'name']);

        return Inertia::render('admin/products/create', [
            'categories' => $categories,
            'brands' => $brands,
        ])->toResponse($request);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products',
            'sku' => 'required|string|max:255|unique:products',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:500',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0|lt:price',
            'cost_price' => 'nullable|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ]);

        Product::create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Product created successfully.']);

        return redirect()->route('admin.products.index');
    }

    public function edit(Request $request, int $id): Response
    {
        $product = Product::findOrFail($id);
        $categories = Category::where('is_active', true)->get(['id', 'name']);
        $brands = Brand::where('is_active', true)->get(['id', 'name']);

        return Inertia::render('admin/products/edit', [
            'product' => $product,
            'categories' => $categories,
            'brands' => $brands,
        ])->toResponse($request);
    }

    public function update(Request $request, int $id): \Illuminate\Http\RedirectResponse
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug,'.$id,
            'sku' => 'required|string|max:255|unique:products,sku,'.$id,
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:500',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0|lt:price',
            'cost_price' => 'nullable|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $product->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Product updated successfully.']);

        return redirect()->route('admin.products.index');
    }

    public function destroy(Request $request, int $id): \Illuminate\Http\RedirectResponse
    {
        $product = Product::findOrFail($id);
        $product->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Product deleted successfully.']);

        return redirect()->route('admin.products.index');
    }
}
