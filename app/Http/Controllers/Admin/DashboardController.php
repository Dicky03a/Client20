<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Subcategory;
use App\Models\Submission;
use App\Models\User;
use App\Models\UserFile;
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
                'total_submissions' => Submission::count(),
                'total_user_files' => UserFile::count(),
            ],
            'recent_submissions' => Submission::with(['user', 'subcategory', 'userFile'])
                ->latest()
                ->take(5)
                ->get(),
        ]);
    }
}
