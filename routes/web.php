<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Removed dashboard route

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

    Route::resource('categories', \App\Http\Controllers\Admin\CategoryController::class)->except(['create', 'edit']);
    Route::resource('subcategories', \App\Http\Controllers\Admin\SubcategoryController::class)->except(['create', 'edit']);
    Route::resource('users', \App\Http\Controllers\Admin\UserController::class)->except(['create', 'edit', 'show']);
    Route::get('users/{user}/submissions', [\App\Http\Controllers\Admin\UserSubmissionController::class, 'index'])->name('users.submissions');
    Route::get('files/download/{file}', [\App\Http\Controllers\Admin\UserSubmissionController::class, 'download'])->name('files.download');
    Route::get('files/preview/{file}', [\App\Http\Controllers\Admin\UserSubmissionController::class, 'preview'])->name('files.preview');
});

Route::middleware(['auth', 'role:user'])->prefix('user')->name('user.')->group(function () {
    Route::get('submissions', [\App\Http\Controllers\User\SubmissionController::class, 'index'])->name('submissions.index');
    Route::get('categories/{category}', [\App\Http\Controllers\User\SubmissionController::class, 'showCategory'])->name('categories.show');
    Route::get('subcategories/{subcategory}', [\App\Http\Controllers\User\SubmissionController::class, 'showForm'])->name('subcategories.show');
    Route::post('subcategories/{subcategory}/upload', [\App\Http\Controllers\User\SubmissionController::class, 'store'])->name('submissions.store');
    Route::post('subcategories/{subcategory}/library', [\App\Http\Controllers\User\SubmissionController::class, 'storeFromLibrary'])->name('submissions.storeFromLibrary');
    Route::get('files/preview/{file}', [\App\Http\Controllers\User\SubmissionController::class, 'preview'])->name('files.preview');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
