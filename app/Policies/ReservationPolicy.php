<?php

namespace App\Policies;

use App\Models\Reservation;
use App\Models\User;

class ReservationPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Reservation $reservation): bool
    {
        return $user->id === $reservation->user_id ||
               $user->id === $reservation->restaurant->user_id ||
               $user->hasRole('admin');
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Reservation $reservation): bool
    {
        return $user->id === $reservation->user_id ||
               $user->id === $reservation->restaurant->user_id ||
               $user->hasRole('admin');
    }

    public function delete(User $user, Reservation $reservation): bool
    {
        return $user->id === $reservation->user_id ||
               $user->id === $reservation->restaurant->user_id ||
               $user->hasRole('admin');
    }
}
