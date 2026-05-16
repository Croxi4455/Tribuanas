import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Shield, Eye, UserCheck, Car, Camera, Lock, Siren } from 'lucide-react';
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

export default function LayananDetailPage({ profil, layanan, layananLainnya }: Props) {
    const Icon = ICON_MAP[layanan.icon?.toLowerCase() ?? ''] ?? ShieldCheck;

    return (
        <>
            <Head title={`${layanan.nama} — Tribuana Security`} />
            <CompanyLayout profil={profil} title="Detail Layanan" subtitle="Layanan Kami">
                <section className="relative pt-12 pb-24">
                    {/* Background glows */}
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#C9A84C]/5 blur-[120px] rounded-full pointer-events-none" />

                    <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
                        {/* Back button */}
                        <Link
                            href="/layanan"
                            className="group mb-12 inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-white/50 uppercase transition-all hover:text-[#C9A84C]"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:border-[#C9A84C]/40 group-hover:bg-[#C9A84C]/10">
                                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                            </div>
                            Kembali ke Layanan
                        </Link>

                        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
                            {/* Left Side: Icon & Title */}
                            <div className="lg:col-span-5 lg:pr-8">
                                <div className="mb-8 relative inline-flex">
                                    <div className="absolute inset-0 bg-[#C9A84C]/20 blur-2xl rounded-full" />
                                    <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] border border-[#C9A84C]/30 bg-linear-to-b from-[#C9A84C]/20 to-[#C9A84C]/5 shadow-2xl shadow-[#C9A84C]/10">
                                        <Icon className="h-12 w-12 text-[#C9A84C]" />
                                    </div>
                                </div>
                                <h1 className="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-white lg:text-5xl uppercase">
                                    {layanan.nama}
                                </h1>
                                <div className="h-1 w-20 rounded-full bg-linear-to-r from-[#C9A84C] to-transparent mb-8" />
                                <p className="text-lg leading-relaxed text-white/60">
                                    {layanan.deskripsi}
                                </p>
                            </div>

                            {/* Right Side: Features & CTA */}
                            <div className="lg:col-span-7">
                                <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 lg:p-12 backdrop-blur-md shadow-2xl">
                                    <h3 className="mb-8 text-xl font-bold text-white tracking-wide">Kenapa Memilih Layanan Ini?</h3>
                                    <div className="flex flex-col gap-4 mb-12">
                                        {['Profesional & Berpengalaman', 'Sistem Pengamanan Modern', 'Layanan 24 Jam Non-Stop', 'Koordinasi Cepat & Tepat'].map((item, idx) => (
                                            <div key={idx} className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-4 transition-all hover:bg-white/[0.04] hover:border-[#C9A84C]/20">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C9A84C]/10 transition-colors group-hover:bg-[#C9A84C]/20">
                                                    <CheckCircle2 className="h-5 w-5 text-[#C9A84C]" />
                                                </div>
                                                <span className="text-base font-medium text-white/80 group-hover:text-white transition-colors">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <Link
                                            href="/kontak"
                                            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#C9A84C] px-8 py-5 text-sm font-bold tracking-widest text-[#0D1B2A] uppercase transition-transform active:scale-[0.98]"
                                        >
                                            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                                            Konsultasi Sekarang
                                            <ArrowLeft className="h-4 w-4 rotate-135" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Layanan Lainnya Section */}
                    {layananLainnya && layananLainnya.length > 0 && (
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mt-24 border-t border-white/10 pt-16">
                                <h3 className="text-2xl font-black tracking-widest text-white uppercase mb-8 text-center">Layanan Lainnya</h3>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {layananLainnya.map((item) => {
                                        const ItemIcon = ICON_MAP[item.icon?.toLowerCase() ?? ''] ?? ShieldCheck;
                                        return (
                                            <Link
                                                key={item.id}
                                                href={`/layanan/${item.slug}`}
                                                className="group flex flex-col items-center text-center rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.04] hover:border-[#C9A84C]/20 hover:shadow-2xl hover:shadow-[#C9A84C]/10"
                                            >
                                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                                                    <ItemIcon className="h-8 w-8 text-[#C9A84C]" />
                                                </div>
                                                <h4 className="font-bold text-white uppercase tracking-wider text-sm transition-colors group-hover:text-[#C9A84C]">
                                                    {item.nama}
                                                </h4>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </CompanyLayout>
        </>
    );
}
