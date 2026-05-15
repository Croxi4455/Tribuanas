<?php

namespace Database\Seeders;

/**
 * Seeder: Users
 * Membuat 2 user untuk admin panel:
 * - 1 Superadmin (akses penuh)
 * - 1 Admin biasa (akses terbatas)
 */

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Super Admin Tribuana',
                'email' => 'superadmin@tribuana.co.id',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'role' => 'superadmin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Admin Tribuana',
                'email' => 'admin@tribuana.co.id',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
