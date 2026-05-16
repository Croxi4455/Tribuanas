import { useEffect, useRef, useState } from 'react';

type Mitra = {
    id: number;
    nama: string;
    logo: string | null;
    kota: string;
    tahun: number;
};

type Props = {
    mitra: Mitra[];
};

const DUMMY_MITRA: Mitra[] = [
    { id: 1, nama: 'PT Kereta Api Indonesia', logo: null, kota: 'Jakarta', tahun: 2015 },
    { id: 2, nama: 'Universitas Indonesia', logo: null, kota: 'Depok', tahun: 2016 },
    { id: 3, nama: 'OJK', logo: null, kota: 'Jakarta', tahun: 2017 },
    { id: 4, nama: 'PDAM Tirta Jaya', logo: null, kota: 'Bandung', tahun: 2018 },
    { id: 5, nama: 'RS Cipto Mangunkusumo', logo: null, kota: 'Jakarta', tahun: 2019 },
    { id: 6, nama: 'BATAN', logo: null, kota: 'Serpong', tahun: 2020 },
    { id: 7, nama: 'Bank Mandiri', logo: null, kota: 'Jakarta', tahun: 2015 },
    { id: 8, nama: 'Pertamina', logo: null, kota: 'Jakarta', tahun: 2016 },
];

export default function PartnersSection({ mitra }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const data = mitra.length > 0 ? mitra : DUMMY_MITRA;
    // Triple for seamless loop
    const items = [...data, ...data, ...data];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="mitra" ref={sectionRef} className="relative overflow-hidden bg-[#1C1C1E] py-28 lg:py-36">

            {/* Angled top */}
            <div className="absolute left-0 right-0 top-0 h-16 bg-[#111111]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }}
            />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                {/* ── Header ── */}
                <div className={`mb-16 text-center transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <div className="h-px w-12 bg-[#F5B800]" />
                        <span className="text-xs font-bold tracking-[0.3em] text-[#F5B800] uppercase">Mitra Kami</span>
                        <div className="h-px w-12 bg-[#F5B800]" />
                    </div>
                    <h2 className="text-4xl font-black leading-tight tracking-tight text-white lg:text-6xl uppercase">
                        Dipercaya oleh
                        <br />
                        <span className="text-[#F5B800]">Ratusan Institusi</span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-base text-white/45">
                        Dari instansi pemerintah hingga perusahaan swasta terkemuka — kami adalah pilihan utama untuk keamanan profesional
                    </p>
                </div>
            </div>

            {/* ── Marquee ── */}
            <div className={`relative transition-all duration-700 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                {/* Fade edges */}
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40 bg-linear-to-r from-[#1C1C1E] to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40 bg-linear-to-l from-[#1C1C1E] to-transparent" />

                <div className="flex animate-[marquee_50s_linear_infinite] gap-5 hover:paused">
                    {items.map((item, i) => (
                        <div
                            key={`${item.id}-${i}`}
                            className="group flex min-w-[260px] shrink-0 items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] px-6 py-5 transition-all hover:border-[#F5B800]/20 hover:bg-[#F5B800]/5"
                        >
                            {/* Logo placeholder */}
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#F5B800]/20 bg-[#F5B800]/10 text-base font-black text-[#F5B800]">
                                {item.nama.charAt(0)}
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-white/80 group-hover:text-white">{item.nama}</p>
                                <p className="text-xs text-white/30">{item.kota} · {item.tahun}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Second row — reverse */}
            <div className={`relative mt-5 transition-all duration-700 delay-400 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40 bg-linear-to-r from-[#1C1C1E] to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40 bg-linear-to-l from-[#1C1C1E] to-transparent" />

                <div className="flex animate-[marquee_40s_linear_infinite_reverse] gap-5 hover:paused">
                    {[...items].reverse().map((item, i) => (
                        <div
                            key={`rev-${item.id}-${i}`}
                            className="group flex min-w-[260px] shrink-0 items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] px-6 py-5 transition-all hover:border-[#F5B800]/20 hover:bg-[#F5B800]/5"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#F5B800]/15 bg-[#F5B800]/8 text-base font-black text-[#F5B800]/70">
                                {item.nama.charAt(0)}
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-white/60 group-hover:text-white/80">{item.nama}</p>
                                <p className="text-xs text-white/25">{item.kota} · {item.tahun}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Keyframes */}
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.333%); }
                }
                @keyframes marquee-reverse {
                    0% { transform: translateX(-33.333%); }
                    100% { transform: translateX(0); }
                }
            `}</style>

            {/* Angled bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#111111]"
                style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
            />
        </section>
    );
}
