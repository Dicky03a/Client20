<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Category;
use App\Models\Subcategory;
use Spatie\Permission\Models\Role;

class UserCategoryTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        Role::firstOrCreate(['name' => 'user']);
        $this->user = User::factory()->create();
        $this->user->assignRole('user');
    }

    public function test_user_can_view_category()
    {
        $category = Category::factory()->create();

        $response = $this->actingAs($this->user)->get(route('user.categories.show', $category->slug ?? $category->id));

        $response->assertStatus(200);
    }

    public function test_user_can_view_subcategory()
    {
        $category = Category::factory()->create();
        $subcategory = Subcategory::factory()->create(['category_id' => $category->id]);

        $response = $this->actingAs($this->user)->get(route('user.subcategories.show', $subcategory->slug ?? $subcategory->id));

        $response->assertStatus(200);
    }
}
