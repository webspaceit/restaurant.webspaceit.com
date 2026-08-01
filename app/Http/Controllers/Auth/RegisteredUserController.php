<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

class RegisteredUserController extends Controller
{
    public function create()
    {
        return inertia('auth/Register');
    }

    public function store(Request $request)
    {
        // Handled by Laravel Fortify
    }
}
