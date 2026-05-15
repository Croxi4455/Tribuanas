<?php

namespace Database\Seeders;

/**
 * Seeder: Kontak Masuk
 * Mengisi 10 pesan masuk dummy dari form kontak website
 * Menggunakan Faker id_ID untuk data realistis Indonesia
 */

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KontakMasukSeeder extends Seeder
{
    public function run(): void
    {
        $faker = \Faker\Factory::create('id_ID');

        $pesan = [
            [
                'nama' => 'Andi Prasetyo',
                'email' => 'andi.prasetyo@gmail.com',
                'telepon' => '081234567890',
                'subjek' => 'Permintaan Penawaran Security Guard',
                'pesan' => 'Selamat pagi, kami dari PT Maju Bersama ingin meminta penawaran harga untuk 10 personel security guard untuk gedung perkantoran kami di kawasan Sudirman, Jakarta. Mohon informasi lengkap dan jadwal survey. Terima kasih.',
                'is_read' => true,
            ],
            [
                'nama' => 'Rina Wulandari',
                'email' => 'rina.wulan@yahoo.co.id',
                'telepon' => '087812345678',
                'subjek' => 'Info Pelatihan Gada Pratama',
                'pesan' => 'Saya ingin bertanya mengenai jadwal pelatihan Gada Pratama terdekat. Apakah ada kelas yang dibuka dalam waktu dekat? Berapa biaya pendaftarannya? Mohon info lengkapnya. Terima kasih.',
                'is_read' => true,
            ],
            [
                'nama' => 'Herman Susilo',
                'email' => 'herman.s@perusahaan.co.id',
                'telepon' => '082198765432',
                'subjek' => 'Kerjasama Pengamanan Event',
                'pesan' => 'Kami berencana mengadakan acara gathering perusahaan dengan 500 peserta di Hotel Mulia Jakarta pada bulan depan. Apakah Tribuana menyediakan jasa security event? Mohon kirimkan proposal dan harga. Terima kasih.',
                'is_read' => true,
            ],
            [
                'nama' => 'Sari Indah',
                'email' => 'sari.indah@outlook.com',
                'telepon' => null,
                'subjek' => 'Lowongan Kerja Satpam',
                'pesan' => 'Saya ingin melamar sebagai satpam di Tribuana. Saya sudah memiliki sertifikat Gada Pratama dan pengalaman 2 tahun. Bagaimana cara mendaftar? Apakah bisa langsung datang ke kantor?',
                'is_read' => false,
            ],
            [
                'nama' => 'Dedi Kurniawan',
                'email' => 'dedi.k@gmail.com',
                'telepon' => '085678901234',
                'subjek' => 'Permintaan Cleaning Service',
                'pesan' => 'Apakah Tribuana juga menyediakan jasa cleaning service untuk gedung apartemen? Kami membutuhkan 5 tenaga kebersihan untuk apartemen 20 lantai di area BSD Tangerang. Mohon informasi harga dan ketersediaan.',
                'is_read' => false,
            ],
            [
                'nama' => 'Maya Anggraini',
                'email' => 'maya.anggraini@company.com',
                'telepon' => '081345678901',
                'subjek' => 'Pengawalan VIP Direksi',
                'pesan' => 'Perusahaan kami membutuhkan jasa pengawalan untuk direksi selama kunjungan kerja ke Surabaya selama 3 hari. Mohon informasi mengenai paket pengawalan VIP dan syarat-syaratnya.',
                'is_read' => false,
            ],
            [
                'nama' => 'Bambang Widodo',
                'email' => 'bambang.w@instansi.go.id',
                'telepon' => '081567890123',
                'subjek' => 'Penawaran Kerjasama Jangka Panjang',
                'pesan' => 'Kami dari instansi pemerintah ingin menjalin kerjasama pengamanan jangka panjang (kontrak 1 tahun). Mohon kirimkan company profile dan daftar harga layanan ke email kami. Terima kasih atas perhatiannya.',
                'is_read' => false,
            ],
            [
                'nama' => 'Lisa Permatasari',
                'email' => 'lisa.permata@gmail.com',
                'telepon' => null,
                'subjek' => 'Komplain Pelayanan',
                'pesan' => 'Saya ingin menyampaikan keluhan mengenai salah satu personel security di gedung kantor kami. Mohon pihak manajemen dapat menghubungi saya untuk membahas masalah ini lebih lanjut.',
                'is_read' => false,
            ],
            [
                'nama' => 'Agus Firmansyah',
                'email' => 'agus.firman@developer.co.id',
                'telepon' => '089876543210',
                'subjek' => 'Security untuk Proyek Konstruksi',
                'pesan' => 'Kami membutuhkan 15 personel security untuk proyek pembangunan apartemen di Bekasi selama 18 bulan. Mohon informasi mengenai ketersediaan personel dan harga kontrak. Bisa meeting minggu depan?',
                'is_read' => false,
            ],
            [
                'nama' => 'Nurhaliza Putri',
                'email' => 'nurhaliza.p@sekolah.sch.id',
                'telepon' => '082234567890',
                'subjek' => 'Info Magang/PKL',
                'pesan' => 'Saya mahasiswa semester 6 jurusan Manajemen. Apakah Tribuana menerima mahasiswa magang untuk program PKL selama 3 bulan? Jika iya, bagaimana prosedur pendaftarannya? Terima kasih.',
                'is_read' => false,
            ],
        ];

        foreach ($pesan as $item) {
            DB::table('kontak_masuk')->insert([
                'nama' => $item['nama'],
                'email' => $item['email'],
                'telepon' => $item['telepon'],
                'subjek' => $item['subjek'],
                'pesan' => $item['pesan'],
                'is_read' => $item['is_read'],
                'created_at' => $faker->dateTimeBetween('-3 months', 'now'),
                'updated_at' => now(),
            ]);
        }
    }
}
