<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request): Response
    {
        $categories = Category::latest()->get(['id', 'name', 'slug', 'description', 'sort_order', 'is_active']);

        return Inertia::render('admin/categories/index', [
            'categories' => $categories,
        ])->toResponse($request);
    }

    public function create(): Response
    {
        return Inertia::render('admin/categories/create')->toResponse(request());
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories',
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        Category::create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Category created successfully.']);

        return redirect()->route('admin.categories.index');
    }

    public function edit(Request $request, int $id): Response
    {
        $category = Category::findOrFail($id);

        return Inertia::render('admin/categories/edit', [
            'category' => $category,
        ])->toResponse($request);
    }

    public function update(Request $request, int $id): \Illuminate\Http\RedirectResponse
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug,'.$id,
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $category->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Category updated successfully.']);

        return redirect()->route('admin.categories.index');
    }

    public function destroy(Request $request, int $id): \Illuminate\Http\RedirectResponse
    {
        $category = Category::findOrFail($id);
        $category->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Category deleted successfully.']);

        return redirect()->route('admin.categories.index');
    }
}
