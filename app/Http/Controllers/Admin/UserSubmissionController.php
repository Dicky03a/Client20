<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\User;
use App\Models\UserFile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class UserSubmissionController extends Controller
{
    public function index(Request $request, User $user)
    {
        $categories = Category::with(['subcategories' => function ($query) use ($user) {
            $query->with(['submissions' => function ($subQuery) use ($user) {
                $subQuery->where('user_id', $user->id)->with('userFile');
            }]);
        }])->get();

        return Inertia::render('admin/users/submissions', [
            'user' => $user,
            'categories' => $categories
        ]);
    }

    public function download(Request $request, UserFile $file)
    {
        if (!Storage::disk('public')->exists($file->path)) {
            abort(404);
        }

        return response()->download(storage_path('app/public/' . $file->path), $file->original_name);
    }

    public function preview(Request $request, UserFile $file)
    {
        if (!Storage::disk('public')->exists($file->path)) {
            abort(404);
        }

        return response()->file(storage_path('app/public/' . $file->path));
    }
}
