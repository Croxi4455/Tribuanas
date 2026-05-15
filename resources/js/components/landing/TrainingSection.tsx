import { useEffect, useRef, useState } from 'react';
import { Clock, Award, ChevronRight } from 'lucide-react';

type Pelatihan = {
    id: number;
    judul: string;
    jenis: 'kompetensi_dasar' | 'kompetensi_khusus';
    deskripsi: string;
    durasi: string;
    is_active: boolean;
};

type Props = {
    pelatihan: Pelatihan[];
};

const DUMMY_PELATIHAN: Pelatihan[] = [
    { id: 1, judul: 'Gada Pratama', jenis: 'kompetensi_dasar', deskripsi: 'Pelatihan dasar satuan pengamanan untuk calon personel baru. Mencakup bela diri, prosedur keamanan, dan etika profesi.', durasi: '232 Jam', is_active: true },
    { id: 2, judul: 'Gada Madya', jenis: 'kompetensi_dasar', deskripsi: 'Peningkatan kompetensi untuk supervisor keamanan. Manajemen tim, analisis risiko, dan koordinasi operasional.', durasi: '280 Jam', is_active: true },
    { id: 3, judul: 'Gada Utama', jenis: 'kompetensi_dasar', deskripsi: 'Sertifikasi tertinggi untuk manajer keamanan. Strategi pengamanan, manajemen krisis, dan kepemimpinan operasional.', durasi: '320 Jam', is_active: true },
    { id: 4, judul: 'Penjinakan Bom', jenis: 'kompetensi_khusus', deskripsi: 'Pelatihan khusus penanganan ancaman bom dan bahan berbahaya. Prosedur evakuasi dan koordinasi dengan aparat.', durasi: '120 Jam', is_active: true },
    { id: 5, judul: 'Pengawalan VIP', jenis: 'kompetensi_khusus', deskripsi: 'Teknik pengawalan pejabat dan tokoh penting. Protokol keamanan, formasi pengawalan, dan penanganan ancaman.', durasi: '160 Jam', is_active: true },
    { id: 6, judul: 'Pengamanan Perbankan', jenis: 'kompetensi_khusus', deskripsi: 'Prosedur keamanan khusus untuk lingkungan perbankan. Penanganan uang tunai, CCTV monitoring, dan respons insiden.', durasi: '100 Jam', is_active: true },
];

const TABS = [
    { value: 'semua', label: 'Semua Program' },
    { value: 'kompetensi_dasar', label: 'Kompetensi Dasar' },
    { value: 'kompetensi_khusus', label: 'Kompetensi Khusus' },
];

export default function TrainingSection({ pelatihan }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState('semua');
    const data = pelatihan.length > 0 ? pelatihan : DUMMY_PELATIHAN;

    const filtered = active === 'semua' ? data : data.filter((p) => p.jenis === active);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="pelatihan" ref={sectionRef} className="relative overflow-hidden bg-[#0A0A0A] py-28 lg:py-36">

            {/* Background */}
            <div className="absolute left-0 top-1/2 h-[400px] w-[400px] -translate-x-1/3 -translate-y-1/2 rounded-full bg-[#C9A84C]/4 blur-[100px]" />
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: 'repeating-linear-gradient(-45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)',
                    backgroundSize: '20px 20px',
                }}
            />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                {/* ── Header ── */}
                <div className={`mb-16 transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-12 bg-[#C9A84C]" />
                        <span className="text-xs font-bold tracking-[0.3em] text-[#C9A84C] uppercase">Program Pelatihan</span>
                    </div>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <h2 className="text-4xl font-black leading-tight tracking-tight text-white lg:text-6xl uppercase">
                            Kompetensi
                            <br />
                            <span className="text-[#C9A84C]">Terstandarisasi</span>
                        </h2>
                        <p className="max-w-sm text-base text-white/50">
                            Program pelatihan bersertifikat Polri untuk membangun personel keamanan berkelas dunia
                        </p>
                    </div>
                </div>

                {/* ── Tabs ── */}
                <div className={`mb-12 flex flex-wrap gap-2 transition-all duration-700 delay-200 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    {TABS.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActive(tab.value)}
                            className={`rounded-lg px-4 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-200 sm:px-6 sm:text-sm ${
                                active === tab.value
                                    ? 'bg-[#C9A84C] text-[#0D1B2A] shadow-lg shadow-[#C9A84C]/20'
                                    : 'border border-white/10 text-white/50 hover:border-white/20 hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ── Cards ── */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((item, i) => (
                        <div
                            key={item.id}
                            className={`group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:border-[#C9A84C]/25 hover:bg-white/[0.04] ${
                                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                            style={{ transitionDelay: `${300 + i * 80}ms` }}
                        >
                            {/* Gold left accent bar */}
                            <div className="absolute left-0 top-0 h-full w-[3px] bg-linear-to-b from-[#C9A84C]/0 via-[#C9A84C]/60 to-[#C9A84C]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="p-7">
                                {/* Top row: number + badge */}
                                <div className="mb-5 flex items-center justify-between">
                                    <span className="font-black text-[#C9A84C]/15 text-5xl leading-none select-none">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className={`rounded px-2.5 py-1 text-[9px] font-black tracking-[0.2em] uppercase ${
                                        item.jenis === 'kompetensi_dasar'
                                            ? 'bg-[#C9A84C]/10 text-[#C9A84C]/70 border border-[#C9A84C]/15'
                                            : 'bg-white/5 text-white/40 border border-white/8'
                                    }`}>
                                        {item.jenis === 'kompetensi_dasar' ? 'Dasar' : 'Khusus'}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="mb-2.5 text-lg font-black tracking-tight text-white uppercase leading-tight">
                                    {item.judul}
                                </h3>

                                {/* Divider */}
                                <div className="mb-4 h-px w-8 bg-[#C9A84C]/40" />

                                {/* Description */}
                                <p className="line-clamp-3 text-sm leading-relaxed text-white/40">
                                    {item.deskripsi}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between border-t border-white/[0.05] px-7 py-4">
                                <div className="flex items-center gap-2 text-xs text-white/30">
                                    <Clock className="h-3.5 w-3.5 text-[#C9A84C]/50" />
                                    <span className="font-bold text-white/50">{item.durasi}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.15em] text-white/20 uppercase transition-colors group-hover:text-[#C9A84C]/60">
                                    <Award className="h-3 w-3" />
                                    Polri
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── CTA ── */}
                <div className={`mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center transition-all duration-700 delay-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <button
                        onClick={() => document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group flex items-center gap-2 rounded-lg bg-linear-to-r from-[#C9A84C] to-[#B8973F] px-8 py-4 text-sm font-bold tracking-widest text-[#0D1B2A] uppercase shadow-lg shadow-[#C9A84C]/20 transition-all hover:shadow-xl hover:shadow-[#C9A84C]/30 active:scale-95"
                    >
                        Daftar Pelatihan Sekarang
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </section>
    );
}
