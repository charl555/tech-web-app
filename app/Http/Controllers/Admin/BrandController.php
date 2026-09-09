<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index(Request $request): \Inertia\Response
    {
        $brands = Brand::latest()->get(['id', 'name', 'slug', 'description', 'is_active']);

        return Inertia::render('admin/brands/index', [
            'brands' => $brands,
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('admin/brands/create');
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:brands',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        Brand::create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Brand created successfully.']);

        return redirect()->route('admin.brands.index');
    }

    public function edit(Request $request, int $id): \Inertia\Response
    {
        $brand = Brand::findOrFail($id);

        return Inertia::render('admin/brands/edit', [
            'brand' => $brand,
        ]);
    }

    public function update(Request $request, int $id): \Illuminate\Http\RedirectResponse
    {
        $brand = Brand::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:brands,slug,'.$id,
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $brand->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Brand updated successfully.']);

        return redirect()->route('admin.brands.index');
    }

    public function destroy(Request $request, int $id): \Illuminate\Http\RedirectResponse
    {
        $brand = Brand::findOrFail($id);
        $brand->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Brand deleted successfully.']);

        return redirect()->route('admin.brands.index');
    }
}
