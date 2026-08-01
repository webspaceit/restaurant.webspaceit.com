<?php

namespace App\Models;

use App\Models\Concerns\SerializesDates;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reservation extends Model
{
    use HasFactory, SerializesDates;

    protected $fillable = [
        'restaurant_id', 'user_id', 'table_id', 'guest_name', 'guest_email',
        'guest_phone', 'reservation_date', 'reservation_time', 'guests',
        'status', 'special_requests', 'cancelled_at',
    ];

    protected function casts(): array
    {
        return [
            'reservation_date' => 'date:Y-m-d',
            'guests' => 'integer',
            'cancelled_at' => 'datetime',
        ];
    }

    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function table(): BelongsTo
    {
        return $this->belongsTo(Table::class);
    }
}
