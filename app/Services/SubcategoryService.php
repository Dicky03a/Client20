<?php

namespace App\Services;

use App\Models\Subcategory;
use Illuminate\Database\Eloquent\Collection;

class SubcategoryService
{
    /**
     * Get all subcategories with their related category.
     *
     * @return Collection
     */
    public function getAllSubcategories(): Collection
    {
        return Subcategory::with('category')->latest()->get();
    }

    /**
     * Create a new subcategory.
     *
     * @param array $data
     * @return Subcategory
     */
    public function createSubcategory(array $data): Subcategory
    {
        return Subcategory::create($data);
    }

    /**
     * Update an existing subcategory.
     *
     * @param Subcategory $subcategory
     * @param array $data
     * @return Subcategory
     */
    public function updateSubcategory(Subcategory $subcategory, array $data): Subcategory
    {
        $subcategory->update($data);

        return $subcategory;
    }

    /**
     * Delete a subcategory.
     *
     * @param Subcategory $subcategory
     * @return bool|null
     */
    public function deleteSubcategory(Subcategory $subcategory): ?bool
    {
        return $subcategory->delete();
    }
}
