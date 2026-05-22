import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import Footer from '@/components/landing/Footer';
import ServicesSection from '@/components/landing/ServicesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PartnersSection from '@/components/landing/PartnersSection';
import AboutSection from '@/components/landing/AboutSection';

type Profil = {
    nama_perusahaan: string;
    tagline: string | null;
    deskripsi: string;
    alamat: string;
    telepon: string;
    email: string;
    tahun_berdiri: number;
    logo_url?: string | null;
    facebook: string | null;
    instagram: string | null;
    twitter: string | null;
} | null;

type Props = {
    profil: Profil;
    layanan: any[];
    mitra: any[];
    testimoni: any[];
};

export default function Welcome({ profil, layanan, mitra, testimoni }: Props) {
    return (
        <>
            <Head title={profil?.nama_perusahaan || 'PT Tribuana - Jasa Pengamanan Profesional'}>
                <meta name="description" content={profil?.tagline || 'Penyedia jasa pengamanan profesional dan terpercaya'} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#0A0A0A]" style={{ fontFamily: "'Inter', sans-serif" }}>
                <Navbar logo={profil?.logo_url} />

                {/* Hero — full viewport */}
                <HeroSection
                    nama={profil?.nama_perusahaan}
                    tagline={profil?.tagline || undefined}
                />

                {/* About — ringkas */}
                <AboutSection
                    deskripsi={profil?.deskripsi}
                    tahun_berdiri={profil?.tahun_berdiri}
                />

                {/* Layanan — 3 preview cards */}
                <ServicesSection layanan={layanan} />

                {/* Mitra marquee */}
                <PartnersSection mitra={mitra} />

                {/* Testimoni */}
                <TestimonialsSection testimoni={testimoni} />

                <Footer
                    nama={profil?.nama_perusahaan}
                    logo={profil?.logo_url}
                    facebook={profil?.facebook}
                    instagram={profil?.instagram}
                    twitter={profil?.twitter}
                    layanan={(usePage().props as any).footerData?.layanan}
                    pelatihan={(usePage().props as any).footerData?.pelatihan}
                />
            </div>
        </>
    );
}
