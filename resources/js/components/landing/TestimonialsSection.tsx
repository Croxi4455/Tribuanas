import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Testimoni = {
    id: number;
    nama: string;
    jabatan: string;
    perusahaan: string;
    foto: string | null;
    isi: string;
    rating: number;
    is_active: boolean;
};

type Props = {
    testimoni: Testimoni[];
};

const DUMMY_TESTIMONI: Testimoni[] = [
    {
        id: 1,
        nama: 'Budi Santoso',
        jabatan: 'Direktur Operasional',
        perusahaan: 'PT Maju Bersama',
        foto: null,
        isi: 'Tribuana telah menjadi mitra keamanan kami selama 5 tahun. Profesionalisme personel mereka tidak perlu diragukan lagi. Respons cepat dan koordinasi yang sangat baik.',
        rating: 5,
        is_active: true,
    },
    {
        id: 2,
        nama: 'Dr. Siti Rahayu',
        jabatan: 'Kepala Bagian Umum',
        perusahaan: 'RS Harapan Sehat',
        foto: null,
        isi: 'Keamanan rumah sakit kami meningkat drastis sejak bekerja sama dengan Tribuana. Personel mereka memahami protokol khusus lingkungan medis dengan sangat baik.',
        rating: 5,
        is_active: true,
    },
    {
        id: 3,
        nama: 'Ahmad Fauzi',
        jabatan: 'General Manager',
        perusahaan: 'Hotel Grand Nusantara',
        foto: null,
        isi: 'Untuk pengamanan event besar kami, Tribuana selalu menjadi pilihan pertama. Koordinasi tim yang solid dan penampilan personel yang sangat profesional.',
        rating: 5,
        is_active: true,
    },
];

function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    className={`h-4 w-4 ${i < rating ? 'fill-[#F5B800] text-[#F5B800]' : 'fill-white/5 text-white/10'}`}
                />
            ))}
        </div>
    );
}

export default function TestimonialsSection({ testimoni }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const quoteImgRef = useRef<HTMLImageElement>(null);
    const quoteBannerRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const data = testimoni.length > 0 ? testimoni.slice(0, 3) : DUMMY_TESTIMONI;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Parallax on quote banner image
    useEffect(() => {
        if (!quoteImgRef.current || !quoteBannerRef.current) return;

        gsap.fromTo(
            quoteImgRef.current,
            { y: '-15%' },
            {
                y: '15%',
                ease: 'none',
                scrollTrigger: {
                    trigger: quoteBannerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.8,
                    invalidateOnRefresh: true,
                },
            }
        );

        return () => {
            ScrollTrigger.getAll()
                .filter(st => st.vars.trigger === quoteBannerRef.current)
                .forEach(st => st.kill());
        };
    }, []);

    return (
        <section id="testimoni" ref={sectionRef} className="relative overflow-hidden bg-[#181819] py-28 lg:py-36">

            {/* Angled top */}
            <div className="absolute left-0 right-0 top-0 h-16 bg-[#111111]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }}
            />

            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(201,168,76,0.06)_0%,_transparent_65%)]" />
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                {/* ── Header ── */}
                <div className={`mb-16 text-center transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <div className="h-px w-12 bg-[#F5B800]" />
                        <span className="text-xs font-bold tracking-[0.3em] text-[#F5B800] uppercase">Testimoni</span>
                        <div className="h-px w-12 bg-[#F5B800]" />
                    </div>
                    <h2 className="text-4xl font-black leading-tight tracking-tight text-white lg:text-6xl uppercase">
                        Apa Kata
                        <br />
                        <span className="text-[#F5B800]">Klien Kami</span>
                    </h2>
                </div>

                {/* ── Cards ── */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((item, i) => (
                        <div
                            key={item.id}
                            className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/6 bg-white/2 transition-all duration-500 hover:border-[#F5B800]/20 hover:bg-white/4 ${
                                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                            style={{ transitionDelay: `${200 + i * 120}ms` }}
                        >
                            {/* Gold top accent */}
                            <div className="h-[2px] w-full bg-linear-to-r from-transparent via-[#F5B800]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="flex flex-1 flex-col p-8">
                                {/* Top: stars + quote icon */}
                                <div className="mb-6 flex items-center justify-between">
                                    <Stars rating={item.rating} />
                                    <Quote className="h-8 w-8 text-[#F5B800]/12 group-hover:text-[#F5B800]/25 transition-colors" />
                                </div>

                                {/* Quote text */}
                                <p className="flex-1 text-sm leading-[1.8] text-white/50 line-clamp-4 italic">
                                    "{item.isi}"
                                </p>
                            </div>

                            {/* Author footer */}
                            <div className="flex items-center gap-4 border-t border-white/5 bg-white/[0.015] px-8 py-5">
                                {/* Avatar */}
                                <div className="relative shrink-0">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-[#F5B800]/25 to-[#F5B800]/5 text-sm font-black text-[#F5B800]">
                                        {item.nama.charAt(0)}
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#181819] bg-[#F5B800]/60" />
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-black text-white">{item.nama}</p>
                                    <p className="truncate text-xs text-white/35">{item.jabatan}</p>
                                    <p className="truncate text-[10px] font-bold tracking-wider text-[#F5B800]/50 uppercase">{item.perusahaan}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Quote Banner — full width ── */}
            <div ref={quoteBannerRef} className={`relative mt-20 min-h-[280px] overflow-hidden transition-all duration-700 delay-500 sm:min-h-[320px] lg:min-h-[380px] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                {/* Background image */}
                <img
                    ref={quoteImgRef}
                    src="https://picsum.photos/1920/500?grayscale&random=55"
                    alt=""
                    loading="lazy" decoding="async" className="h-full w-full object-cover object-center will-change-transform"
                    style={{ transform: 'scale(1.3)', transformOrigin: 'center center' }}
                />
                {/* Overlays */}
                <div className="absolute inset-0 bg-[#181819]/80" />
                <div className="absolute inset-0 bg-linear-to-r from-[#181819]/90 via-[#181819]/60 to-[#181819]/80" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.07)_0%,transparent_70%)]" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-16 text-center lg:px-20">
                    <Quote className="mb-6 h-10 w-10 text-[#F5B800]/30 md:h-12 md:w-12" />
                    <p className="mx-auto max-w-3xl text-lg font-black leading-relaxed tracking-tight text-white md:text-xl lg:text-3xl uppercase">
                        Keamanan bukan sekadar penjagaan —{' '}
                        <span className="text-[#F5B800]">ini adalah komitmen kami untuk melindungi yang Anda percayakan.</span>
                    </p>
                    <div className="mt-6 flex items-center gap-3 md:mt-8">
                        <div className="h-px w-8 bg-[#F5B800]/40 md:w-12" />
                        <span className="text-[10px] font-bold tracking-[0.3em] text-[#F5B800]/60 uppercase">Tribuana Security</span>
                        <div className="h-px w-8 bg-[#F5B800]/40 md:w-12" />
                    </div>
                </div>
            </div>

        </section>
    );
}
