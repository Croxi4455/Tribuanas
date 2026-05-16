import { useEffect, useRef, useState } from 'react';
import { Briefcase, MapPin, Calendar, ArrowUpRight } from 'lucide-react';

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
    karir: Karir[];
};

export default function CareerSection({ karir }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    if (karir.length === 0) return null;

    return (
        <section id="karir" ref={sectionRef} className="relative overflow-hidden bg-[#1C1C1E] py-28 lg:py-36">

            {/* Angled top */}
            <div className="absolute left-0 right-0 top-0 h-16 bg-[#111111]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(201,168,76,0.04)_0%,_transparent_60%)]" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                {/* ── Header ── */}
                <div className={`mb-16 transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-12 bg-[#F5B800]" />
                        <span className="text-xs font-bold tracking-[0.3em] text-[#F5B800] uppercase">Karir</span>
                    </div>
                    <h2 className="text-4xl font-black leading-tight tracking-tight text-white lg:text-6xl uppercase">
                        Bergabung
                        <br />
                        <span className="text-[#F5B800]">Bersama Kami</span>
                    </h2>
                    <p className="mt-4 max-w-lg text-base text-white/45">
                        Jadilah bagian dari tim profesional kami dan bangun karir di industri keamanan terkemuka
                    </p>
                </div>

                {/* ── Job Cards ── */}
                <div className="grid gap-5 md:grid-cols-2">
                    {karir.map((item, i) => (
                        <div
                            key={item.id}
                            className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#F5B800]/20 hover:shadow-xl hover:shadow-[#F5B800]/8 ${
                                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                            style={{ transitionDelay: `${200 + i * 100}ms` }}
                        >
                            <div className="mb-5 flex items-start justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F5B800]/20 bg-[#F5B800]/10">
                                    <Briefcase className="h-6 w-6 text-[#F5B800]" />
                                </div>
                                <span className={`rounded-full px-3 py-1 text-[10px] font-black tracking-widest uppercase ${
                                    item.status === 'buka'
                                        ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                                        : 'border border-white/10 bg-white/5 text-white/30'
                                }`}>
                                    {item.status === 'buka' ? 'Buka' : 'Tutup'}
                                </span>
                            </div>

                            <h3 className="mb-2 text-xl font-black tracking-tight text-white uppercase">{item.posisi}</h3>
                            <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-white/45">{item.deskripsi}</p>

                            <div className="flex flex-wrap items-center gap-5 border-t border-white/5 pt-5 text-xs text-white/30">
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="h-3.5 w-3.5 text-[#F5B800]/50" />
                                    {item.lokasi}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5 text-[#F5B800]/50" />
                                    Batas: {new Date(item.batas_daftar).toLocaleDateString('id-ID', {
                                        day: 'numeric', month: 'long', year: 'numeric',
                                    })}
                                </span>
                                <span className="ml-auto flex items-center gap-1 text-[#F5B800]/50 font-bold uppercase tracking-wider transition-all group-hover:text-[#F5B800]">
                                    Lamar
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </span>
                            </div>

                            <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[#F5B800]/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Angled bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#111111]"
                style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
            />
        </section>
    );
}
