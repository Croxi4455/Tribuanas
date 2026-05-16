import { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Shield, Eye, UserCheck, Car, Camera, Lock, Siren, ShieldCheck, ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Layanan = {
    id: number;
    nama: string;
    slug: string;
    deskripsi: string;
    icon: string | null;
    urutan: number;
};

type Props = {
    layanan: Layanan[];
};

const ICON_MAP: Record<string, LucideIcon> = {
    shield: Shield,
    eye: Eye,
    'user-check': UserCheck,
    car: Car,
    camera: Camera,
    lock: Lock,
    siren: Siren,
};

// Fallback dummy services if no data
const DUMMY_SERVICES = [
    {
        id: 1,
        nama: 'Security Guard',
        slug: 'security-guard',
        deskripsi: 'Penjagaan profesional untuk aset, gedung, dan fasilitas instansi pemerintah maupun swasta dengan personel bersertifikat Polri.',
        icon: 'shield',
        urutan: 1,
    },
    {
        id: 2,
        nama: 'Security Escort',
        slug: 'security-escort',
        deskripsi: 'Layanan pengawalan VIP, pejabat, dan kelompok dengan protokol keamanan ketat dan personel terlatih khusus.',
        icon: 'car',
        urutan: 2,
    },
    {
        id: 3,
        nama: 'Security Event',
        slug: 'security-event',
        deskripsi: 'Pengamanan acara, konser, seminar, dan kegiatan publik skala besar dengan koordinasi tim yang terstruktur.',
        icon: 'eye',
        urutan: 3,
    },
];

function getIcon(iconName: string | null): LucideIcon {
    if (iconName && ICON_MAP[iconName.toLowerCase()]) {
        return ICON_MAP[iconName.toLowerCase()];
    }
    return ShieldCheck;
}

export default function ServicesSection({ layanan }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const data = layanan.length > 0 ? layanan : DUMMY_SERVICES;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="layanan" ref={sectionRef} className="relative overflow-hidden bg-[#1C1C1E] py-28 lg:py-36">

            {/* Angled top cut */}
            <div className="absolute left-0 right-0 top-0 h-16 bg-[#111111]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }}
            />

            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.04)_0%,_transparent_65%)]" />
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                {/* ── Header ── */}
                <div className={`mb-20 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-12 bg-[#F5B800]" />
                            <span className="text-xs font-bold tracking-[0.3em] text-[#F5B800] uppercase">Layanan Unggulan</span>
                        </div>
                        <h2 className="text-4xl font-black leading-tight tracking-tight text-white lg:text-6xl uppercase">
                            Solusi Keamanan
                            <br />
                            <span className="text-[#F5B800]">Terpadu</span>
                        </h2>
                    </div>
                    <p className="max-w-sm text-base text-white/50 lg:text-right">
                        Layanan keamanan profesional yang disesuaikan dengan kebutuhan spesifik Anda
                    </p>
                </div>

                {/* ── Services Grid ── */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((item, i) => {
                        const Icon = getIcon(item.icon);
                        return (
                            <ServiceCard
                                key={item.id}
                                item={item}
                                Icon={Icon}
                                visible={visible}
                                delay={i * 100}
                            />
                        );
                    })}
                </div>

                {/* ── Bottom CTA ── */}
                <div className={`mt-16 text-center transition-all duration-700 delay-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <button
                        onClick={() => document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group inline-flex items-center gap-2 rounded-lg border border-[#F5B800]/30 px-8 py-3.5 text-sm font-bold tracking-widest text-[#F5B800] uppercase transition-all hover:border-[#F5B800] hover:bg-[#F5B800]/10 active:scale-95"
                    >
                        Konsultasikan Kebutuhan Anda
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>

            {/* Angled bottom cut */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#111111]"
                style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
            />
        </section>
    );
}

function ServiceCard({
    item,
    Icon,
    visible,
    delay,
}: {
    item: (typeof DUMMY_SERVICES)[0];
    Icon: LucideIcon;
    visible: boolean;
    delay: number;
}) {
    return (
        <Link
            href={`/layanan/${item.slug}`}
            className={`group relative overflow-hidden rounded-xl border border-white/6 bg-white/2 transition-all duration-500 hover:border-[#F5B800]/25 hover:bg-white/4 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${200 + delay}ms` }}
        >
            {/* Gold left accent bar */}
            <div className="absolute left-0 top-0 h-full w-[3px] bg-linear-to-b from-[#F5B800]/0 via-[#F5B800]/60 to-[#F5B800]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="p-7">
                {/* Top row: icon + number */}
                <div className="mb-5 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#F5B800]/20 bg-[#F5B800]/8 transition-colors group-hover:border-[#F5B800]/35 group-hover:bg-[#F5B800]/12">
                        <Icon className="h-5 w-5 text-[#F5B800]" />
                    </div>
                    <span className="font-black text-[#F5B800]/12 text-5xl leading-none select-none group-hover:text-[#F5B800]/20 transition-colors">
                        {String(item.urutan).padStart(2, '0')}
                    </span>
                </div>

                {/* Title */}
                <h3 className="mb-2.5 text-lg font-black tracking-tight text-white uppercase leading-tight">
                    {item.nama}
                </h3>

                {/* Divider */}
                <div className="mb-4 h-px w-8 bg-[#F5B800]/40" />

                {/* Description */}
                <p className="line-clamp-3 text-sm leading-relaxed text-white/40">
                    {item.deskripsi}
                </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/5 px-7 py-4">
                <div className="flex items-center gap-1.5 text-[10px] font-black tracking-[0.15em] text-white/20 uppercase transition-colors group-hover:text-[#F5B800]/60">
                    <ArrowUpRight className="h-3 w-3" />
                    Selengkapnya
                </div>
                <div className="h-1.5 w-1.5 rounded-full bg-[#F5B800]/20 group-hover:bg-[#F5B800]/50 transition-colors" />
            </div>
        </Link>
    );
}
