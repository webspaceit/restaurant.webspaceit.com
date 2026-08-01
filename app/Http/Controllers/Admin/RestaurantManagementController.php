<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Inertia\Inertia;

class RestaurantManagementController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/Restaurants/Index', [
            'restaurants' => Restaurant::with('owner')->paginate(20),
        ]);
    }
}
