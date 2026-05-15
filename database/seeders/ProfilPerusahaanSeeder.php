<?php

namespace Database\Seeders;

/**
 * Seeder: Profil Perusahaan
 * Mengisi 1 data profil perusahaan Tribuana (konfigurasi global website)
 */

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProfilPerusahaanSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('profil_perusahaan')->insert([
            'nama_perusahaan' => 'PT Tribuana Jasa Pengamanan',
            'tagline' => 'Mitra Terpercaya dalam Solusi Keamanan Profesional',
            'deskripsi' => 'PT Tribuana Jasa Pengamanan adalah perusahaan penyedia jasa keamanan dan pengamanan profesional yang berdiri sejak tahun 2010. Dengan pengalaman lebih dari satu dekade, kami telah dipercaya oleh berbagai instansi pemerintah, perusahaan swasta nasional dan multinasional, serta lembaga pendidikan untuk menyediakan tenaga pengamanan yang kompeten, terlatih, dan bersertifikasi. Kami berkomitmen untuk memberikan layanan keamanan terbaik dengan mengutamakan profesionalisme, integritas, dan kepuasan klien. Seluruh personel kami telah mengikuti pelatihan sesuai standar POLRI dan memiliki sertifikasi dari BNSP (Badan Nasional Sertifikasi Profesi).',
            'alamat' => 'Jl. Raya Pasar Minggu No. 45, Pancoran, Jakarta Selatan 12780, DKI Jakarta, Indonesia',
            'telepon' => '(021) 7654-3210',
            'email' => 'info@tribuana.co.id',
            'maps_embed' => '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2!2d106.84!3d-6.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnMDAuMCJTIDEwNsKwNTAnMjQuMCJF!5e0!3m2!1sid!2sid!4v1234567890" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
            'logo' => 'images/logo-tribuana.png',
            'tahun_berdiri' => 2010,
            'facebook' => 'https://facebook.com/tribuanasecurity',
            'instagram' => 'https://instagram.com/tribuanasecurity',
            'twitter' => 'https://twitter.com/tribuanasec',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
