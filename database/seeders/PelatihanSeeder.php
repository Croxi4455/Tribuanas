<?php

namespace Database\Seeders;

/**
 * Seeder: Pelatihan
 * 3 Kompetensi Dasar: Gada Pratama, Gada Madya, Gada Utama
 * 3 Kompetensi Khusus: Penjinakan Bom, Pengawalan VIP, Pengamanan Perbankan
 */

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PelatihanSeeder extends Seeder
{
    public function run(): void
    {
        $pelatihan = [
            [
                'judul' => 'Gada Pratama',
                'jenis' => 'kompetensi_dasar',
                'deskripsi' => 'Pelatihan dasar bagi calon tenaga pengamanan sesuai standar POLRI dan BNSP. Materi: pengetahuan dasar keamanan, P3K, bela diri dasar, penggunaan HT, prosedur pelaporan, etika profesi satpam, serta pengenalan hukum keamanan. Lulusan mendapat sertifikat Gada Pratama nasional.',
                'durasi' => '232 Jam (± 1 Bulan)',
                'gambar' => 'images/pelatihan/gada-pratama.jpg',
                'is_active' => true,
            ],
            [
                'judul' => 'Gada Madya',
                'jenis' => 'kompetensi_dasar',
                'deskripsi' => 'Pelatihan menengah untuk anggota security bersertifikat Gada Pratama dengan pengalaman 3 tahun. Materi: manajemen pengamanan, analisis ancaman, investigasi dasar, CCTV, crowd control, dan supervisi tim. Lulusan berkualifikasi sebagai Chief Security.',
                'durasi' => '160 Jam (± 3 Minggu)',
                'gambar' => 'images/pelatihan/gada-madya.jpg',
                'is_active' => true,
            ],
            [
                'judul' => 'Gada Utama',
                'jenis' => 'kompetensi_dasar',
                'deskripsi' => 'Pelatihan lanjut untuk manajer keamanan. Materi: perencanaan strategis, manajemen risiko, security audit, crisis management, teknologi keamanan terkini, dan penyusunan Security Master Plan. Lulusan berkualifikasi sebagai Security Manager/Consultant.',
                'durasi' => '100 Jam (± 2 Minggu)',
                'gambar' => 'images/pelatihan/gada-utama.jpg',
                'is_active' => true,
            ],
            [
                'judul' => 'Penjinakan Bom (EOD/Bomb Disposal)',
                'jenis' => 'kompetensi_khusus',
                'deskripsi' => 'Pelatihan penanganan benda mencurigakan. Materi: identifikasi bahan peledak, prosedur evakuasi, sweeping area, alat deteksi, koordinasi tim Gegana POLRI, dan simulasi ancaman bom. Untuk personel di area berisiko tinggi.',
                'durasi' => '5 Hari',
                'gambar' => 'images/pelatihan/penjinakan-bom.jpg',
                'is_active' => true,
            ],
            [
                'judul' => 'Pengawalan VIP (VIP Protection)',
                'jenis' => 'kompetensi_khusus',
                'deskripsi' => 'Pelatihan pengawalan pribadi untuk eksekutif dan tokoh penting. Materi: advance team procedure, close protection, route analysis, defensive driving, threat assessment, evakuasi darurat, dan komunikasi taktis. Lulusan siap sebagai bodyguard profesional.',
                'durasi' => '7 Hari',
                'gambar' => 'images/pelatihan/pengawalan-vip.jpg',
                'is_active' => true,
            ],
            [
                'judul' => 'Pengamanan Perbankan',
                'jenis' => 'kompetensi_khusus',
                'deskripsi' => 'Pelatihan pengamanan lembaga keuangan. Materi: pengamanan vault/brankas, pengawasan ATM, robbery response, cash-in-transit, identifikasi perilaku mencurigakan, sistem keamanan perbankan, dan koordinasi dengan bank serta kepolisian.',
                'durasi' => '5 Hari',
                'gambar' => 'images/pelatihan/pengamanan-perbankan.jpg',
                'is_active' => true,
            ],
        ];

        foreach ($pelatihan as $item) {
            DB::table('pelatihan')->insert([
                'judul' => $item['judul'],
                'jenis' => $item['jenis'],
                'deskripsi' => $item['deskripsi'],
                'gambar' => $item['gambar'],
                'durasi' => $item['durasi'],
                'is_active' => $item['is_active'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
