import { useEffect, useRef, useState } from 'react';
import { Shield, Target, Award, Users, CheckCircle2 } from 'lucide-react';
import { Link } from '@inertiajs/react';

type Props = {
    deskripsi?: string;
    tahun_berdiri?: number;
};

const WHY_US = [
    {
        icon: Award,
        title: 'Personel Bersertifikat Polri',
        desc: 'Seluruh personel lulus seleksi ketat dan memiliki sertifikasi resmi dari Kepolisian RI.',
        number: '01',
    },
    {
        icon: Shield,
        title: 'Respons Cepat 24/7',
        desc: 'Tim siaga beroperasi penuh 24 jam, 7 hari seminggu untuk respons instan setiap situasi.',
        number: '02',
    },
    {
        icon: Target,
        title: 'Pengalaman 15+ Tahun',
        desc: 'Lebih dari satu dekade melayani berbagai sektor industri dengan rekam jejak yang teruji.',
        number: '03',
    },
    {
        icon: Users,
        title: 'Mitra Pemerintah & Swasta',
        desc: 'Dipercaya ratusan instansi pemerintah, BUMN, dan perusahaan swasta terkemuka.',
        number: '04',
    },
];

export default function AboutSection({ deskripsi, tahun_berdiri }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="tentang" ref={sectionRef} className="relative overflow-hidden bg-[#111111] py-28 lg:py-36">

            {/* Background texture */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #F5B800 0, #F5B800 1px, transparent 0, transparent 50%)',
                    backgroundSize: '20px 20px',
                }}
            />
            <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[#F5B800]/4 blur-[100px]" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                {/* ── Section Header ── */}
                <div className={`mb-16 transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className="mb-4 flex items-center gap-3">
                        <div className="h-px w-12 bg-[#F5B800]" />
                        <span className="text-xs font-bold tracking-[0.3em] text-[#F5B800] uppercase">Tentang Kami</span>
                    </div>
                    <h2 className="text-4xl font-black leading-tight tracking-tight text-white uppercase lg:text-6xl">
                        Keamanan adalah
                        <br />
                        <span className="text-[#F5B800]">Prioritas Utama</span>
                    </h2>
                </div>

                {/* ── Split Layout ── */}
                <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">

                    {/* ── Left: Text + Quote + CTA ── */}
                    <div className={`transition-all duration-700 delay-200 ${visible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
                        <p className="text-lg leading-relaxed text-white/60">
                            {deskripsi ||
                                `PT Tribuana berdiri sejak ${tahun_berdiri || 2010} sebagai perusahaan jasa pengamanan yang berkomitmen memberikan solusi keamanan terpadu. Dengan personel terlatih dan bersertifikasi, kami hadir sebagai mitra terpercaya dalam menjaga aset, fasilitas, dan kepentingan Anda.`}
                        </p>
                        <p className="mt-5 text-lg leading-relaxed text-white/60">
                            Kami beroperasi dengan standar internasional, menggabungkan keahlian personel berpengalaman dengan teknologi pengamanan terkini untuk memberikan perlindungan menyeluruh.
                        </p>

                        {/* Highlights */}
                        <div className="mt-8 space-y-3">
                            {['Pengamanan Aset & Fasilitas', 'Pelatihan Kompetensi Satpam', 'Outsourcing Tenaga Keamanan'].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F5B800]" />
                                    <span className="text-sm font-medium text-white/65">{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <Link
                            href="/kontak"
                            className="group mt-8 inline-flex items-center gap-2 text-sm font-bold tracking-widest text-[#F5B800] uppercase transition-all hover:gap-4"
                        >
                            Konsultasi Sekarang
                            <span className="h-px w-8 bg-[#F5B800] transition-all group-hover:w-12" />
                        </Link>
                    </div>

                    {/* ── Right: Why Us cards ── */}
                    <div className={`relative transition-all duration-700 delay-300 ${visible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>

                        {/* Shield watermark behind the grid */}
                        <Shield
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#F5B800]/[0.04] pointer-events-none select-none"
                            style={{ width: '420px', height: '420px' }}
                            strokeWidth={0.75}
                        />

                        <div className="relative grid gap-4 sm:grid-cols-2">
                            {WHY_US.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.title}
                                        className={`group relative overflow-hidden rounded-xl border border-white/5 bg-white/3 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#F5B800]/25 hover:shadow-lg hover:shadow-[#F5B800]/8 ${
                                            visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                        }`}
                                        style={{ transitionDelay: `${400 + i * 80}ms` }}
                                    >
                                        {/* Icon */}
                                        <div className="mb-4 inline-flex rounded-lg border border-[#F5B800]/20 bg-[#F5B800]/10 p-3 transition-all group-hover:border-[#F5B800]/40 group-hover:bg-[#F5B800]/15">
                                            <Icon className="h-5 w-5 text-[#F5B800]" />
                                        </div>

                                        <h3 className="mb-2 text-sm font-black tracking-tight text-white">{item.title}</h3>
                                        <p className="text-xs leading-relaxed text-white/40">{item.desc}</p>

                                        {/* Bottom accent line */}
                                        <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[#F5B800]/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
