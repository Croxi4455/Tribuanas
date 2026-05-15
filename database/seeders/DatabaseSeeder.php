<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

/**
 * DatabaseSeeder - Menjalankan semua seeder dengan urutan yang benar
 *
 * Urutan eksekusi:
 * 1. Users (diperlukan sebagai dasar autentikasi)
 * 2. Profil Perusahaan (data konfigurasi global)
 * 3. Konten website (tidak ada foreign key dependency antar tabel)
 *
 * Jalankan: php artisan migrate:fresh --seed
 */
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            // 1. Data dasar — user admin panel
            UserSeeder::class,

            // 2. Konfigurasi — profil perusahaan
            ProfilPerusahaanSeeder::class,

            // 3. Konten website
            BeritaSeeder::class,
            LayananSeeder::class,
            MitraSeeder::class,
            GaleriSeeder::class,
            TestimoniSeeder::class,
            PelatihanSeeder::class,
            KarirSeeder::class,
            KontakMasukSeeder::class,
        ]);
    }
}
