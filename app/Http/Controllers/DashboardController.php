<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Restaurant;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $user = request()->user();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalRestaurants' => Restaurant::where('is_active', true)->count(),
                'upcomingReservations' => Reservation::where('user_id', $user->id)
                    ->whereIn('status', ['pending', 'confirmed'])
                    ->whereDate('reservation_date', '>=', now())
                    ->count(),
                'totalReservations' => Reservation::where('user_id', $user->id)->count(),
            ],
        ]);
    }
}
