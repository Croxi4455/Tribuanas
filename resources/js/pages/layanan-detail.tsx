import { Head, Link } from '@inertiajs/react';
import { Shield, Eye, UserCheck, Car, Camera, Lock, Siren, ShieldCheck, ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import CompanyLayout from '@/layouts/company-layout';

type Layanan = {
    id: number;
    nama: string;
    slug: string;
    deskripsi: string;
    icon: string | null;
    urutan: number;
};

type Props = {
    profil: any;
    layanan: Layanan;
    layananLainnya: Layanan[];
};

const ICON_MAP: Record<string, LucideIcon> = {
    shield: Shield, eye: Eye, 'user-check': UserCheck,
    car: Car, camera: Camera, lock: Lock, siren: Siren,
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
    const Icon = ICON_MAP[layanan.icon?.toLowerCase() ?? ''] ?? ShieldCheck;

    return (
        <>
            <Head title={`${layanan.nama} — Tribuana Security`} />
            <CompanyLayout
                profil={profil}
                title={layanan.nama}
                subtitle="Layanan"
                image={`https://picsum.photos/1920/600?grayscale&random=${layanan.id + 30}`}
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
                                {/* Icon + Title */}
                                <div className="mb-8 flex items-center gap-5">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#F5B800]/20 bg-[#F5B800]/10">
                                        <Icon className="h-8 w-8 text-[#F5B800]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold tracking-[0.3em] text-[#F5B800]/60 uppercase">Layanan Kami</p>
                                        <h1 className="text-2xl font-black text-white uppercase lg:text-3xl">{layanan.nama}</h1>
                                    </div>
                                </div>

                                {/* Deskripsi */}
                                <div className="rounded-2xl border border-white/5 bg-white/3 p-8">
                                    <p className="text-base leading-relaxed text-white/65">{layanan.deskripsi}</p>
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
                                        {layananLainnya.map((item) => {
                                            const ItemIcon = ICON_MAP[item.icon?.toLowerCase() ?? ''] ?? ShieldCheck;
                                            return (
                                                <Link
                                                    key={item.id}
                                                    href={`/layanan/${item.slug}`}
                                                    className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/3 p-4 transition-all hover:border-[#F5B800]/20"
                                                >
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#F5B800]/15 bg-[#F5B800]/8">
                                                        <ItemIcon className="h-5 w-5 text-[#F5B800]/70" />
                                                    </div>
                                                    <span className="text-sm font-bold text-white/60 transition-colors group-hover:text-white">
                                                        {item.nama}
                                                    </span>
                                                    <ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 text-white/20 transition-colors group-hover:text-[#F5B800]/60" />
                                                </Link>
                                            );
                                        })}
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
