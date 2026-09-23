<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

    Route::resource('categories', \App\Http\Controllers\Admin\CategoryController::class)->except(['create', 'edit', 'show']);
    Route::resource('subcategories', \App\Http\Controllers\Admin\SubcategoryController::class)->except(['create', 'edit', 'show']);
    Route::resource('users', \App\Http\Controllers\Admin\UserController::class)->except(['create', 'edit', 'show']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
