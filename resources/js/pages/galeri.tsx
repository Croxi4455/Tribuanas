import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import CompanyLayout from '@/layouts/company-layout';

type GaleriItem = {
    id: number;
    judul: string;
    gambar: string;
    kategori: string;
};

type Props = {
    profil: any;
    galeri: GaleriItem[];
};

const TABS = [
    { value: 'semua',     label: 'Semua' },
    { value: 'kegiatan',  label: 'Kegiatan' },
    { value: 'pelatihan', label: 'Pelatihan' },
    { value: 'fasilitas', label: 'Fasilitas' },
    { value: 'event',     label: 'Event' },
];

export default function GaleriPage({ profil, galeri }: Props) {
    const [active, setActive]       = useState('semua');
    const [lightbox, setLightbox]   = useState<number | null>(null); // index di filtered

    const filtered = active === 'semua' ? galeri : galeri.filter((g) => g.kategori === active);

    const imgSrc = (item: GaleriItem) =>
        item.gambar
            ? (item.gambar.startsWith('http') ? item.gambar : `/storage/${item.gambar}`)
            : `https://picsum.photos/800/600?grayscale&random=${item.id}`;

    // Keyboard navigation
    useEffect(() => {
        if (lightbox === null) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightbox(null);
            if (e.key === 'ArrowRight') setLightbox((i) => i !== null ? Math.min(i + 1, filtered.length - 1) : null);
            if (e.key === 'ArrowLeft')  setLightbox((i) => i !== null ? Math.max(i - 1, 0) : null);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [lightbox, filtered.length]);

    // Lock scroll saat lightbox terbuka
    useEffect(() => {
        document.body.style.overflow = lightbox !== null ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [lightbox]);

    return (
        <>
            <Head title="Galeri — Tribuana Security" />
            <CompanyLayout profil={profil} title="Galeri" subtitle="Galeri" image="https://picsum.photos/1920/600?grayscale&random=36">

                <section className="py-16 lg:py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">

                        {/* Tabs */}
                        <div className="mb-10 flex flex-wrap gap-2">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.value}
                                    onClick={() => { setActive(tab.value); setLightbox(null); }}
                                    className={`rounded-lg px-5 py-2 text-sm font-bold tracking-widest uppercase transition-all ${
                                        active === tab.value
                                            ? 'bg-[#F5B800] text-[#111111] shadow-lg shadow-[#F5B800]/20'
                                            : 'border border-white/10 text-white/40 hover:border-white/20 hover:text-white'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Grid */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {filtered.map((item, i) => (
                                <button
                                    key={item.id}
                                    onClick={() => setLightbox(i)}
                                    className="group relative aspect-4/3 overflow-hidden rounded-xl border border-white/5 bg-[#1C1C1E] text-left transition-all hover:border-[#F5B800]/20 hover:shadow-xl hover:shadow-[#F5B800]/10"
                                >
                                    <img
                                        src={imgSrc(item)}
                                        alt={item.judul}
                                        className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                                    />
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#111111]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F5B800]/40 bg-[#F5B800]/10">
                                            <ZoomIn className="h-5 w-5 text-[#F5B800]" />
                                        </div>
                                    </div>
                                    {/* Caption */}
                                    <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-linear-to-t from-[#111111] to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
                                        <p className="text-sm font-bold text-white">{item.judul}</p>
                                        <span className="mt-1 inline-block rounded border border-[#F5B800]/20 bg-[#F5B800]/10 px-2 py-0.5 text-[10px] font-bold tracking-widest text-[#F5B800] uppercase">
                                            {item.kategori}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div className="py-20 text-center text-white/30">
                                <p className="text-sm">Tidak ada foto untuk kategori ini</p>
                            </div>
                        )}
                    </div>
                </section>

            </CompanyLayout>

            {/* ── Lightbox ── */}
            {lightbox !== null && filtered[lightbox] && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    onClick={() => setLightbox(null)}
                >
                    {/* Close */}
                    <button
                        onClick={() => setLightbox(null)}
                        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:border-[#F5B800]/30 hover:text-[#F5B800]"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Prev */}
                    {lightbox > 0 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
                            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:border-[#F5B800]/30 hover:text-[#F5B800] lg:left-8"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                    )}

                    {/* Next */}
                    {lightbox < filtered.length - 1 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
                            className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:border-[#F5B800]/30 hover:text-[#F5B800] lg:right-8"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    )}

                    {/* Image */}
                    <div
                        className="mx-16 flex max-h-[85vh] max-w-4xl flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={imgSrc(filtered[lightbox])}
                            alt={filtered[lightbox].judul}
                            className="max-h-[75vh] w-auto rounded-xl object-contain shadow-2xl"
                        />
                        <div className="mt-4 text-center">
                            <p className="text-base font-bold text-white">{filtered[lightbox].judul}</p>
                            <span className="mt-1 inline-block rounded border border-[#F5B800]/20 bg-[#F5B800]/10 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-[#F5B800] uppercase">
                                {filtered[lightbox].kategori}
                            </span>
                            <p className="mt-2 text-xs text-white/30">{lightbox + 1} / {filtered.length}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
