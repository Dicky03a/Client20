<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Subcategory;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'total_users' => User::count(),
                'total_categories' => Category::count(),
                'total_subcategories' => Subcategory::count(),
            ]
        ]);
    }
}
