import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, ArrowUpRight } from 'lucide-react';

type Berita = {
    id: number;
    judul: string;
    slug: string;
    isi: string;
    gambar: string | null;
    tanggal_publish: string;
    is_published: boolean;
};

type Props = {
    berita: Berita[];
};

const DUMMY_BERITA: Berita[] = [
    {
        id: 1,
        judul: 'Tribuana Raih Penghargaan Perusahaan Keamanan Terbaik 2025',
        slug: 'penghargaan-terbaik-2025',
        isi: 'PT Tribuana berhasil meraih penghargaan bergengsi sebagai perusahaan jasa keamanan terbaik dalam ajang Indonesia Security Awards 2025 yang diselenggarakan di Jakarta Convention Center.',
        gambar: null,
        tanggal_publish: '2025-11-10',
        is_published: true,
    },
    {
        id: 2,
        judul: 'Peluncuran Program Pelatihan Gada Utama Angkatan ke-12',
        slug: 'pelatihan-gada-utama-angkatan-12',
        isi: 'Tribuana resmi membuka pendaftaran Program Pelatihan Gada Utama Angkatan ke-12. Program ini dirancang untuk mencetak manajer keamanan profesional bersertifikat Polri.',
        gambar: null,
        tanggal_publish: '2025-10-22',
        is_published: true,
    },
    {
        id: 3,
        judul: 'Kerjasama Strategis dengan 5 BUMN Baru di Kuartal IV 2025',
        slug: 'kerjasama-bumn-q4-2025',
        isi: 'Tribuana menandatangani perjanjian kerjasama dengan lima Badan Usaha Milik Negara baru, memperluas jangkauan layanan keamanan ke sektor energi dan infrastruktur nasional.',
        gambar: null,
        tanggal_publish: '2025-09-15',
        is_published: true,
    },
];

export default function NewsSection({ berita }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const data = berita.length > 0 ? berita.slice(0, 3) : DUMMY_BERITA;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <section id="berita" ref={sectionRef} className="relative overflow-hidden bg-[#111827] py-28 lg:py-36">

            {/* Angled top */}
            <div className="absolute left-0 right-0 top-0 h-16 bg-[#0A0A0A]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)' }}
            />

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.04)_0%,_transparent_60%)]" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                {/* ── Header ── */}
                <div className={`mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-12 bg-[#C9A84C]" />
                            <span className="text-xs font-bold tracking-[0.3em] text-[#C9A84C] uppercase">Berita Terkini</span>
                        </div>
                        <h2 className="text-4xl font-black leading-tight tracking-tight text-white lg:text-6xl uppercase">
                            Berita &
                            <br />
                            <span className="text-[#C9A84C]">Kegiatan</span>
                        </h2>
                    </div>
                    <button className="group flex items-center gap-2 self-start rounded-lg border border-white/10 px-6 py-3 text-sm font-bold tracking-widest text-white/50 uppercase transition-all hover:border-[#C9A84C]/30 hover:text-[#C9A84C] lg:self-auto">
                        Lihat Semua
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>

                {/* ── News Grid ── */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {data.map((item, i) => (
                        <NewsCard
                            key={item.id}
                            item={item}
                            visible={visible}
                            delay={i * 120}
                            formatDate={formatDate}
                            featured={i === 0}
                        />
                    ))}
                </div>
            </div>

            {/* Angled bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#0A0A0A]"
                style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
            />
        </section>
    );
}

function NewsCard({
    item,
    visible,
    delay,
    formatDate,
    featured,
}: {
    item: (typeof DUMMY_BERITA)[0];
    visible: boolean;
    delay: number;
    formatDate: (d: string) => string;
    featured: boolean;
}) {
    const excerpt = item.isi.replace(/<[^>]*>/g, '').substring(0, 130);

    return (
        <article
            className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A84C]/20 hover:shadow-2xl hover:shadow-[#C9A84C]/8 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${200 + delay}ms` }}
        >
            {/* Image area */}
            <div className="relative aspect-video overflow-hidden bg-[#0D1B2A]">
                <img
                    src={item.gambar || `https://picsum.photos/600/340?grayscale&blur=1&random=${item.id}`}
                    alt={item.judul}
                    className="h-full w-full object-cover opacity-40 transition-all duration-500 group-hover:scale-105 group-hover:opacity-50"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0D1B2A] via-[#0D1B2A]/40 to-transparent" />

                {/* Date badge */}
                <div className="absolute bottom-4 left-5 flex items-center gap-1.5 rounded-full border border-[#C9A84C]/20 bg-[#0D1B2A]/80 px-3 py-1.5 backdrop-blur-sm">
                    <Calendar className="h-3 w-3 text-[#C9A84C]" />
                    <span className="text-[10px] font-semibold text-[#C9A84C]">{formatDate(item.tanggal_publish)}</span>
                </div>

                {featured && (
                    <div className="absolute right-4 top-4 rounded-full bg-[#C9A84C] px-3 py-1 text-[10px] font-black tracking-widest text-[#0D1B2A] uppercase">
                        Terbaru
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-7">
                <h3 className="mb-3 line-clamp-2 text-lg font-black leading-snug tracking-tight text-white transition-colors group-hover:text-[#C9A84C]">
                    {item.judul}
                </h3>
                <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-white/40">
                    {excerpt}...
                </p>
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#C9A84C]/50 uppercase transition-all group-hover:text-[#C9A84C]">
                    Baca Selengkapnya
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
            </div>

            <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[#C9A84C]/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </article>
    );
}
