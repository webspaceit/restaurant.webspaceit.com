<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Models\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TableController extends Controller
{
    public function index()
    {
        $restaurant = request()->user()->restaurants()->first();

        $tables = $restaurant
            ? $restaurant->tables()->orderBy('number')->get()->map(fn ($t) => [
                'id' => (string) $t->id,
                'number' => $t->number,
                'capacity' => $t->capacity,
                'location' => $t->location,
                'status' => $t->is_available ? 'available' : 'occupied',
            ])
            : [];

        return Inertia::render('owner/tables/Index', [
            'tables' => $tables,
        ]);
    }

    public function create()
    {
        return Inertia::render('owner/tables/Create');
    }

    public function store(Request $request)
    {
        $restaurant = $request->user()->restaurants()->firstOrFail();

        $validated = $request->validate([
            'number' => 'required|integer|min:1|unique:tables,number,NULL,id,restaurant_id,' . $restaurant->id,
            'capacity' => 'required|integer|min:1|max:20',
            'location' => 'nullable|string|max:255',
        ]);

        $restaurant->tables()->create($validated);

        return to_route('owner.tables.index')
            ->with('success', 'Table added successfully.');
    }

    public function edit($id)
    {
        $table = Table::findOrFail($id);

        return Inertia::render('owner/tables/Edit', [
            'table' => $table,
        ]);
    }

    public function update(Request $request, $id)
    {
        $table = Table::findOrFail($id);

        $validated = $request->validate([
            'number' => 'required|integer|min:1|unique:tables,number,' . $id . ',id,restaurant_id,' . $table->restaurant_id,
            'capacity' => 'required|integer|min:1|max:20',
            'location' => 'nullable|string|max:255',
            'is_available' => 'boolean',
        ]);

        $table->update($validated);

        return to_route('owner.tables.index')
            ->with('success', 'Table updated successfully.');
    }

    public function destroy($id)
    {
        $table = Table::findOrFail($id);
        $table->delete();

        return to_route('owner.tables.index')
            ->with('success', 'Table removed successfully.');
    }
}
