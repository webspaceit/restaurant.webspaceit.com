<?php

namespace App\Events;

use App\Models\Reservation;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TableBooked implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Reservation $reservation) {}

    public function broadcastOn(): array
    {
        return [
            new Channel('restaurant.' . $this->reservation->restaurant_id),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'reservation_id' => $this->reservation->id,
            'restaurant_id' => $this->reservation->restaurant_id,
            'table_id' => $this->reservation->table_id,
            'time' => $this->reservation->reservation_time,
            'guests' => $this->reservation->guests,
        ];
    }
}
