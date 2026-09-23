<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SubcategoryRequest;
use App\Models\Subcategory;
use App\Services\SubcategoryService;
use App\Services\CategoryService;
use Inertia\Inertia;

class SubcategoryController extends Controller
{
    protected SubcategoryService $subcategoryService;
    protected CategoryService $categoryService;

    public function __construct(SubcategoryService $subcategoryService, CategoryService $categoryService)
    {
        $this->subcategoryService = $subcategoryService;
        $this->categoryService = $categoryService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subcategories = $this->subcategoryService->getAllSubcategories();
        $categories = $this->categoryService->getAllCategories();

        return Inertia::render('admin/subcategories/index', [
            'subcategories' => $subcategories,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SubcategoryRequest $request)
    {
        $this->subcategoryService->createSubcategory($request->validated());

        return back()->with('success', 'Subkategori berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SubcategoryRequest $request, Subcategory $subcategory)
    {
        $this->subcategoryService->updateSubcategory($subcategory, $request->validated());

        return back()->with('success', 'Subkategori berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subcategory $subcategory)
    {
        $this->subcategoryService->deleteSubcategory($subcategory);

        return back()->with('success', 'Subkategori berhasil dihapus.');
    }
}
