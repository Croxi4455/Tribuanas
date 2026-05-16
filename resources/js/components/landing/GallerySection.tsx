import { useEffect, useRef, useState } from 'react';
import { ImageIcon, ZoomIn } from 'lucide-react';

type GaleriItem = {
    id: number;
    judul: string;
    gambar: string;
    kategori: string;
};

type Props = {
    galeri: GaleriItem[];
};

const TABS = [
    { value: 'semua', label: 'Semua' },
    { value: 'kegiatan', label: 'Kegiatan' },
    { value: 'pelatihan', label: 'Pelatihan' },
    { value: 'fasilitas', label: 'Fasilitas' },
    { value: 'event', label: 'Event' },
];

export default function GallerySection({ galeri }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState('semua');

    const filtered = active === 'semua' ? galeri : galeri.filter((g) => g.kategori === active);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    if (galeri.length === 0) return null;

    return (
        <section id="galeri" ref={sectionRef} className="relative overflow-hidden bg-[#111111] py-28 lg:py-36">

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.03)_0%,_transparent_70%)]" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                {/* ── Header ── */}
                <div className={`mb-12 transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-12 bg-[#F5B800]" />
                        <span className="text-xs font-bold tracking-[0.3em] text-[#F5B800] uppercase">Galeri</span>
                    </div>
                    <h2 className="text-4xl font-black leading-tight tracking-tight text-white lg:text-6xl uppercase">
                        Dokumentasi
                        <br />
                        <span className="text-[#F5B800]">Kegiatan</span>
                    </h2>
                </div>

                {/* ── Tabs ── */}
                <div className={`mb-10 flex flex-wrap gap-2 transition-all duration-700 delay-200 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    {TABS.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActive(tab.value)}
                            className={`rounded-lg px-5 py-2 text-sm font-bold tracking-widest uppercase transition-all ${
                                active === tab.value
                                    ? 'bg-[#F5B800] text-[#181819] shadow-lg shadow-[#F5B800]/20'
                                    : 'border border-white/10 text-white/40 hover:border-white/20 hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ── Grid ── */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {filtered.map((item, i) => (
                        <div
                            key={item.id}
                            className={`group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/5 bg-[#1C1C1E] transition-all duration-500 hover:border-[#F5B800]/20 hover:shadow-xl hover:shadow-[#F5B800]/10 ${
                                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                            style={{ transitionDelay: `${300 + i * 60}ms` }}
                        >
                            <img
                                src={item.gambar || `https://picsum.photos/400/300?grayscale&blur=1&random=${item.id}`}
                                alt={item.judul}
                                className="h-full w-full object-cover opacity-50 transition-all duration-500 group-hover:scale-105 group-hover:opacity-70"
                            />

                            {/* Hover overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#181819]/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <ZoomIn className="mb-3 h-8 w-8 text-[#F5B800]" />
                            </div>

                            {/* Bottom info */}
                            <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-linear-to-t from-[#181819] to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
                                <p className="text-sm font-bold text-white">{item.judul}</p>
                                <span className="mt-1 inline-block rounded-full border border-[#F5B800]/20 bg-[#F5B800]/10 px-2.5 py-0.5 text-[10px] font-bold capitalize tracking-widest text-[#F5B800] uppercase">
                                    {item.kategori}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="py-20 text-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-white/10" />
                        <p className="mt-4 text-sm text-white/30">Tidak ada foto untuk kategori ini</p>
                    </div>
                )}
            </div>
        </section>
    );
}
