<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome', [
            'restaurants' => Restaurant::where('is_active', true)->get(),
        ]);
    }
}
