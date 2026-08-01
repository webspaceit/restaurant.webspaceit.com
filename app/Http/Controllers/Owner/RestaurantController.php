<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRestaurantRequest;
use App\Models\Restaurant;
use Inertia\Inertia;

class RestaurantController extends Controller
{
    public function index()
    {
        return Inertia::render('owner/restaurants/Index', [
            'restaurants' => request()->user()->restaurants,
        ]);
    }

    public function create()
    {
        return Inertia::render('owner/restaurants/Create');
    }

    public function store(StoreRestaurantRequest $request)
    {
        $restaurant = $request->user()->restaurants()->create($request->validated());

        return to_route('owner.restaurants.edit', $restaurant);
    }

    public function edit(Restaurant $restaurant)
    {
        return Inertia::render('owner/restaurants/Edit', [
            'restaurant' => $restaurant,
        ]);
    }

    public function update(StoreRestaurantRequest $request, Restaurant $restaurant)
    {
        $restaurant->update($request->validated());

        return to_route('owner.restaurants.edit', $restaurant);
    }
}
