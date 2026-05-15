<?php

namespace Database\Seeders;

/**
 * Seeder: Karir
 * Mengisi 5 lowongan kerja dummy di perusahaan security
 */

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class KarirSeeder extends Seeder
{
    public function run(): void
    {
        $karir = [
            [
                'posisi' => 'Anggota Security (Satpam)',
                'deskripsi' => 'Bertanggung jawab atas pengamanan area kerja klien meliputi patroli, penjagaan pos, kontrol akses, dan pelaporan. Penempatan di gedung perkantoran, kawasan industri, dan pusat perbelanjaan di area Jabodetabek.',
                'syarat' => "- Pria/Wanita usia 20-35 tahun\n- Pendidikan minimal SMA/SMK sederajat\n- Tinggi badan minimal Pria 168 cm / Wanita 158 cm\n- Sehat jasmani dan rohani (surat keterangan dokter)\n- Tidak bertato dan tidak bertindik (pria)\n- Berkelakuan baik (SKCK aktif)\n- Memiliki sertifikat Gada Pratama (diutamakan)\n- Bersedia bekerja shift dan ditempatkan di seluruh Jabodetabek",
                'lokasi' => 'Jabodetabek',
                'status' => 'buka',
                'batas_daftar' => Carbon::now()->addMonths(2)->format('Y-m-d'),
            ],
            [
                'posisi' => 'Chief Security (Danru)',
                'deskripsi' => 'Memimpin dan mengkoordinasikan tim anggota security di area penugasan. Bertanggung jawab atas penjadwalan shift, evaluasi kinerja anggota, pelaporan harian ke manajemen, dan penanganan insiden.',
                'syarat' => "- Pria usia 25-40 tahun\n- Pendidikan minimal D3 semua jurusan\n- Memiliki sertifikat Gada Madya\n- Pengalaman minimal 3 tahun sebagai anggota security\n- Memiliki jiwa kepemimpinan dan komunikasi yang baik\n- Mampu mengoperasikan komputer (Ms. Office)\n- Bersedia bekerja shift\n- Memiliki kendaraan pribadi (diutamakan)",
                'lokasi' => 'Jakarta',
                'status' => 'buka',
                'batas_daftar' => Carbon::now()->addMonths(1)->format('Y-m-d'),
            ],
            [
                'posisi' => 'Staff Administrasi & HRD',
                'deskripsi' => 'Mengelola administrasi kepegawaian, absensi, penggajian, dan rekrutmen anggota security baru. Berkoordinasi dengan divisi operasional terkait penempatan dan rotasi personel.',
                'syarat' => "- Pria/Wanita usia 22-30 tahun\n- Pendidikan minimal S1 Manajemen/Psikologi/Hukum\n- Pengalaman minimal 1 tahun di bidang HRD (fresh graduate dipertimbangkan)\n- Menguasai Ms. Office (Excel, Word, PowerPoint)\n- Teliti, rapi, dan mampu bekerja dengan deadline\n- Memahami UU Ketenagakerjaan\n- Berdomisili di Jakarta atau sekitarnya",
                'lokasi' => 'Jakarta Selatan',
                'status' => 'buka',
                'batas_daftar' => Carbon::now()->addWeeks(3)->format('Y-m-d'),
            ],
            [
                'posisi' => 'Instruktur Pelatihan Security',
                'deskripsi' => 'Melatih calon anggota security dalam program Gada Pratama, Gada Madya, dan pelatihan khusus. Menyusun modul pelatihan, mengevaluasi peserta, dan memastikan standar pelatihan sesuai regulasi POLRI/BNSP.',
                'syarat' => "- Pria usia 28-45 tahun\n- Pendidikan minimal D3 (diutamakan S1)\n- Memiliki sertifikat Gada Utama\n- Pengalaman minimal 5 tahun di bidang pengamanan\n- Pernah menjadi instruktur/trainer (dibuktikan dengan sertifikat)\n- Menguasai bela diri minimal 1 aliran\n- Memiliki kemampuan public speaking yang baik\n- Bersedia dinas luar kota",
                'lokasi' => 'Jakarta & Bandung',
                'status' => 'buka',
                'batas_daftar' => Carbon::now()->addMonths(1)->addWeeks(2)->format('Y-m-d'),
            ],
            [
                'posisi' => 'Driver Operasional',
                'deskripsi' => 'Mengemudikan kendaraan operasional perusahaan untuk keperluan patroli, pengawalan, antar-jemput personel, dan pengiriman dokumen. Memastikan kendaraan dalam kondisi prima dan siap pakai.',
                'syarat' => "- Pria usia 23-40 tahun\n- Pendidikan minimal SMA/SMK sederajat\n- Memiliki SIM A dan SIM B1 (diutamakan)\n- Pengalaman mengemudi minimal 2 tahun\n- Menguasai area Jabodetabek\n- Berpenampilan rapi dan sopan\n- Tidak memiliki catatan pelanggaran lalu lintas berat\n- Bersedia bekerja lembur dan di hari libur",
                'lokasi' => 'Jabodetabek',
                'status' => 'tutup',
                'batas_daftar' => Carbon::now()->subWeeks(1)->format('Y-m-d'),
            ],
        ];

        foreach ($karir as $item) {
            DB::table('karir')->insert([
                'posisi' => $item['posisi'],
                'deskripsi' => $item['deskripsi'],
                'syarat' => $item['syarat'],
                'lokasi' => $item['lokasi'],
                'status' => $item['status'],
                'batas_daftar' => $item['batas_daftar'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
