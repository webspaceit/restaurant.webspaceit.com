<?php

use App\Models\Restaurant;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('restaurant.{restaurantId}', function ($user, $restaurantId) {
    return $user->id === Restaurant::find($restaurantId)?->user_id;
});
