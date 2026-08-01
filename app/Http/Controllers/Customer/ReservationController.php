<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::with('restaurant')
            ->where('user_id', request()->user()->id)
            ->latest()
            ->get();

        return Inertia::render('customer/Reservations', [
            'reservations' => $reservations,
        ]);
    }
}
