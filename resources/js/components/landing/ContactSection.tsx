import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send, MessageSquare } from 'lucide-react';

type Props = {
    alamat?: string;
    telepon?: string;
    email?: string;
};

export default function ContactSection({ alamat, telepon, email }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [form, setForm] = useState({ nama: '', email: '', telepon: '', subjek: '', pesan: '' });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const inputClass =
        'w-full rounded-lg border border-white/8 bg-white/[0.04] px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#C9A84C]/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#C9A84C]/20';

    return (
        <section id="kontak" ref={sectionRef} className="relative overflow-hidden bg-[#0A0A0A] py-28 lg:py-36">

            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(201,168,76,0.05)_0%,_transparent_60%)]" />
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)',
                    backgroundSize: '20px 20px',
                }}
            />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                {/* ── Header ── */}
                <div className={`mb-16 transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-12 bg-[#C9A84C]" />
                        <span className="text-xs font-bold tracking-[0.3em] text-[#C9A84C] uppercase">Kontak</span>
                    </div>
                    <h2 className="text-4xl font-black leading-tight tracking-tight text-white lg:text-6xl uppercase">
                        Hubungi
                        <br />
                        <span className="text-[#C9A84C]">Tim Kami</span>
                    </h2>
                    <p className="mt-4 max-w-lg text-base text-white/50">
                        Konsultasikan kebutuhan keamanan Anda. Tim profesional kami siap membantu 24/7.
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-5">

                    {/* ── Form ── */}
                    <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${visible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
                        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 sm:p-8 lg:p-10">
                            <div className="mb-6 flex items-center gap-3">
                                <MessageSquare className="h-5 w-5 text-[#C9A84C]" />
                                <h3 className="text-base font-bold text-white">Kirim Pesan</h3>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-xs font-bold tracking-widest text-white/40 uppercase">Nama Lengkap</label>
                                    <input type="text" name="nama" value={form.nama} onChange={handleChange}
                                        placeholder="Nama Anda" className={inputClass} />
                                </div>
                                <div>
                                    <label className="mb-2 block text-xs font-bold tracking-widest text-white/40 uppercase">Email</label>
                                    <input type="email" name="email" value={form.email} onChange={handleChange}
                                        placeholder="email@contoh.com" className={inputClass} />
                                </div>
                                <div>
                                    <label className="mb-2 block text-xs font-bold tracking-widest text-white/40 uppercase">Telepon</label>
                                    <input type="tel" name="telepon" value={form.telepon} onChange={handleChange}
                                        placeholder="08xx-xxxx-xxxx" className={inputClass} />
                                </div>
                                <div>
                                    <label className="mb-2 block text-xs font-bold tracking-widest text-white/40 uppercase">Subjek</label>
                                    <input type="text" name="subjek" value={form.subjek} onChange={handleChange}
                                        placeholder="Topik pesan" className={inputClass} />
                                </div>
                            </div>

                            <div className="mt-5">
                                <label className="mb-2 block text-xs font-bold tracking-widest text-white/40 uppercase">Pesan</label>
                                <textarea name="pesan" value={form.pesan} onChange={handleChange} rows={5}
                                    placeholder="Tuliskan kebutuhan keamanan Anda..."
                                    className={`${inputClass} resize-none`}
                                />
                            </div>

                            <button className="group mt-6 flex items-center gap-2 rounded-lg bg-linear-to-r from-[#C9A84C] to-[#B8973F] px-8 py-4 text-sm font-bold tracking-widest text-[#0D1B2A] uppercase shadow-lg shadow-[#C9A84C]/20 transition-all hover:shadow-xl hover:shadow-[#C9A84C]/30 active:scale-95">
                                <Send className="h-4 w-4" />
                                Kirim Pesan
                            </button>
                        </div>
                    </div>

                    {/* ── Contact Info ── */}
                    <div className={`flex flex-col gap-5 lg:col-span-2 transition-all duration-700 delay-300 ${visible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                        {[
                            {
                                icon: MapPin,
                                label: 'Alamat Kantor',
                                value: alamat || 'Jl. Contoh No.123, Jakarta Selatan, DKI Jakarta 12345',
                            },
                            {
                                icon: Phone,
                                label: 'Telepon',
                                value: telepon || '(021) 1234-5678',
                            },
                            {
                                icon: Mail,
                                label: 'Email',
                                value: email || 'info@tribuana.co.id',
                            },
                        ].map((info) => {
                            const Icon = info.icon;
                            return (
                                <div key={info.label} className="group flex gap-5 rounded-2xl border border-white/5 bg-white/[0.03] p-7 transition-all hover:border-[#C9A84C]/15 hover:bg-[#C9A84C]/5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/10">
                                        <Icon className="h-5 w-5 text-[#C9A84C]" />
                                    </div>
                                    <div>
                                        <p className="mb-1 text-xs font-bold tracking-widest text-white/35 uppercase">{info.label}</p>
                                        <p className="text-sm leading-relaxed text-white/70">{info.value}</p>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Emergency badge */}
                        <div className="rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/8 p-7">
                            <div className="mb-3 flex items-center gap-2">
                                <div className="h-2 w-2 animate-pulse rounded-full bg-[#C9A84C]" />
                                <span className="text-xs font-bold tracking-widest text-[#C9A84C] uppercase">Siaga 24/7</span>
                            </div>
                            <p className="text-sm text-white/60">
                                Tim darurat kami siap merespons setiap situasi kapan saja, termasuk hari libur dan malam hari.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
