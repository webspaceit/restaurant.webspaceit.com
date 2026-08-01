<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = request()->user();

        return Inertia::render('customer/Dashboard', [
            'upcomingReservations' => $user->reservations()
                ->where('reservation_date', '>=', now()->today())
                ->whereNotIn('status', ['cancelled'])
                ->with('restaurant')
                ->orderBy('reservation_date')
                ->orderBy('reservation_time')
                ->get(),
            'pastReservations' => $user->reservations()
                ->where('reservation_date', '<', now()->today())
                ->with('restaurant')
                ->orderByDesc('reservation_date')
                ->get(),
        ]);
    }
}
