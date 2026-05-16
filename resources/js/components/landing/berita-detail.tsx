import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Calendar, ArrowLeft, ArrowUpRight } from 'lucide-react';
import CompanyLayout from '@/layouts/company-layout';

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

type Props = {
    profil: any;
    berita: Berita;
    beritaLainnya: Berita[];
};

export default function BeritaDetailPage({ profil, berita, beritaLainnya }: Props) {
    const formatDate = (d: string) =>
        new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <>
            <Head title={`${berita.judul} — Tribuana Security`} />
            <CompanyLayout profil={profil} title="Detail Berita" subtitle="Berita & Kegiatan">
                <section className="relative pt-12 pb-24">
                    {/* Background glows */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#C9A84C]/5 blur-[120px] rounded-full pointer-events-none" />
                    
                    <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
                        {/* Back button */}
                        <Link 
                            href="/berita" 
                            className="group mb-12 inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-white/50 uppercase transition-all hover:text-[#C9A84C]"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:border-[#C9A84C]/40 group-hover:bg-[#C9A84C]/10">
                                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                            </div>
                            Kembali ke Berita
                        </Link>

                        {/* Article Header */}
                        <header className="mb-14 text-center">
                            <div className="mb-6 flex items-center justify-center gap-2 text-sm font-medium text-[#C9A84C]">
                                <Calendar className="h-4 w-4" />
                                {formatDate(berita.tanggal_publish)}
                            </div>
                            <h1 className="text-4xl font-black leading-[1.15] tracking-tight text-white md:text-5xl lg:text-6xl">
                                {berita.judul}
                            </h1>
                            <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-linear-to-r from-[#C9A84C] to-transparent" />
                        </header>

                        {/* Article Hero Image */}
                        <div className="group relative mb-16 overflow-hidden rounded-[2rem] bg-[#0D1B2A] shadow-2xl shadow-black/50">
                            <div className="absolute inset-0 bg-linear-to-t from-[#111111] via-transparent to-transparent opacity-60 z-10" />
                            <img
                                src={berita.gambar_url || (berita.gambar ? `/storage/${berita.gambar}` : `https://picsum.photos/1200/675?grayscale&random=${berita.id}`)}
                                alt={berita.judul}
                                className="aspect-[21/9] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        {/* Article Content */}
                        <div className="mx-auto max-w-3xl">
                            <div 
                                className="prose prose-invert prose-lg md:prose-xl max-w-none text-white/70 prose-headings:text-white prose-headings:font-bold prose-a:text-[#C9A84C] prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-xl prose-hr:border-white/10 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: berita.isi }}
                            />
                        </div>
                        
                        {/* Footer decorative */}
                        <div className="mt-20 flex justify-center mb-24">
                            <div className="h-2 w-2 rounded-full bg-[#C9A84C]/40" />
                            <div className="mx-2 h-2 w-2 rounded-full bg-[#C9A84C]/60" />
                            <div className="h-2 w-2 rounded-full bg-[#C9A84C]/40" />
                        </div>
                    </div>

                    {/* Berita Lainnya Section */}
                    {beritaLainnya && beritaLainnya.length > 0 && (
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mb-10 border-t border-white/10 pt-16">
                                <h3 className="text-2xl font-black tracking-widest text-white uppercase mb-8 text-center">Berita Terbaru Lainnya</h3>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {beritaLainnya.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/berita/${item.slug}`}
                                            className="group overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] transition-all hover:-translate-y-1 hover:border-[#C9A84C]/20 hover:shadow-xl hover:shadow-[#C9A84C]/8 block"
                                        >
                                            <div className="relative aspect-video overflow-hidden bg-[#0D1B2A]">
                                                <img
                                                    src={item.gambar_url || (item.gambar ? `/storage/${item.gambar}` : `https://picsum.photos/400/225?grayscale&random=${item.id}`)}
                                                    alt={item.judul}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <div className="mb-3 flex items-center gap-1.5 text-xs text-[#C9A84C]">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {formatDate(item.tanggal_publish)}
                                                </div>
                                                <h4 className="line-clamp-2 text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#C9A84C]">
                                                    {item.judul}
                                                </h4>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </CompanyLayout>
        </>
    );
}
