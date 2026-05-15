<?php

namespace Database\Seeders;

/**
 * Seeder: Galeri
 * Mengisi 12 foto galeri dummy dengan kategori bervariasi
 * Kategori: kegiatan, pelatihan, fasilitas, event
 */

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GaleriSeeder extends Seeder
{
    public function run(): void
    {
        $galeri = [
            ['judul' => 'Upacara Pelepasan Anggota Security Baru', 'kategori' => 'kegiatan'],
            ['judul' => 'Patroli Rutin Kawasan Industri Cikarang', 'kategori' => 'kegiatan'],
            ['judul' => 'Apel Pagi Personel di Kantor Pusat', 'kategori' => 'kegiatan'],
            ['judul' => 'Pelatihan Gada Pratama Angkatan 15', 'kategori' => 'pelatihan'],
            ['judul' => 'Simulasi Penanganan Kebakaran', 'kategori' => 'pelatihan'],
            ['judul' => 'Latihan Bela Diri dan Ketangkasan', 'kategori' => 'pelatihan'],
            ['judul' => 'Gedung Kantor Pusat Tribuana', 'kategori' => 'fasilitas'],
            ['judul' => 'Ruang Pelatihan dan Training Center', 'kategori' => 'fasilitas'],
            ['judul' => 'Armada Kendaraan Operasional', 'kategori' => 'fasilitas'],
            ['judul' => 'Pengamanan Konser Musik Jakarta Fair 2026', 'kategori' => 'event'],
            ['judul' => 'Security Detail Acara Gala Dinner Korporat', 'kategori' => 'event'],
            ['judul' => 'Pengamanan Pameran Otomotif GIIAS 2026', 'kategori' => 'event'],
        ];

        foreach ($galeri as $index => $item) {
            DB::table('galeri')->insert([
                'judul' => $item['judul'],
                'gambar' => 'images/galeri/galeri-' . ($index + 1) . '.jpg',
                'kategori' => $item['kategori'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
