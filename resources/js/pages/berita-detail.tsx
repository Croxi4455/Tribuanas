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

const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

export default function BeritaDetailPage({ profil, berita, beritaLainnya }: Props) {
    const imgSrc = berita.gambar_url || `https://picsum.photos/1200/600?grayscale&random=${berita.id}`;

    return (
        <>
            <Head title={`${berita.judul} — Tribuana Security`} />
            <CompanyLayout
                profil={profil}
                title={berita.judul}
                subtitle="Berita"
                image={imgSrc}
            >
                <section className="py-16 lg:py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-3">

                            {/* ── Artikel Utama ── */}
                            <div className="lg:col-span-2">
                                <Link
                                    href="/berita"
                                    className="mb-8 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-[#F5B800]"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Kembali ke Berita
                                </Link>

                                {/* Meta */}
                                <div className="mb-6 flex items-center gap-2 text-xs text-white/35">
                                    <Calendar className="h-3.5 w-3.5 text-[#F5B800]/60" />
                                    {formatDate(berita.tanggal_publish)}
                                </div>

                                {/* Gambar */}
                                <div className="mb-8 overflow-hidden rounded-2xl">
                                    <img
                                        src={imgSrc}
                                        alt={berita.judul}
                                        className="max-h-[480px] w-full object-cover object-center"
                                    />
                                </div>

                                {/* Konten */}
                                <div
                                    className="prose prose-invert prose-sm max-w-none prose-headings:font-black prose-headings:text-white prose-p:text-white/60 prose-p:leading-relaxed prose-a:text-[#F5B800] prose-strong:text-white"
                                    dangerouslySetInnerHTML={{ __html: berita.isi }}
                                />
                            </div>

                            {/* ── Sidebar ── */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <h3 className="mb-6 text-xs font-black tracking-[0.25em] text-white/40 uppercase">
                                        Berita Lainnya
                                    </h3>
                                    <div className="space-y-4">
                                        {beritaLainnya.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/berita/${item.slug}`}
                                                className="group flex gap-4 rounded-xl border border-white/5 bg-white/3 p-4 transition-all hover:border-[#F5B800]/20"
                                            >
                                                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white/5">
                                                    <img
                                                        src={item.gambar_url || `https://picsum.photos/100/100?grayscale&random=${item.id}`}
                                                        alt={item.judul}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="line-clamp-2 text-sm font-bold text-white/70 transition-colors group-hover:text-white">
                                                        {item.judul}
                                                    </p>
                                                    <p className="mt-1 text-xs text-white/30">
                                                        {formatDate(item.tanggal_publish)}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    <Link
                                        href="/berita"
                                        className="mt-6 flex items-center gap-2 text-xs font-bold tracking-widest text-[#F5B800]/60 uppercase transition-colors hover:text-[#F5B800]"
                                    >
                                        Lihat Semua Berita
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </CompanyLayout>
        </>
    );
}
