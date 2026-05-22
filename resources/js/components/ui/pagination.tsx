import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationLink = { url: string | null; label: string; active: boolean };
type Props = { links: PaginationLink[] };

export default function Pagination({ links }: Props) {
    if (links.length <= 3) return null; // no pagination needed

    return (
        <div className="mt-10 flex items-center justify-center gap-1">
            {links.map((link, i) => {
                const isFirst = i === 0;
                const isLast = i === links.length - 1;
                const label = isFirst ? <ChevronLeft className="h-4 w-4" /> : isLast ? <ChevronRight className="h-4 w-4" /> : <span dangerouslySetInnerHTML={{ __html: link.label }} />;

                if (!link.url) {
                    return (
                        <span key={i} className="flex h-9 w-9 items-center justify-center rounded-lg text-xs text-white/20">
                            {label}
                        </span>
                    );
                }

                return (
                    <Link
                        key={i}
                        href={link.url}
                        className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-bold transition-all ${
                            link.active
                                ? 'bg-[#F5B800] text-[#111]'
                                : 'border border-white/8 text-white/50 hover:border-[#F5B800]/30 hover:text-[#F5B800]'
                        }`}
                    >
                        {label}
                    </Link>
                );
            })}
        </div>
    );
}
