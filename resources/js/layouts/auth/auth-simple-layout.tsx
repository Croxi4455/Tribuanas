import { Link } from '@inertiajs/react';
import { Shield } from 'lucide-react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0D1B2A]">

            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="https://picsum.photos/1920/1080?grayscale&random=10"
                    alt=""
                    className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-[#0D1B2A]/80" />
                <div className="absolute inset-0 bg-linear-to-br from-[#0D1B2A]/60 via-transparent to-[#060E1B]/90" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
            </div>

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Card */}
            <div className="relative z-10 w-full max-w-md px-6 py-10">
                <div className="rounded-2xl border border-white/8 bg-[#0D1B2A]/70 p-10 shadow-2xl backdrop-blur-sm">

                    {/* Logo */}
                    <div className="mb-8 flex flex-col items-center gap-4">
                        <Link href={home()} className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-[#C9A84C] to-[#A88B3A] shadow-lg shadow-[#C9A84C]/20">
                                <Shield className="h-6 w-6 text-[#0D1B2A]" strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-base font-black tracking-[0.15em] text-white uppercase">Tribuana</span>
                                <span className="text-[9px] font-medium tracking-[0.3em] text-[#C9A84C]/60 uppercase">Security</span>
                            </div>
                        </Link>

                        <div className="text-center">
                            <div className="mb-3 flex items-center justify-center gap-3">
                                <div className="h-px w-8 bg-[#C9A84C]/50" />
                                <span className="text-[10px] font-bold tracking-[0.3em] text-[#C9A84C]/70 uppercase">Admin Panel</span>
                                <div className="h-px w-8 bg-[#C9A84C]/50" />
                            </div>
                            <h1 className="text-xl font-black tracking-tight text-white uppercase">{title}</h1>
                            {description && (
                                <p className="mt-1.5 text-sm text-white/40">{description}</p>
                            )}
                        </div>
                    </div>

                    {/* Form slot */}
                    <div className="[&_label]:text-white/60 [&_label]:text-xs [&_label]:font-bold [&_label]:tracking-wider [&_label]:uppercase [&_input]:bg-white/5 [&_input]:border-white/10 [&_input]:text-white [&_input]:placeholder:text-white/20 [&_input:focus]:border-[#C9A84C]/50 [&_input:focus]:ring-[#C9A84C]/20 [&_a]:text-[#C9A84C] [&_a:hover]:text-[#C9A84C]/80">
                        {children}
                    </div>
                </div>

                {/* Back to home */}
                <div className="mt-6 text-center">
                    <Link
                        href={home()}
                        className="text-xs text-white/30 transition-colors hover:text-[#C9A84C]"
                    >
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}
