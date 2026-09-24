<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subcategory;
use App\Models\Category;

class SubcategorySeeder extends Seeder
{
    public function run(): void
    {
        $technology = Category::where('name', 'Teknologi')->first();
        if ($technology) {
            Subcategory::firstOrCreate(['name' => 'Pemrograman'], ['category_id' => $technology->id, 'description' => 'Subkategori pemrograman komputer basic ke advance']);
            Subcategory::firstOrCreate(['name' => 'Jaringan'], ['category_id' => $technology->id, 'description' => 'Subkategori jaringan nirkabel dan berbayar']);
        }

        $business = Category::where('name', 'Bisnis')->first();
        if ($business) {
            Subcategory::firstOrCreate(['name' => 'Marketing'], ['category_id' => $business->id, 'description' => 'Subkategori edukasi marketing untuk B2B Sales']);
            Subcategory::firstOrCreate(['name' => 'Keuangan'], ['category_id' => $business->id, 'description' => 'Subkategori keuangan perbankan atau desentralisasi']);
        }
        
        $design = Category::where('name', 'Desain')->first();
        if ($design) {
            Subcategory::firstOrCreate(['name' => 'UI/UX'], ['category_id' => $design->id, 'description' => 'Subkategori perancangan UI/UX Desain Sistem']);
            Subcategory::firstOrCreate(['name' => 'Ilustrasi'], ['category_id' => $design->id, 'description' => 'Subkategori perancangan Vector Ilustrasi']);
        }
    }
}
