import { Head, Link } from '@inertiajs/react';
import { Briefcase, MapPin, Calendar, Clock } from 'lucide-react';
import CompanyLayout from '@/layouts/company-layout';

type Karir = {
    id: number;
    posisi: string;
    deskripsi: string;
    syarat: string;
    lokasi: string;
    status: string;
    batas_daftar: string;
};

type Props = {
    profil: any;
    karir: Karir[];
};

export default function KarirPage({ profil, karir }: Props) {
    const formatDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const isExpired = (d: string) => new Date(d) < new Date();

    return (
        <>
            <Head title="Karir — Tribuana Security">
                <meta name="description" content="Bergabunglah dengan tim keamanan profesional Tribuana. Lihat lowongan kerja yang tersedia." />
            </Head>
            <CompanyLayout profil={profil} title="Karir" subtitle="Karir" image="https://picsum.photos/1920/600?grayscale&random=45">

                <section className="py-16 lg:py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mb-10 max-w-2xl">
                            <p className="text-lg leading-relaxed text-white/55">
                                Bergabunglah dengan tim profesional kami. Kami mencari individu yang berdedikasi tinggi untuk menjadi bagian dari keluarga besar Tribuana Security.
                            </p>
                        </div>

                        {karir.length === 0 ? (
                            <div className="rounded-2xl border border-white/5 bg-white/3 p-16 text-center">
                                <Briefcase className="mx-auto mb-4 h-12 w-12 text-white/15" />
                                <p className="text-white/40">Saat ini belum ada lowongan yang tersedia.</p>
                                <p className="mt-2 text-sm text-white/25">Silakan cek kembali nanti atau hubungi kami untuk informasi lebih lanjut.</p>
                            </div>
                        ) : (
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {karir.map((item) => (
                                    <div key={item.id} className="group overflow-hidden rounded-2xl border border-white/5 bg-white/3 p-7 transition-all hover:border-[#F5B800]/20">
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5B800]/10">
                                                <Briefcase className="h-5 w-5 text-[#F5B800]" />
                                            </div>
                                            <span className={`rounded px-2.5 py-1 text-[10px] font-bold uppercase ${
                                                isExpired(item.batas_daftar)
                                                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            }`}>
                                                {isExpired(item.batas_daftar) ? 'Ditutup' : 'Dibuka'}
                                            </span>
                                        </div>

                                        <h3 className="mb-3 text-lg font-black text-white">{item.posisi}</h3>

                                        <div className="mb-4 flex flex-wrap gap-3 text-xs text-white/40">
                                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-[#F5B800]/50" />{item.lokasi}</span>
                                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-[#F5B800]/50" />Batas: {formatDate(item.batas_daftar)}</span>
                                        </div>

                                        <div className="mb-5 text-sm text-white/45 line-clamp-3" dangerouslySetInnerHTML={{ __html: item.deskripsi }} />

                                        {!isExpired(item.batas_daftar) && (
                                            <Link
                                                href="/kontak"
                                                className="flex items-center justify-center gap-2 rounded-lg border border-[#F5B800]/30 py-2.5 text-xs font-bold tracking-widest text-[#F5B800] uppercase transition-all hover:bg-[#F5B800]/10"
                                            >
                                                Lamar Sekarang
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

            </CompanyLayout>
        </>
    );
}
