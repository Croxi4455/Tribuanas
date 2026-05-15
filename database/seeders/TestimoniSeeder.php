<?php

namespace Database\Seeders;

/**
 * Seeder: Testimoni
 * Mengisi 8 testimoni dummy dari klien perusahaan pengamanan
 * Menggunakan Faker id_ID untuk nama dan konten Indonesia
 */

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestimoniSeeder extends Seeder
{
    public function run(): void
    {
        $testimoni = [
            [
                'nama' => 'Budi Santoso',
                'jabatan' => 'General Manager',
                'perusahaan' => 'PT Bank Mandiri (Persero) Tbk',
                'isi' => 'Kami sangat puas dengan layanan pengamanan dari Tribuana. Personel yang ditempatkan di kantor cabang kami sangat profesional, disiplin, dan responsif terhadap situasi darurat. Sudah 5 tahun bekerjasama dan tidak pernah mengecewakan.',
                'rating' => 5,
            ],
            [
                'nama' => 'Siti Rahayu',
                'jabatan' => 'Direktur Operasional',
                'perusahaan' => 'RS Pondok Indah Group',
                'isi' => 'Tim security Tribuana memiliki kemampuan komunikasi yang baik dengan pasien dan pengunjung rumah sakit. Mereka memahami betul bahwa lingkungan rumah sakit memerlukan pendekatan yang berbeda dalam hal pengamanan.',
                'rating' => 5,
            ],
            [
                'nama' => 'Hendra Wijaya',
                'jabatan' => 'Head of Security',
                'perusahaan' => 'PT Astra International Tbk',
                'isi' => 'Tribuana konsisten memberikan personel yang berkualitas dan sudah tersertifikasi. Sistem pelaporan mereka juga terdigitalisasi sehingga memudahkan kami dalam monitoring. Sangat direkomendasikan untuk perusahaan besar.',
                'rating' => 5,
            ],
            [
                'nama' => 'Dewi Kusuma',
                'jabatan' => 'Building Manager',
                'perusahaan' => 'Lippo Mall Kemang',
                'isi' => 'Pengamanan di area mall membutuhkan keahlian khusus dalam menangani pengunjung. Tim Tribuana sangat terlatih dan bisa menangani berbagai situasi dengan tenang dan profesional. Kami sangat puas.',
                'rating' => 4,
            ],
            [
                'nama' => 'Ahmad Fauzi',
                'jabatan' => 'Kepala Bagian Umum',
                'perusahaan' => 'Universitas Indonesia',
                'isi' => 'Sejak menggunakan jasa Tribuana, keamanan lingkungan kampus meningkat signifikan. Personel mereka ramah namun tegas, dan mampu beradaptasi dengan lingkungan akademik yang dinamis.',
                'rating' => 4,
            ],
            [
                'nama' => 'Ratna Permata',
                'jabatan' => 'Event Director',
                'perusahaan' => 'PT Dyandra Promosindo',
                'isi' => 'Kami sudah beberapa kali menggunakan jasa security event dari Tribuana untuk pameran berskala nasional. Koordinasi lapangan mereka sangat baik, dan mereka selalu siap dengan contingency plan.',
                'rating' => 5,
            ],
            [
                'nama' => 'Irwan Setiawan',
                'jabatan' => 'Plant Manager',
                'perusahaan' => 'PT Semen Indonesia (Persero) Tbk',
                'isi' => 'Untuk pengamanan kawasan industri, Tribuana adalah pilihan tepat. Mereka memahami SOP keselamatan kerja di area pabrik dan mampu berkoordinasi dengan tim HSE internal kami dengan baik.',
                'rating' => 4,
            ],
            [
                'nama' => 'Lina Marlina',
                'jabatan' => 'General Affairs Manager',
                'perusahaan' => 'Hotel Grand Hyatt Jakarta',
                'isi' => 'Standar pelayanan security di hotel bintang lima sangat tinggi. Tribuana berhasil memenuhi ekspektasi kami dengan personel yang berpenampilan rapi, sopan, dan mampu berkomunikasi dalam bahasa Inggris dasar.',
                'rating' => 5,
            ],
        ];

        foreach ($testimoni as $index => $item) {
            DB::table('testimoni')->insert([
                'nama' => $item['nama'],
                'jabatan' => $item['jabatan'],
                'perusahaan' => $item['perusahaan'],
                'foto' => 'images/testimoni/foto-' . ($index + 1) . '.jpg',
                'isi' => $item['isi'],
                'rating' => $item['rating'],
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
