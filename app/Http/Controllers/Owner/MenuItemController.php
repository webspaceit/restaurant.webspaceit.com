<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMenuItemRequest;
use App\Models\Menu;
use App\Models\MenuItem;

class MenuItemController extends Controller
{
    public function store(StoreMenuItemRequest $request, Menu $menu)
    {
        $menu->items()->create($request->validated());

        return to_route('owner.menus.edit', $menu);
    }

    public function update(StoreMenuItemRequest $request, Menu $menu, MenuItem $menuItem)
    {
        $menuItem->update($request->validated());

        return to_route('owner.menus.edit', $menu);
    }

    public function destroy(Menu $menu, MenuItem $menuItem)
    {
        $menuItem->delete();

        return to_route('owner.menus.edit', $menu);
    }
}
