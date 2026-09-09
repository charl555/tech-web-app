<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class CouponController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search', '');
        $statusFilter = $request->query('status', 'all');

        $coupons = Coupon::query()
            ->when($search, fn ($q) => $q->where('code', 'like', "%{$search}%"))
            ->when($statusFilter !== 'all', fn ($q) => $q->where('is_active', $statusFilter === 'active'))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('admin/coupons/index', [
            'coupons' => $coupons,
            'filters' => [
                'search' => $search,
                'status' => $statusFilter,
            ],
        ])->toResponse($request);
    }

    public function create(): Response
    {
        return Inertia::render('admin/coupons/create')->toResponse(request());
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:coupons',
            'discount_type' => 'required|in:percentage,fixed',
            'discount_value' => 'required|numeric|min:0',
            'min_order_amount' => 'nullable|numeric|min:0',
            'max_discount_amount' => 'nullable|numeric|min:0',
            'usage_limit' => 'nullable|integer|min:1',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after:start_date',
            'is_active' => 'boolean',
        ]);

        $validated['used_count'] = 0;

        Coupon::create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Coupon created successfully.']);

        return redirect()->route('admin.coupons.index');
    }

    public function edit(Request $request, int $id): Response
    {
        $coupon = Coupon::findOrFail($id);

        return Inertia::render('admin/coupons/edit', [
            'coupon' => $coupon,
        ])->toResponse($request);
    }

    public function update(Request $request, int $id): \Illuminate\Http\RedirectResponse
    {
        $coupon = Coupon::findOrFail($id);

        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:coupons,code,'.$id,
            'discount_type' => 'required|in:percentage,fixed',
            'discount_value' => 'required|numeric|min:0',
            'min_order_amount' => 'nullable|numeric|min:0',
            'max_discount_amount' => 'nullable|numeric|min:0',
            'usage_limit' => 'nullable|integer|min:1',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after:start_date',
            'is_active' => 'boolean',
        ]);

        $coupon->update($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Coupon updated successfully.']);

        return redirect()->route('admin.coupons.index');
    }

    public function destroy(Request $request, int $id): \Illuminate\Http\RedirectResponse
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Coupon deleted successfully.']);

        return redirect()->route('admin.coupons.index');
    }
}
