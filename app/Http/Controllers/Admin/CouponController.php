<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CouponController extends Controller
{
    public function index(Request $request)
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
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/coupons/create');
    }

    public function store(Request $request)
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

    public function edit($id)
    {
        $coupon = Coupon::findOrFail($id);

        return Inertia::render('admin/coupons/edit', [
            'coupon' => $coupon,
        ]);
    }

    public function update(Request $request, $id)
    {
        $coupon = Coupon::findOrFail($id);

        $validated = $request->validate([
            'code' => 'required|string|max:255|unique:coupons,code,' . $id,
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

    public function destroy($id)
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Coupon deleted successfully.']);

        return redirect()->route('admin.coupons.index');
    }
}
