import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import CompanyLayout from '@/layouts/company-layout';
import Pagination from '@/components/ui/pagination';

type Berita = {
    id: number;
    judul: string;
    slug: string;
    isi: string;
    gambar: string | null;
    gambar_url: string | null;
    tanggal_publish: string;
    is_published: boolean;
};

type PaginatedBerita = {
    data: Berita[];
    links: { url: string | null; label: string; active: boolean }[];
};

type Props = {
    profil: any;
    berita: PaginatedBerita | Berita[];
};

export default function BeritaPage({ profil, berita }: Props) {
    const isPaginated = berita && 'data' in berita;
    const data = isPaginated ? berita.data : (berita || []);
    const links = isPaginated ? berita.links : [];

    const formatDate = (d: string) =>
        new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    if (data.length === 0) {
        return (
            <CompanyLayout profil={profil} title="Berita & Kegiatan" subtitle="Berita" image="https://picsum.photos/1920/600?grayscale">
                <div className="py-20 text-center text-white/50">Belum ada berita yang diterbitkan.</div>
            </CompanyLayout>
        );
    }

    const [featured, ...rest] = data;

    return (
        <>
            <Head title="Berita — Tribuana Security" />
            <CompanyLayout profil={profil} title="Berita & Kegiatan" subtitle="Berita" image="https://picsum.photos/1920/600?grayscale&random=34">

                <section className="py-16 lg:py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">

                        {/* Featured article */}
                        {featured && (
                            <Link href={`/berita/${featured.slug}`} className="group mb-8 overflow-hidden rounded-2xl border border-white/5 bg-white/3 transition-all hover:border-[#F5B800]/20 lg:flex block">
                                <div className="relative h-56 shrink-0 overflow-hidden bg-[#181819] sm:h-64 lg:h-auto lg:w-2/5 lg:max-h-72">
                                    <img
                                        src={featured.gambar_url || (featured.gambar ? `/storage/${featured.gambar}` : `https://picsum.photos/800/500?grayscale&random=${featured.id}`)}
                                        alt={featured.judul}
                                        className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#181819]/60" />
                                    <div className="absolute left-4 top-4 rounded-full bg-[#F5B800] px-3 py-1 text-[10px] font-black tracking-widest text-[#111111] uppercase">
                                        Terbaru
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center p-8 lg:p-10">
                                    <div className="mb-3 flex items-center gap-1.5 text-xs text-white/35">
                                        <Calendar className="h-3.5 w-3.5 text-[#F5B800]/60" />
                                        {formatDate(featured.tanggal_publish)}
                                    </div>
                                    <h2 className="mb-4 text-2xl font-black leading-snug tracking-tight text-white transition-colors group-hover:text-[#F5B800] lg:text-3xl">
                                        {featured.judul}
                                    </h2>
                                    <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-white/45">
                                        {featured.isi.replace(/<[^>]*>/g, '')}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#F5B800]/60 uppercase transition-all group-hover:text-[#F5B800]">
                                        Baca Selengkapnya
                                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Rest of articles */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {rest.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/berita/${item.slug}`}
                                    className="group overflow-hidden rounded-2xl border border-white/5 bg-white/3 transition-all hover:-translate-y-1 hover:border-[#F5B800]/20 hover:shadow-xl hover:shadow-[#F5B800]/8 block"
                                >
                                    <div className="relative aspect-video overflow-hidden bg-[#181819]">
                                        <img
                                            src={item.gambar_url || (item.gambar ? `/storage/${item.gambar}` : `https://picsum.photos/600/340?grayscale&random=${item.id}`)}
                                            alt={item.judul}
                                            className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-[#181819]/80 to-transparent" />
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-3 flex items-center gap-1.5 text-xs text-white/30">
                                            <Calendar className="h-3.5 w-3.5 text-[#F5B800]/50" />
                                            {formatDate(item.tanggal_publish)}
                                        </div>
                                        <h3 className="mb-3 line-clamp-2 text-base font-black leading-snug tracking-tight text-white transition-colors group-hover:text-[#F5B800]">
                                            {item.judul}
                                        </h3>
                                        <p className="mb-5 line-clamp-2 text-sm text-white/40">
                                            {item.isi.replace(/<[^>]*>/g, '').substring(0, 100)}...
                                        </p>
                                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#F5B800]/50 uppercase transition-all group-hover:text-[#F5B800]">
                                            Baca Selengkapnya
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {links.length > 3 && <Pagination links={links} />}

                    </div>
                </section>

            </CompanyLayout>
        </>
    );
}