import { Head } from '@inertiajs/react';
import { Building2, MapPin, Plus } from 'lucide-react';

type Mitra = {
    id: number;
    nama: string;
    logo: string | null;
    kota: string;
    tahun: number;
};

type Props = {
    mitra: Mitra[];
};

export default function MitraIndex({ mitra }: Props) {
    return (
        <>
            <Head title="Manajemen Mitra" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Manajemen Mitra</h1>
                        <p className="text-muted-foreground">
                            Kelola data perusahaan dan instansi mitra
                        </p>
                    </div>
                    <button
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-50 cursor-not-allowed"
                        disabled
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Mitra
                    </button>
                </div>

                {/* Grid Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {mitra.map((item) => (
                        <div
                            key={item.id}
                            className="group relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-card p-5 transition-all hover:shadow-md dark:border-sidebar-border"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                                    <Building2 className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-sm font-semibold leading-snug">{item.nama}</h3>
                                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                                        <span className="inline-flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            {item.kota}
                                        </span>
                                        <span>Sejak {item.tahun}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-end gap-1">
                                <button className="rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                                    Edit
                                </button>
                                <button className="rounded-md px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400">
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-xs text-muted-foreground">Total: {mitra.length} mitra</p>
            </div>
        </>
    );
}

MitraIndex.layout = {
    breadcrumbs: [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: 'Mitra', href: '/admin/mitra' },
    ],
};
