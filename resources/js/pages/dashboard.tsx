import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { ArrowRight, LayoutGrid } from 'lucide-react';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-6 p-4">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                        <LayoutGrid className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Selamat Datang di Tribuana Admin</h1>
                    <p className="mt-2 text-muted-foreground">
                        Kelola website company profile perusahaan pengamanan dari sini.
                    </p>
                    <Link
                        href="/admin/dashboard"
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                        Masuk ke Admin Dashboard
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
    ],
};
