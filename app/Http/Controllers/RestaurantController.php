<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RestaurantController extends Controller
{
    public function index(Request $request)
    {
        $query = Restaurant::where('is_active', true)->orderBy('name');

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('cuisine', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
            });
        }

        return Inertia::render('restaurant/Index', [
            'restaurants' => $query->get(),
        ]);
    }

    public function show(Restaurant $restaurant)
    {
        return Inertia::render('restaurant/Show', [
            'restaurant' => $restaurant->load('menus.items'),
            'menuItems' => $restaurant->menus->flatMap->items,
        ]);
    }

    public function book(Restaurant $restaurant)
    {
        return Inertia::render('restaurant/Book', [
            'restaurant' => [
                'id' => $restaurant->id,
                'name' => $restaurant->name,
            ],
            'tables' => $restaurant->tables()
                ->where('is_available', true)
                ->orderBy('number')
                ->get(['id', 'number', 'capacity', 'location']),
        ]);
    }
}
