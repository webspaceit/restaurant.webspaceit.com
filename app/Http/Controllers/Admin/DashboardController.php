<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/Dashboard', [
            'stats' => [
                'totalRestaurants' => Restaurant::count(),
                'totalUsers' => User::count(),
                'totalReservations' => Reservation::count(),
            ],
        ]);
    }
}
