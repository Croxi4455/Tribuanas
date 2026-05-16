import { useEffect, useRef, useState } from 'react';
import { Shield, ArrowRight, ChevronDown, CheckCircle } from 'lucide-react';
import gsap from 'gsap';

type Props = {
    nama?: string;
    tagline?: string;
};

function useCounter(target: number, duration = 2000, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);
    return count;
}

const STATS = [
    { value: 15,   suffix: '+',  label: 'Tahun Pengalaman' },
    { value: 500,  suffix: '+',  label: 'Klien Terlayani' },
    { value: 1000, suffix: '+',  label: 'Personel Aktif' },
    { value: 24,   suffix: '/7', label: 'Siaga Penuh' },
];

const TRUST_BADGES = ['Bersertifikat Polri', 'ISO Certified', 'Mitra Pemerintah'];

export default function HeroSection({ nama, tagline }: Props) {
    const statsRef    = useRef<HTMLDivElement>(null);
    const badgesRef   = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const taglineRef  = useRef<HTMLParagraphElement>(null);
    const ctaRef      = useRef<HTMLDivElement>(null);
    const statsBarRef = useRef<HTMLDivElement>(null);
    const [statsVisible, setStatsVisible] = useState(false);

    // GSAP entrance animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.2 });
            if (badgesRef.current)
                tl.fromTo(badgesRef.current,   { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
            if (headlineRef.current)
                tl.fromTo(headlineRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1,   ease: 'power3.out' }, '-=0.4');
            if (taglineRef.current)
                tl.fromTo(taglineRef.current,  { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5');
            if (ctaRef.current)
                tl.fromTo(ctaRef.current,      { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1,   ease: 'elastic.out(1, 0.5)' }, '-=0.3');
            if (statsBarRef.current)
                tl.fromTo(statsBarRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4');
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
            { threshold: 0.3 }
        );
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="beranda" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#181819]">

            {/* ── Background Image ── */}
            <div className="absolute inset-0">
                <img
                    src="https://picsum.photos/1920/1080?grayscale&random=10"
                    alt=""
                    className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-[#181819]/75" />
                <div className="absolute inset-0 bg-linear-to-br from-[#181819]/60 via-transparent to-[#0E0E0F]/80" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.08)_0%,transparent_60%)]" />
            </div>

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Diagonal accent lines */}
            <div className="absolute inset-0 overflow-hidden opacity-[0.06]">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="absolute h-px bg-linear-to-r from-transparent via-[#F5B800] to-transparent"
                        style={{ top: `${15 + i * 14}%`, left: '-20%', right: '-20%', transform: 'rotate(-8deg)' }}
                    />
                ))}
            </div>

            {/* ── Main Content ── */}
            <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 text-center lg:px-8">

                <div ref={badgesRef} className="mb-8 flex flex-wrap items-center justify-center gap-3">
                    {TRUST_BADGES.map((badge) => (
                        <span key={badge} className="flex items-center gap-1.5 rounded-full border border-[#F5B800]/20 bg-[#F5B800]/8 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#F5B800] uppercase">
                            <CheckCircle className="h-3 w-3" />
                            {badge}
                        </span>
                    ))}
                </div>

                <div ref={headlineRef}>
                    <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white md:text-6xl lg:text-8xl">
                        <span className="block uppercase">Solusi</span>
                        <span className="block bg-linear-to-r from-[#F5B800] via-[#FFE066] to-[#F5B800] bg-clip-text text-transparent uppercase">Pengamanan</span>
                        <span className="block uppercase">Profesional</span>
                    </h1>
                </div>

                <div className="mx-auto my-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-linear-to-r from-transparent to-[#F5B800]/30" />
                    <Shield className="h-5 w-5 text-[#F5B800]/50" />
                    <div className="h-px flex-1 bg-linear-to-l from-transparent to-[#F5B800]/30" />
                </div>

                <p ref={taglineRef} className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/50 md:text-xl">
                    {tagline || `${nama || 'PT Tribuana'} — Memberikan perlindungan terpercaya untuk aset, fasilitas, dan kepentingan Anda dengan standar keamanan internasional.`}
                </p>

                <div ref={ctaRef} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <button onClick={() => scrollTo('kontak')} className="group relative overflow-hidden rounded-lg bg-linear-to-r from-[#F5B800] to-[#E0A800] px-8 py-4 text-sm font-bold tracking-widest text-[#181819] uppercase shadow-lg shadow-[#F5B800]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#F5B800]/40 active:scale-95">
                        <span className="relative z-10 flex items-center gap-2">
                            Konsultasi Gratis
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                    </button>
                    <button onClick={() => scrollTo('layanan')} className="rounded-lg border border-white/20 px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition-all duration-300 hover:border-[#F5B800]/40 hover:bg-white/5 hover:text-[#F5B800] active:scale-95">
                        Pelajari Layanan
                    </button>
                </div>
            </div>

            {/* ── Stats Bar ── */}
            <div ref={statsBarRef} className="relative z-10 mx-auto mt-20 w-full max-w-6xl px-6 lg:px-8">
                <div className="mb-10 h-px bg-linear-to-r from-transparent via-[#F5B800]/20 to-transparent" />
                <div ref={statsRef} className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                    {STATS.map((stat, i) => (
                        <StatItem key={stat.label} stat={stat} visible={statsVisible} delay={i * 100} />
                    ))}
                </div>
            </div>

            <button onClick={() => scrollTo('tentang')} className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/30 transition-colors hover:text-[#F5B800]/60" aria-label="Scroll down">
                <ChevronDown className="h-7 w-7" />
            </button>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#111111] to-transparent" />
        </section>
    );
}

function StatItem({ stat, visible, delay }: { stat: (typeof STATS)[0]; visible: boolean; delay: number }) {
    const count = useCounter(stat.value, 1800, visible);
    return (
        <div className="group text-center" style={{ transitionDelay: `${delay}ms` }}>
            <div className="relative inline-block">
                <span className="text-4xl font-black text-white lg:text-5xl">{count}</span>
                <span className="text-2xl font-black text-[#F5B800] lg:text-3xl">{stat.suffix}</span>
            </div>
            <p className="mt-2 text-xs font-semibold tracking-widest text-white/40 uppercase">{stat.label}</p>
            <div className="mx-auto mt-3 h-px w-8 bg-[#F5B800]/30 transition-all duration-300 group-hover:w-16 group-hover:bg-[#F5B800]/60" />
        </div>
    );
}
