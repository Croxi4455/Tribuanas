<?php

namespace Database\Seeders;

/**
 * Seeder: Layanan
 * Mengisi 5 layanan utama perusahaan pengamanan:
 * Security Guard, Security Escort, Security Event, Cleaning Service, Driver
 */

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class LayananSeeder extends Seeder
{
    public function run(): void
    {
        $layanan = [
            [
                'nama' => 'Security Guard',
                'deskripsi' => 'Layanan penyediaan tenaga pengamanan profesional untuk gedung perkantoran, kawasan industri, perumahan, dan fasilitas komersial. Personel kami telah tersertifikasi Gada Pratama, Gada Madya, hingga Gada Utama sesuai standar POLRI dan BNSP. Setiap anggota dibekali pelatihan intensif meliputi prosedur pengamanan, penanganan darurat, pertolongan pertama (P3K), dan komunikasi profesional.',
                'icon' => 'shield-check',
                'urutan' => 1,
            ],
            [
                'nama' => 'Security Escort',
                'deskripsi' => 'Layanan pengawalan dan pengamanan perjalanan untuk eksekutif, VIP, serta pengiriman barang berharga. Tim escort kami terdiri dari personel terlatih khusus dalam teknik pengawalan konvoi, analisis rute perjalanan, deteksi ancaman, dan penanganan situasi darurat di perjalanan. Dilengkapi dengan kendaraan operasional dan sistem komunikasi terintegrasi.',
                'icon' => 'car-front',
                'urutan' => 2,
            ],
            [
                'nama' => 'Security Event',
                'deskripsi' => 'Layanan pengamanan acara berskala kecil hingga besar seperti konser, seminar, pameran, pernikahan, dan acara korporat. Tim kami berpengalaman dalam crowd management, pengaturan akses masuk, pemeriksaan keamanan (security check), serta koordinasi dengan pihak kepolisian dan instansi terkait untuk memastikan acara berjalan aman dan lancar.',
                'icon' => 'calendar-event',
                'urutan' => 3,
            ],
            [
                'nama' => 'Cleaning Service',
                'deskripsi' => 'Layanan kebersihan profesional untuk gedung perkantoran, rumah sakit, pusat perbelanjaan, dan fasilitas umum. Tenaga kerja kami terlatih dalam penggunaan peralatan dan bahan pembersih standar industri, penanganan limbah, serta penerapan protokol kebersihan dan kesehatan lingkungan kerja. Tersedia paket harian, mingguan, dan bulanan.',
                'icon' => 'sparkles',
                'urutan' => 4,
            ],
            [
                'nama' => 'Driver / Pengemudi',
                'deskripsi' => 'Layanan penyediaan pengemudi profesional untuk kebutuhan operasional perusahaan maupun pribadi. Pengemudi kami memiliki SIM yang valid, berpenampilan rapi, memahami rute jalan, serta terlatih dalam defensive driving dan etika pelayanan. Cocok untuk kebutuhan antar-jemput eksekutif, operasional kantor, maupun perjalanan dinas.',
                'icon' => 'steering-wheel',
                'urutan' => 5,
            ],
        ];

        foreach ($layanan as $item) {
            DB::table('layanan')->insert([
                'nama' => $item['nama'],
                'slug' => Str::slug($item['nama']),
                'deskripsi' => $item['deskripsi'],
                'icon' => $item['icon'],
                'urutan' => $item['urutan'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
