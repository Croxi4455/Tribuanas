<?php

namespace Database\Seeders;

/**
 * Seeder: Berita
 * Mengisi 10 berita dummy seputar kegiatan perusahaan pengamanan
 * Menggunakan Faker locale id_ID untuk konten berbahasa Indonesia
 */

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BeritaSeeder extends Seeder
{
    public function run(): void
    {
        $faker = \Faker\Factory::create('id_ID');

        $judulBerita = [
            'Tribuana Raih Penghargaan Perusahaan Pengamanan Terbaik 2026',
            'Pelatihan Gada Pratama Angkatan ke-15 Resmi Dibuka',
            'Kerjasama Strategis dengan PT Bank Mandiri untuk Pengamanan Cabang',
            'Tim Security Tribuana Berhasil Amankan Event Internasional di Jakarta',
            'Tribuana Perluas Layanan ke Wilayah Kalimantan Timur',
            'Sertifikasi ISO 9001:2015 untuk Standar Pelayanan Keamanan',
            'Peringatan Hari Satpam Nasional: Tribuana Gelar Upacara dan Bakti Sosial',
            'Implementasi Teknologi Smart Security di Gedung Perkantoran Jakarta',
            'Tribuana Rekrut 200 Personel Baru untuk Proyek Pengamanan Industri',
            'Workshop Peningkatan Kompetensi Anggota Security di Bandung',
        ];

        foreach ($judulBerita as $index => $judul) {
            DB::table('berita')->insert([
                'judul' => $judul,
                'slug' => Str::slug($judul),
                'isi' => $this->generateIsiBerita($faker, $judul),
                'gambar' => 'images/berita/berita-' . ($index + 1) . '.jpg',
                'tanggal_publish' => $faker->dateTimeBetween('-6 months', 'now')->format('Y-m-d'),
                'is_published' => $index < 8, // 2 berita terakhir belum dipublish
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Generate isi berita yang realistis berdasarkan judul
     */
    private function generateIsiBerita($faker, string $judul): string
    {
        $paragraphs = [];
        $paragraphs[] = "Jakarta — {$judul}. " . $faker->paragraph(4);
        $paragraphs[] = $faker->paragraph(5);
        $paragraphs[] = '"' . $faker->sentence(12) . '," ujar Direktur Utama PT Tribuana Jasa Pengamanan dalam keterangan resminya.';
        $paragraphs[] = $faker->paragraph(4);
        $paragraphs[] = 'Dengan langkah ini, Tribuana semakin memperkuat posisinya sebagai perusahaan jasa pengamanan terpercaya di Indonesia. ' . $faker->paragraph(3);

        return implode("\n\n", $paragraphs);
    }
}
