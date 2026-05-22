import { Head, Link } from '@inertiajs/react';
import { GraduationCap, BookOpen, Clock, Award, ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import CompanyLayout from '@/layouts/company-layout';

type Pelatihan = {
    id: number;
    judul: string;
    jenis: 'kompetensi_dasar' | 'kompetensi_khusus';
    deskripsi: string;
    gambar: string | null;
    gambar_url?: string | null;
    durasi: string;
    is_active: boolean;
};

type Props = {
    profil: any;
    pelatihan: Pelatihan;
    pelatihanLainnya: Pelatihan[];
};

const MATERI_DASAR = [
    'Peraturan perundang-undangan keamanan',
    'Teknik bela diri dasar',
    'Prosedur pengamanan standar',
    'Etika dan profesionalisme',
    'Pertolongan pertama (P3K)',
    'Penggunaan peralatan keamanan',
];

const MATERI_KHUSUS = [
    'Teknik pengamanan khusus',
    'Analisis ancaman & risiko',
    'Koordinasi dengan aparat',
    'Prosedur darurat & evakuasi',
    'Komunikasi taktis',
    'Simulasi skenario lapangan',
];

export default function PelatihanDetailPage({ profil, pelatihan, pelatihanLainnya }: Props) {
    const imgSrc = pelatihan.gambar_url || `https://picsum.photos/1200/600?grayscale&random=${pelatihan.id + 50}`;
    const isDasar = pelatihan.jenis === 'kompetensi_dasar';
    const materi = isDasar ? MATERI_DASAR : MATERI_KHUSUS;

    return (
        <>
            <Head title={`${pelatihan.judul} — Tribuana Security`} />
            <CompanyLayout
                profil={profil}
                title={pelatihan.judul}
                subtitle="Pelatihan"
                image={imgSrc}
            >
                <section className="py-16 lg:py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">

                        <Link
                            href="/pelatihan"
                            className="mb-10 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-[#F5B800]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Pelatihan
                        </Link>

                        <div className="grid gap-12 lg:grid-cols-3">

                            {/* ── Konten Utama ── */}
                            <div className="lg:col-span-2">
                                {/* Header */}
                                <div className="mb-8 flex items-start gap-5">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#F5B800]/20 bg-[#F5B800]/10">
                                        {isDasar
                                            ? <GraduationCap className="h-8 w-8 text-[#F5B800]" />
                                            : <BookOpen className="h-8 w-8 text-[#F5B800]" />
                                        }
                                    </div>
                                    <div>
                                        <span className={`mb-2 inline-block rounded px-2.5 py-1 text-[10px] font-black tracking-[0.2em] uppercase ${
                                            isDasar
                                                ? 'border border-[#F5B800]/20 bg-[#F5B800]/10 text-[#F5B800]/80'
                                                : 'border border-white/10 bg-white/5 text-white/50'
                                        }`}>
                                            {isDasar ? 'Kompetensi Dasar' : 'Kompetensi Khusus'}
                                        </span>
                                        <h1 className="text-2xl font-black text-white uppercase lg:text-3xl">{pelatihan.judul}</h1>
                                    </div>
                                </div>

                                {/* Info badges */}
                                <div className="mb-8 flex flex-wrap gap-3">
                                    <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/3 px-4 py-2.5 text-sm">
                                        <Clock className="h-4 w-4 text-[#F5B800]/60" />
                                        <span className="font-bold text-white/70">{pelatihan.durasi}</span>
                                    </div>
                                    <div className="flex items-center gap-2 rounded-lg border border-[#F5B800]/15 bg-[#F5B800]/8 px-4 py-2.5 text-sm">
                                        <Award className="h-4 w-4 text-[#F5B800]" />
                                        <span className="font-bold text-[#F5B800]/80">Bersertifikat Polri</span>
                                    </div>
                                </div>

                                {/* Deskripsi */}
                                <div className="mb-8 rounded-2xl border border-white/5 bg-white/3 p-8">
                                    <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-headings:font-black prose-p:text-white/65 prose-p:leading-relaxed prose-a:text-[#F5B800] prose-strong:text-white prose-li:text-white/65" dangerouslySetInnerHTML={{ __html: pelatihan.deskripsi }} />
                                </div>

                                {/* Materi */}
                                <div>
                                    <h3 className="mb-5 text-sm font-black tracking-[0.2em] text-white/50 uppercase">Materi Pelatihan</h3>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {materi.map((m) => (
                                            <div key={m} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/3 px-5 py-3.5">
                                                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F5B800]" />
                                                <span className="text-sm text-white/65">{m}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="mt-10">
                                    <Link
                                        href="/kontak"
                                        className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-[#F5B800] to-[#E0A800] px-8 py-4 text-sm font-bold tracking-widest text-[#111111] uppercase shadow-lg shadow-[#F5B800]/20 transition-all hover:shadow-xl active:scale-95"
                                    >
                                        Daftar Program Ini
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>

                            {/* ── Sidebar ── */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <h3 className="mb-6 text-xs font-black tracking-[0.25em] text-white/40 uppercase">
                                        Program Lainnya
                                    </h3>
                                    <div className="space-y-3">
                                        {pelatihanLainnya.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/pelatihan/${item.id}`}
                                                className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/3 p-4 transition-all hover:border-[#F5B800]/20"
                                            >
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#F5B800]/15 bg-[#F5B800]/8">
                                                    {item.jenis === 'kompetensi_dasar'
                                                        ? <GraduationCap className="h-5 w-5 text-[#F5B800]/70" />
                                                        : <BookOpen className="h-5 w-5 text-[#F5B800]/70" />
                                                    }
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-bold text-white/60 transition-colors group-hover:text-white">
                                                        {item.judul}
                                                    </p>
                                                    <p className="text-xs text-white/30">{item.durasi}</p>
                                                </div>
                                                <ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 text-white/20 transition-colors group-hover:text-[#F5B800]/60" />
                                            </Link>
                                        ))}
                                    </div>

                                    <Link
                                        href="/pelatihan"
                                        className="mt-6 flex items-center gap-2 text-xs font-bold tracking-widest text-[#F5B800]/60 uppercase transition-colors hover:text-[#F5B800]"
                                    >
                                        Lihat Semua Program
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </CompanyLayout>
        </>
    );
}
