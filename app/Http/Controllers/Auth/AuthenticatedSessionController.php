<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\FortifyServiceProvider;
use Illuminate\Http\Request;

class AuthenticatedSessionController extends Controller
{
    public function create()
    {
        return inertia('auth/Login');
    }

    public function store(Request $request)
    {
        // Handled by Laravel Fortify
    }

    public function destroy(Request $request)
    {
        // Handled by Laravel Fortify
    }
}
