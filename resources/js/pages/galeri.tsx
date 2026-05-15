import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
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
    { value: 'semua', label: 'Semua' },
    { value: 'kegiatan', label: 'Kegiatan' },
    { value: 'pelatihan', label: 'Pelatihan' },
    { value: 'fasilitas', label: 'Fasilitas' },
    { value: 'event', label: 'Event' },
];

export default function GaleriPage({ profil, galeri }: Props) {
    const [active, setActive] = useState('semua');
    const filtered = active === 'semua' ? galeri : galeri.filter((g) => g.kategori === active);

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
                                    onClick={() => setActive(tab.value)}
                                    className={`rounded-lg px-5 py-2 text-sm font-bold tracking-widest uppercase transition-all ${
                                        active === tab.value
                                            ? 'bg-[#C9A84C] text-[#0D1B2A] shadow-lg shadow-[#C9A84C]/20'
                                            : 'border border-white/10 text-white/40 hover:border-white/20 hover:text-white'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Grid */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {filtered.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative aspect-4/3 overflow-hidden rounded-xl border border-white/5 bg-[#111827] transition-all hover:border-[#C9A84C]/20 hover:shadow-xl hover:shadow-[#C9A84C]/10"
                                >
                                    <img
                                        src={item.gambar || `https://picsum.photos/400/300?grayscale&blur=1&random=${item.id}`}
                                        alt={item.judul}
                                        className="h-full w-full object-cover opacity-50 transition-all duration-500 group-hover:scale-105 group-hover:opacity-70"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0D1B2A]/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <ZoomIn className="mb-3 h-8 w-8 text-[#C9A84C]" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-linear-to-t from-[#0D1B2A] to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
                                        <p className="text-sm font-bold text-white">{item.judul}</p>
                                        <span className="mt-1 inline-block rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-2.5 py-0.5 text-[10px] font-bold tracking-widest text-[#C9A84C] uppercase">
                                            {item.kategori}
                                        </span>
                                    </div>
                                </div>
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
        </>
    );
}
