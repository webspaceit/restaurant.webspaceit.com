<?php

namespace App\Listeners;

use App\Events\TableBooked;
use App\Notifications\ReservationConfirmation;

class NotifyRestaurantOwner
{
    public function handle(TableBooked $event): void
    {
        $owner = $event->reservation->restaurant->owner;

        $owner->notify(new ReservationConfirmation($event->reservation));
    }
}
