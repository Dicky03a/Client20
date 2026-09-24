<?php

use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page', function () {
    $this->get('/user/submissions')->assertRedirect('/login');
});

test('authenticated users can visit their submissions', function () {
    \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'user']);
    $user = User::factory()->create();
    $user->assignRole('user');
    
    $this->actingAs($user);

    $this->get('/user/submissions')->assertOk();
});