import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { GraduationCap, Clock, Award, BookOpen, ChevronRight } from 'lucide-react';
import CompanyLayout from '@/layouts/company-layout';

type Pelatihan = {
    id: number;
    judul: string;
    jenis: 'kompetensi_dasar' | 'kompetensi_khusus';
    deskripsi: string;
    durasi: string;
    is_active: boolean;
};

type Props = {
    profil: any;
    pelatihan: Pelatihan[];
};

const DUMMY: Pelatihan[] = [
    { id: 1, judul: 'Gada Pratama', jenis: 'kompetensi_dasar', deskripsi: 'Pelatihan dasar satuan pengamanan untuk calon personel baru. Mencakup bela diri, prosedur keamanan, etika profesi, dan peraturan perundang-undangan.', durasi: '232 Jam', is_active: true },
    { id: 2, judul: 'Gada Madya', jenis: 'kompetensi_dasar', deskripsi: 'Peningkatan kompetensi untuk supervisor keamanan. Manajemen tim, analisis risiko, koordinasi operasional, dan kepemimpinan lapangan.', durasi: '280 Jam', is_active: true },
    { id: 3, judul: 'Gada Utama', jenis: 'kompetensi_dasar', deskripsi: 'Sertifikasi tertinggi untuk manajer keamanan. Strategi pengamanan, manajemen krisis, kepemimpinan operasional, dan hubungan dengan stakeholder.', durasi: '320 Jam', is_active: true },
    { id: 4, judul: 'Penjinakan Bom', jenis: 'kompetensi_khusus', deskripsi: 'Pelatihan khusus penanganan ancaman bom dan bahan berbahaya. Prosedur evakuasi, identifikasi ancaman, dan koordinasi dengan aparat berwenang.', durasi: '120 Jam', is_active: true },
    { id: 5, judul: 'Pengawalan VIP', jenis: 'kompetensi_khusus', deskripsi: 'Teknik pengawalan pejabat dan tokoh penting. Protokol keamanan, formasi pengawalan, penanganan ancaman, dan koordinasi dengan Paspampres.', durasi: '160 Jam', is_active: true },
    { id: 6, judul: 'Pengamanan Perbankan', jenis: 'kompetensi_khusus', deskripsi: 'Prosedur keamanan khusus untuk lingkungan perbankan. Penanganan uang tunai, CCTV monitoring, respons insiden, dan koordinasi dengan kepolisian.', durasi: '100 Jam', is_active: true },
];

const TABS = [
    { value: 'semua', label: 'Semua Program' },
    { value: 'kompetensi_dasar', label: 'Kompetensi Dasar' },
    { value: 'kompetensi_khusus', label: 'Kompetensi Khusus' },
];

export default function PelatihanPage({ profil, pelatihan }: Props) {
    const [active, setActive] = useState('semua');
    const data = pelatihan.length > 0 ? pelatihan : DUMMY;
    const filtered = active === 'semua' ? data : data.filter((p) => p.jenis === active);

    return (
        <>
            <Head title="Pelatihan — Tribuana Security" />
            <CompanyLayout profil={profil} title="Program Pelatihan" subtitle="Pelatihan" image="https://picsum.photos/1920/600?grayscale&random=32">

                {/* ── Intro ── */}
                <section className="py-16 lg:py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="max-w-2xl">
                            <p className="text-lg leading-relaxed text-white/55">
                                Program pelatihan kami dirancang sesuai standar Polri untuk menghasilkan personel keamanan yang kompeten, profesional, dan siap menghadapi berbagai tantangan di lapangan.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Tabs + Cards ── */}
                <section className="pb-20 lg:pb-28">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        {/* Tabs */}
                        <div className="mb-10 flex flex-wrap gap-2">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.value}
                                    onClick={() => setActive(tab.value)}
                                    className={`rounded-lg px-6 py-2.5 text-sm font-bold tracking-widest uppercase transition-all ${
                                        active === tab.value
                                            ? 'bg-[#C9A84C] text-[#0D1B2A] shadow-lg shadow-[#C9A84C]/20'
                                            : 'border border-white/10 text-white/50 hover:border-white/20 hover:text-white'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Cards */}
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-7 transition-all hover:-translate-y-1 hover:border-[#C9A84C]/20 hover:shadow-xl hover:shadow-[#C9A84C]/8"
                                >
                                    <div className="mb-6 flex items-start justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/10">
                                            {item.jenis === 'kompetensi_dasar'
                                                ? <GraduationCap className="h-6 w-6 text-[#C9A84C]" />
                                                : <BookOpen className="h-6 w-6 text-[#C9A84C]" />
                                            }
                                        </div>
                                        <span className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase ${
                                            item.jenis === 'kompetensi_dasar'
                                                ? 'border border-blue-500/20 bg-blue-500/10 text-blue-400'
                                                : 'border border-purple-500/20 bg-purple-500/10 text-purple-400'
                                        }`}>
                                            {item.jenis === 'kompetensi_dasar' ? 'Dasar' : 'Khusus'}
                                        </span>
                                    </div>
                                    <h3 className="mb-3 text-lg font-black tracking-tight text-white uppercase">{item.judul}</h3>
                                    <p className="mb-6 text-sm leading-relaxed text-white/45">{item.deskripsi}</p>
                                    <div className="flex items-center justify-between border-t border-white/5 pt-5">
                                        <div className="flex items-center gap-1.5 text-xs text-white/35">
                                            <Clock className="h-3.5 w-3.5 text-[#C9A84C]/60" />
                                            {item.durasi}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs font-bold text-[#C9A84C]/50 uppercase tracking-wider group-hover:text-[#C9A84C] transition-colors">
                                            <Award className="h-3.5 w-3.5" />
                                            Bersertifikat
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[#C9A84C]/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="bg-[#111827] py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="flex flex-col items-center gap-6 text-center">
                            <h3 className="text-2xl font-black tracking-tight text-white uppercase lg:text-4xl">
                                Daftarkan Personel Anda
                            </h3>
                            <p className="max-w-lg text-base text-white/50">
                                Tingkatkan kompetensi tim keamanan Anda dengan program pelatihan bersertifikat Polri
                            </p>
                            <Link
                                href="/kontak"
                                className="flex items-center gap-2 rounded-lg bg-linear-to-r from-[#C9A84C] to-[#B8973F] px-8 py-4 text-sm font-bold tracking-widest text-[#0D1B2A] uppercase shadow-lg shadow-[#C9A84C]/20 transition-all hover:shadow-xl active:scale-95"
                            >
                                Daftar Sekarang
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>

            </CompanyLayout>
        </>
    );
}
