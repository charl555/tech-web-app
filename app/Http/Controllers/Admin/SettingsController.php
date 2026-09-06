<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = [
            'store_name' => config('app.name', 'PCForge'),
            'contact_email' => '',
            'phone' => '',
            'address' => '',
            'currency' => 'USD',
            'timezone' => 'UTC',
            'free_shipping_threshold' => 50,
            'stripe_enabled' => false,
            'paypal_enabled' => false,
            'email_from_name' => config('app.name', 'PCForge'),
            'email_from_address' => '',
        ];

        return Inertia::render('admin/settings/index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'store_name' => 'required|string|max:255',
            'contact_email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:500',
            'currency' => 'required|string|max:10',
            'timezone' => 'required|string|max:50',
            'free_shipping_threshold' => 'nullable|numeric|min:0',
            'stripe_enabled' => 'boolean',
            'paypal_enabled' => 'boolean',
            'email_from_name' => 'required|string|max:255',
            'email_from_address' => 'nullable|email|max:255',
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Settings updated successfully.']);

        return back();
    }
}
