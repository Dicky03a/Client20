<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        $users = $this->userService->getAllUsers();
        $roles = Role::all();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        $this->userService->createUser($request->validated());

        return back()->with('success', 'Pengguna berhasil ditambahkan.');
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $this->userService->updateUser($user, $request->validated());

        return back()->with('success', 'Pengguna berhasil diperbarui.');
    }

    public function destroy(User $user)
    {
        $this->userService->deleteUser($user);

        return back()->with('success', 'Pengguna berhasil dihapus.');
    }
}
