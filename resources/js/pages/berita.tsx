import { Head } from '@inertiajs/react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import CompanyLayout from '@/layouts/company-layout';

type Berita = {
    id: number;
    judul: string;
    slug: string;
    isi: string;
    gambar: string | null;
    tanggal_publish: string;
    is_published: boolean;
};

type Props = {
    profil: any;
    berita: Berita[];
};

const DUMMY: Berita[] = [
    { id: 1, judul: 'Tribuana Raih Penghargaan Perusahaan Keamanan Terbaik 2025', slug: 'penghargaan-2025', isi: 'PT Tribuana berhasil meraih penghargaan bergengsi sebagai perusahaan jasa keamanan terbaik dalam ajang Indonesia Security Awards 2025 yang diselenggarakan di Jakarta Convention Center. Penghargaan ini merupakan bukti nyata komitmen kami dalam memberikan layanan keamanan berkualitas tinggi.', gambar: null, tanggal_publish: '2025-11-10', is_published: true },
    { id: 2, judul: 'Peluncuran Program Pelatihan Gada Utama Angkatan ke-12', slug: 'pelatihan-gada-utama-12', isi: 'Tribuana resmi membuka pendaftaran Program Pelatihan Gada Utama Angkatan ke-12. Program ini dirancang untuk mencetak manajer keamanan profesional bersertifikat Polri dengan kurikulum yang telah diperbarui sesuai standar terkini.', gambar: null, tanggal_publish: '2025-10-22', is_published: true },
    { id: 3, judul: 'Kerjasama Strategis dengan 5 BUMN Baru di Kuartal IV 2025', slug: 'kerjasama-bumn-q4', isi: 'Tribuana menandatangani perjanjian kerjasama dengan lima Badan Usaha Milik Negara baru, memperluas jangkauan layanan keamanan ke sektor energi dan infrastruktur nasional. Penandatanganan dilakukan di Kantor Pusat Tribuana, Jakarta.', gambar: null, tanggal_publish: '2025-09-15', is_published: true },
    { id: 4, judul: 'Tribuana Perkuat Sistem Pengamanan Digital dengan Teknologi AI', slug: 'teknologi-ai-keamanan', isi: 'Dalam rangka meningkatkan kualitas layanan, Tribuana mengintegrasikan teknologi kecerdasan buatan dalam sistem monitoring keamanan. Inovasi ini memungkinkan deteksi ancaman lebih cepat dan akurat.', gambar: null, tanggal_publish: '2025-08-05', is_published: true },
    { id: 5, judul: 'Sertifikasi ISO 9001:2015 Berhasil Dipertahankan', slug: 'sertifikasi-iso-2025', isi: 'Tribuana kembali berhasil mempertahankan sertifikasi ISO 9001:2015 untuk sistem manajemen mutu. Audit dilakukan oleh lembaga sertifikasi internasional dan Tribuana mendapat nilai tertinggi dalam kategori layanan keamanan.', gambar: null, tanggal_publish: '2025-07-20', is_published: true },
    { id: 6, judul: 'Pelatihan Tanggap Darurat Bencana untuk 200 Personel', slug: 'pelatihan-tanggap-darurat', isi: 'Sebanyak 200 personel Tribuana mengikuti pelatihan tanggap darurat bencana yang diselenggarakan bekerja sama dengan BNPB. Pelatihan ini bertujuan meningkatkan kesiapsiagaan personel dalam menghadapi situasi darurat.', gambar: null, tanggal_publish: '2025-06-12', is_published: true },
];

export default function BeritaPage({ profil, berita }: Props) {
    const data = berita.length > 0 ? berita : DUMMY;

    const formatDate = (d: string) =>
        new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const [featured, ...rest] = data;

    return (
        <>
            <Head title="Berita — Tribuana Security" />
            <CompanyLayout profil={profil} title="Berita & Kegiatan" subtitle="Berita" image="https://picsum.photos/1920/600?grayscale&random=34">

                <section className="py-16 lg:py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">

                        {/* Featured article */}
                        {featured && (
                            <article className="group mb-8 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] transition-all hover:border-[#C9A84C]/20 lg:flex">
                                <div className="relative aspect-video shrink-0 overflow-hidden bg-[#0D1B2A] lg:aspect-auto lg:w-2/5">
                                    <img
                                        src={featured.gambar || `https://picsum.photos/800/500?grayscale&blur=1&random=${featured.id}`}
                                        alt={featured.judul}
                                        className="h-full w-full object-cover opacity-40 transition-all duration-500 group-hover:scale-105 group-hover:opacity-55"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#0D1B2A]/60" />
                                    <div className="absolute left-4 top-4 rounded-full bg-[#C9A84C] px-3 py-1 text-[10px] font-black tracking-widest text-[#0D1B2A] uppercase">
                                        Terbaru
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center p-8 lg:p-10">
                                    <div className="mb-3 flex items-center gap-1.5 text-xs text-white/35">
                                        <Calendar className="h-3.5 w-3.5 text-[#C9A84C]/60" />
                                        {formatDate(featured.tanggal_publish)}
                                    </div>
                                    <h2 className="mb-4 text-2xl font-black leading-snug tracking-tight text-white transition-colors group-hover:text-[#C9A84C] lg:text-3xl">
                                        {featured.judul}
                                    </h2>
                                    <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-white/45">
                                        {featured.isi.replace(/<[^>]*>/g, '')}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#C9A84C]/60 uppercase transition-all group-hover:text-[#C9A84C]">
                                        Baca Selengkapnya
                                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </div>
                                </div>
                            </article>
                        )}

                        {/* Rest of articles */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {rest.map((item) => (
                                <article
                                    key={item.id}
                                    className="group overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] transition-all hover:-translate-y-1 hover:border-[#C9A84C]/20 hover:shadow-xl hover:shadow-[#C9A84C]/8"
                                >
                                    <div className="relative aspect-video overflow-hidden bg-[#0D1B2A]">
                                        <img
                                            src={item.gambar || `https://picsum.photos/600/340?grayscale&blur=1&random=${item.id}`}
                                            alt={item.judul}
                                            className="h-full w-full object-cover opacity-40 transition-all duration-500 group-hover:scale-105 group-hover:opacity-55"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-[#0D1B2A]/80 to-transparent" />
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-3 flex items-center gap-1.5 text-xs text-white/30">
                                            <Calendar className="h-3.5 w-3.5 text-[#C9A84C]/50" />
                                            {formatDate(item.tanggal_publish)}
                                        </div>
                                        <h3 className="mb-3 line-clamp-2 text-base font-black leading-snug tracking-tight text-white transition-colors group-hover:text-[#C9A84C]">
                                            {item.judul}
                                        </h3>
                                        <p className="mb-5 line-clamp-2 text-sm text-white/40">
                                            {item.isi.replace(/<[^>]*>/g, '').substring(0, 100)}...
                                        </p>
                                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#C9A84C]/50 uppercase transition-all group-hover:text-[#C9A84C]">
                                            Baca Selengkapnya
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                    </div>
                </section>

            </CompanyLayout>
        </>
    );
}
