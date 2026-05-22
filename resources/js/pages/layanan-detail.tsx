import { Head, Link } from '@inertiajs/react';
import { ShieldCheck, ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import CompanyLayout from '@/layouts/company-layout';

type Layanan = {
    id: number;
    nama: string;
    slug: string;
    deskripsi: string;
    gambar: string | null;
    gambar_url?: string | null;
    urutan: number;
};

type Props = {
    profil: any;
    layanan: Layanan;
    layananLainnya: Layanan[];
};

const FITUR_UMUM = [
    'Personel bersertifikat Polri',
    'Siaga 24 jam / 7 hari',
    'Laporan berkala & transparan',
    'Koordinasi dengan aparat',
    'Peralatan keamanan modern',
    'Asuransi personel terjamin',
];

export default function LayananDetailPage({ profil, layanan, layananLainnya }: Props) {
    const imgSrc = layanan.gambar_url || (layanan.gambar ? `/storage/${layanan.gambar}` : null);

    return (
        <>
            <Head title={`${layanan.nama} — Tribuana Security`} />
            <CompanyLayout
                profil={profil}
                title={layanan.nama}
                subtitle="Layanan"
                image={imgSrc || `https://picsum.photos/1920/600?grayscale&random=${layanan.id + 30}`}
            >
                <section className="py-16 lg:py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">

                        <Link
                            href="/layanan"
                            className="mb-10 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-[#F5B800]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Layanan
                        </Link>

                        <div className="grid gap-12 lg:grid-cols-3">

                            {/* ── Konten Utama ── */}
                            <div className="lg:col-span-2">
                                {/* Title */}
                                <div className="mb-8 flex items-center gap-5">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#F5B800]/20 bg-[#F5B800]/10">
                                        <ShieldCheck className="h-8 w-8 text-[#F5B800]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold tracking-[0.3em] text-[#F5B800]/60 uppercase">Layanan Kami</p>
                                        <h1 className="text-2xl font-black text-white uppercase lg:text-3xl">{layanan.nama}</h1>
                                    </div>
                                </div>

                                {/* Deskripsi */}
                                <div className="rounded-2xl border border-white/5 bg-white/3 p-8">
                                    <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-headings:font-black prose-p:text-white/65 prose-p:leading-relaxed prose-a:text-[#F5B800] prose-strong:text-white prose-li:text-white/65" dangerouslySetInnerHTML={{ __html: layanan.deskripsi }} />
                                </div>

                                {/* Fitur */}
                                <div className="mt-8">
                                    <h3 className="mb-5 text-sm font-black tracking-[0.2em] text-white/50 uppercase">Yang Kami Tawarkan</h3>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {FITUR_UMUM.map((f) => (
                                            <div key={f} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/3 px-5 py-3.5">
                                                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F5B800]" />
                                                <span className="text-sm text-white/65">{f}</span>
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
                                        Konsultasi Layanan Ini
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>

                            {/* ── Sidebar Layanan Lain ── */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <h3 className="mb-6 text-xs font-black tracking-[0.25em] text-white/40 uppercase">
                                        Layanan Lainnya
                                    </h3>
                                    <div className="space-y-3">
                                        {layananLainnya.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/layanan/${item.slug}`}
                                                className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/3 p-4 transition-all hover:border-[#F5B800]/20"
                                            >
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#F5B800]/15 bg-[#F5B800]/8">
                                                    <ShieldCheck className="h-5 w-5 text-[#F5B800]/70" />
                                                </div>
                                                <span className="text-sm font-bold text-white/60 transition-colors group-hover:text-white">
                                                    {item.nama}
                                                </span>
                                                <ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 text-white/20 transition-colors group-hover:text-[#F5B800]/60" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </CompanyLayout>
        </>
    );
}
