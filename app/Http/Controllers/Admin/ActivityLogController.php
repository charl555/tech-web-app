<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityLogController extends Controller
{
    public function index(Request $request): \Inertia\Response
    {
        $search = $request->query('search', '');
        $actionFilter = $request->query('action', 'all');

        $logs = ActivityLog::query()
            ->with('user:id,name,email')
            ->when($search, fn ($q) => $q->where('description', 'like', "%{$search}%")->orWhere('ip_address', 'like', "%{$search}%"))
            ->when($actionFilter !== 'all', fn ($q) => $q->where('action', $actionFilter))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('admin/activity-logs/index', [
            'logs' => $logs,
            'filters' => [
                'search' => $search,
                'action' => $actionFilter,
            ],
        ]);
    }
}
