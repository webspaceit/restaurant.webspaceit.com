<?php

// database/seeders/RoleAndPermissionSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // 1. Create Permissions
        $permissions = [
            'make reservation',
            'view own reservations',
            'manage restaurant',
            'manage tables',
            'manage menus',
            'view analytics',
            'manage users', // Super admin only
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        // 2. Create Roles and Assign Permissions
        $customerRole = Role::findOrCreate('customer');
        $customerRole->givePermissionTo(['make reservation', 'view own reservations']);

        $ownerRole = Role::findOrCreate('owner');
        $ownerRole->givePermissionTo([
            'manage restaurant', 
            'manage tables', 
            'manage menus', 
            'view analytics',
            'make reservation', // Owners might want to book for themselves too
            'view own reservations'
        ]);

        $adminRole = Role::findOrCreate('admin');
        $adminRole->givePermissionTo(Permission::all());

        // 3. Create Default Users for Testing
        $admin = User::firstOrCreate(
            ['email' => 'admin@restaurant.com'],
            ['name' => 'Super Admin', 'password' => bcrypt('password')],
        );
        $admin->assignRole('admin');

        $owner = User::firstOrCreate(
            ['email' => 'owner@restaurant.com'],
            ['name' => 'Restaurant Owner', 'password' => bcrypt('password')],
        );
        $owner->assignRole('owner');

        $customer = User::firstOrCreate(
            ['email' => 'customer@restaurant.com'],
            ['name' => 'John Customer', 'password' => bcrypt('password')],
        );
        $customer->assignRole('customer');
    }
}