import { Head, Link } from '@inertiajs/react';
import { Briefcase, MapPin, Calendar, ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import CompanyLayout from '@/layouts/company-layout';

type Karir = {
    id: number;
    posisi: string;
    deskripsi: string;
    syarat: string;
    lokasi: string;
    status: string;
    batas_daftar: string;
};

type Props = {
    profil: any;
    karir: Karir;
    karirLainnya: Karir[];
};

export default function KarirDetailPage({ profil, karir, karirLainnya }: Props) {
    const formatDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const isExpired = new Date(karir.batas_daftar) < new Date() || karir.status === 'tutup';

    return (
        <>
            <Head title={`${karir.posisi} — Karir Tribuana Security`}>
                <meta name="description" content={`Lowongan ${karir.posisi} di ${karir.lokasi}. Batas pendaftaran ${formatDate(karir.batas_daftar)}.`} />
            </Head>
            <CompanyLayout
                profil={profil}
                title={karir.posisi}
                subtitle="Karir"
                image={`https://picsum.photos/1920/600?grayscale&random=${karir.id + 80}`}
            >
                <section className="py-16 lg:py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">

                        <Link
                            href="/karir"
                            className="mb-10 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-[#F5B800]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Karir
                        </Link>

                        <div className="grid gap-12 lg:grid-cols-3">

                            {/* ── Konten Utama ── */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Header */}
                                <div className="rounded-2xl border border-white/5 bg-white/3 p-8">
                                    <div className="mb-5 flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#F5B800]/20 bg-[#F5B800]/10">
                                                <Briefcase className="h-7 w-7 text-[#F5B800]" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold tracking-[0.3em] text-[#F5B800]/60 uppercase">Posisi</p>
                                                <h1 className="mt-1 text-2xl font-black text-white uppercase lg:text-3xl">{karir.posisi}</h1>
                                            </div>
                                        </div>
                                        <span className={`shrink-0 rounded px-3 py-1.5 text-[10px] font-bold uppercase ${
                                            isExpired
                                                ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                        }`}>
                                            {isExpired ? 'Ditutup' : 'Dibuka'}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-3 border-t border-white/5 pt-5">
                                        <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/3 px-4 py-2.5 text-sm">
                                            <MapPin className="h-4 w-4 text-[#F5B800]/60" />
                                            <span className="font-bold text-white/70">{karir.lokasi}</span>
                                        </div>
                                        <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/3 px-4 py-2.5 text-sm">
                                            <Calendar className="h-4 w-4 text-[#F5B800]/60" />
                                            <span className="font-bold text-white/70">Batas: {formatDate(karir.batas_daftar)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Deskripsi */}
                                <div className="rounded-2xl border border-white/5 bg-white/3 p-8">
                                    <h3 className="mb-4 text-sm font-black tracking-[0.2em] text-[#F5B800] uppercase">Deskripsi Pekerjaan</h3>
                                    <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-headings:font-black prose-p:text-white/65 prose-p:leading-relaxed prose-a:text-[#F5B800] prose-strong:text-white prose-li:text-white/65" dangerouslySetInnerHTML={{ __html: karir.deskripsi }} />
                                </div>

                                {/* Syarat */}
                                <div className="rounded-2xl border border-white/5 bg-white/3 p-8">
                                    <h3 className="mb-4 text-sm font-black tracking-[0.2em] text-[#F5B800] uppercase">Syarat & Kualifikasi</h3>
                                    <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-headings:font-black prose-p:text-white/65 prose-p:leading-relaxed prose-a:text-[#F5B800] prose-strong:text-white prose-li:text-white/65" dangerouslySetInnerHTML={{ __html: karir.syarat }} />
                                </div>

                                {/* CTA */}
                                {!isExpired && (
                                    <div className="rounded-2xl border border-[#F5B800]/20 bg-[#F5B800]/5 p-8">
                                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <h4 className="mb-1 text-base font-black text-white uppercase">Tertarik dengan posisi ini?</h4>
                                                <p className="text-sm text-white/50">Kirim lamaran Anda melalui form kontak kami</p>
                                            </div>
                                            <Link
                                                href="/kontak"
                                                className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-[#F5B800] to-[#E0A800] px-6 py-3 text-xs font-bold tracking-widest text-[#111111] uppercase shadow-lg shadow-[#F5B800]/20 transition-all hover:shadow-xl active:scale-95"
                                            >
                                                Lamar Sekarang
                                                <ArrowUpRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ── Sidebar ── */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <h3 className="mb-6 text-xs font-black tracking-[0.25em] text-white/40 uppercase">
                                        Lowongan Lainnya
                                    </h3>
                                    <div className="space-y-3">
                                        {karirLainnya.length === 0 && (
                                            <p className="rounded-xl border border-white/5 bg-white/3 p-5 text-center text-xs text-white/30">
                                                Tidak ada lowongan lain
                                            </p>
                                        )}
                                        {karirLainnya.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/karir/${item.id}`}
                                                className="group flex items-start gap-3 rounded-xl border border-white/5 bg-white/3 p-4 transition-all hover:border-[#F5B800]/20"
                                            >
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#F5B800]/15 bg-[#F5B800]/8">
                                                    <Briefcase className="h-4 w-4 text-[#F5B800]/70" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-bold text-white/70 transition-colors group-hover:text-white">
                                                        {item.posisi}
                                                    </p>
                                                    <p className="truncate text-xs text-white/30">{item.lokasi}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    <Link
                                        href="/karir"
                                        className="mt-6 flex items-center gap-2 text-xs font-bold tracking-widest text-[#F5B800]/60 uppercase transition-colors hover:text-[#F5B800]"
                                    >
                                        Lihat Semua Lowongan
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
