<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            ['name' => 'Admin User', 'password' => bcrypt('password')]
        );
        $admin->assignRole('admin');

        $user = User::firstOrCreate(
            ['email' => 'user@gmail.com'],
            ['name' => 'Regular User', 'password' => bcrypt('password')]
        );
        $user->assignRole('user');

        $users = User::factory(10)->create();
        foreach ($users as $u) {
            $u->assignRole('user');
        }
    }
}
