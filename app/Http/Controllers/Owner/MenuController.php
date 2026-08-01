<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {
        $restaurant = request()->user()->restaurants()->first();

        $menus = $restaurant
            ? $restaurant->menus()->withCount('items')->latest()->get()
            : [];

        return Inertia::render('owner/menus/Index', [
            'menus' => $menus,
        ]);
    }

    public function create()
    {
        return Inertia::render('owner/menus/Create');
    }

    public function store(Request $request)
    {
        $restaurant = $request->user()->restaurants()->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $restaurant->menus()->create($validated);

        return to_route('owner.menus.index')
            ->with('success', 'Menu created successfully.');
    }

    public function edit(Menu $menu)
    {
        $menu->load('items');

        return Inertia::render('owner/menus/Edit', [
            'menu' => $menu,
            'menuItems' => $menu->items,
        ]);
    }

    public function update(Request $request, Menu $menu)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string|max:1000',
            'is_active' => 'boolean',
        ]);

        $menu->update($validated);

        return to_route('owner.menus.index')
            ->with('success', 'Menu updated successfully.');
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();

        return to_route('owner.menus.index')
            ->with('success', 'Menu deleted successfully.');
    }
}
