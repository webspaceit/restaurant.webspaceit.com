<?php

namespace App\Models;

use App\Models\Concerns\SerializesDates;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MenuItem extends Model
{
    use HasFactory, SerializesDates;

    protected $fillable = [
        'menu_id', 'name', 'description', 'price', 'category', 'image', 'is_available',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'float',
            'is_available' => 'boolean',
        ];
    }

    public function menu(): BelongsTo
    {
        return $this->belongsTo(Menu::class);
    }
}
