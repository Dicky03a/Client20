<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * Get all users with their roles.
     *
     * @return Collection
     */
    public function getAllUsers(): Collection
    {
        return User::with('roles')->latest()->get();
    }

    /**
     * Create a new user.
     *
     * @param array $data
     * @return User
     */
    public function createUser(array $data): User
    {
        $userData = Arr::except($data, ['role']);
        $userData['password'] = Hash::make($userData['password']);

        $user = User::create($userData);

        if (!empty($data['role'])) {
            $user->syncRoles([$data['role']]);
        }

        return $user;
    }

    /**
     * Update an existing user.
     *
     * @param User $user
     * @param array $data
     * @return User
     */
    public function updateUser(User $user, array $data): User
    {
        $userData = Arr::except($data, ['role']);

        if (!empty($userData['password'])) {
            $userData['password'] = Hash::make($userData['password']);
        } else {
            unset($userData['password']);
        }

        $user->update($userData);

        if (!empty($data['role'])) {
            $user->syncRoles([$data['role']]);
        }

        return $user;
    }

    /**
     * Delete a user.
     *
     * @param User $user
     * @return bool|null
     */
    public function deleteUser(User $user): ?bool
    {
        return $user->delete();
    }
}
