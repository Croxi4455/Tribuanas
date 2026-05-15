<?php

namespace Database\Seeders;

/**
 * Seeder: Mitra
 * Mengisi 15 mitra/klien dummy dengan nama instansi dan perusahaan realistis Indonesia
 */

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MitraSeeder extends Seeder
{
    public function run(): void
    {
        $mitra = [
            ['nama' => 'PT Bank Mandiri (Persero) Tbk', 'kota' => 'Jakarta', 'tahun' => 2018],
            ['nama' => 'PT Pertamina (Persero)', 'kota' => 'Jakarta', 'tahun' => 2019],
            ['nama' => 'PT Telekomunikasi Indonesia Tbk', 'kota' => 'Bandung', 'tahun' => 2020],
            ['nama' => 'RS Pondok Indah Group', 'kota' => 'Jakarta', 'tahun' => 2019],
            ['nama' => 'Universitas Indonesia', 'kota' => 'Depok', 'tahun' => 2021],
            ['nama' => 'PT Astra International Tbk', 'kota' => 'Jakarta', 'tahun' => 2020],
            ['nama' => 'Lippo Mall Kemang', 'kota' => 'Jakarta', 'tahun' => 2022],
            ['nama' => 'PT Freeport Indonesia', 'kota' => 'Timika', 'tahun' => 2021],
            ['nama' => 'Kantor Gubernur DKI Jakarta', 'kota' => 'Jakarta', 'tahun' => 2023],
            ['nama' => 'PT Semen Indonesia (Persero) Tbk', 'kota' => 'Gresik', 'tahun' => 2020],
            ['nama' => 'Hotel Grand Hyatt Jakarta', 'kota' => 'Jakarta', 'tahun' => 2022],
            ['nama' => 'PT PLN (Persero) UP3 Bekasi', 'kota' => 'Bekasi', 'tahun' => 2021],
            ['nama' => 'Ciputra World Surabaya', 'kota' => 'Surabaya', 'tahun' => 2023],
            ['nama' => 'PT Garuda Indonesia (Persero) Tbk', 'kota' => 'Tangerang', 'tahun' => 2019],
            ['nama' => 'Kementerian Keuangan Republik Indonesia', 'kota' => 'Jakarta', 'tahun' => 2024],
        ];

        foreach ($mitra as $index => $item) {
            DB::table('mitra')->insert([
                'nama' => $item['nama'],
                'logo' => 'images/mitra/logo-mitra-' . ($index + 1) . '.png',
                'kota' => $item['kota'],
                'tahun' => $item['tahun'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
