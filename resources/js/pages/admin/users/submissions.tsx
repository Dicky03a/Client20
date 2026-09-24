import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Circle, Download, FileText } from 'lucide-react';

import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserSubmissions({ user, categories }: { user: any; categories: any[] }) {
    const [previewData, setPreviewData] = useState<{ url: string; name: string } | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Pengguna', href: '/admin/users' },
        { title: user.name, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Submissions - ${user.name}`} />
            <div className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8">
                <div className="mb-2">
                    <Link href="/admin/users" className="mb-4 flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                        <ArrowLeft className="mr-1 h-4 w-4" /> Kembali ke Manajemen Pengguna
                    </Link>
                    <h1 className="bg-gradient-to-r from-neutral-900 to-neutral-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-neutral-100 dark:to-neutral-400">
                        Status Kategori: {user.name}
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">Melihat dokumen yang telah diunggah oleh {user.name}.</p>
                </div>

                <div className="space-y-6">
                    {categories.map((category) => (
                        <div key={category.id} className="bg-card text-card-foreground overflow-hidden rounded-xl border shadow-sm">
                            <div className="bg-muted/50 border-b p-4">
                                <h3 className="text-lg font-semibold">{category.name}</h3>
                                <p className="text-muted-foreground text-sm">{category.description}</p>
                            </div>
                            <div className="divide-y">
                                {category.subcategories.map(
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    (sub: any) => {
                                    const submission = sub.submissions?.[0];
                                    const isFilled = !!submission;

                                    return (
                                        <div key={sub.id} className="flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center">
                                            <div className="flex items-start gap-4 sm:items-center">
                                                <div className="mt-1 flex-shrink-0 sm:mt-0">
                                                    {isFilled ? (
                                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                                    ) : (
                                                        <Circle className="h-5 w-5 text-neutral-300 dark:text-neutral-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">{sub.name}</h4>
                                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{sub.description}</p>
                                                    {isFilled && submission.user_file && (
                                                        <p className="mt-1 flex items-center text-xs text-blue-600 dark:text-blue-400">
                                                            <FileText className="mr-1 h-3 w-3" />
                                                            {submission.user_file.original_name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-end sm:ml-4 sm:flex-shrink-0">
                                                {isFilled ? (
                                                    <div className="flex items-center">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                setPreviewData({
                                                                    url: `/admin/files/preview/${submission.user_file?.id}`,
                                                                    name: submission.user_file?.original_name || 'Preview',
                                                                })
                                                            }
                                                            className="mr-2 flex items-center gap-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20"
                                                        >
                                                            <FileText className="h-4 w-4" />
                                                            Preview
                                                        </Button>
                                                        <a
                                                            href={`/admin/files/download/${submission.user_file?.id}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="flex items-center gap-2 border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20"
                                                            >
                                                                <Download className="h-4 w-4" />
                                                                Download
                                                            </Button>
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium whitespace-nowrap text-amber-600 dark:bg-amber-900/20">
                                                        Belum Diisi
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                                {category.subcategories.length === 0 && (
                                    <div className="text-muted-foreground p-4 text-center text-sm">Tidak ada subkategori.</div>
                                )}
                            </div>
                        </div>
                    ))}
                    {categories.length === 0 && (
                        <div className="rounded-xl border border-neutral-200 bg-white py-12 text-center shadow-sm dark:bg-neutral-800">
                            <p className="text-muted-foreground">Sistem belum memiliki kategori.</p>
                        </div>
                    )}
                </div>
            </div>

            {previewData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm sm:p-6">
                    <div className="animate-in fade-in zoom-in-95 flex h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl duration-200 md:h-[90vh] dark:border-neutral-700 dark:bg-neutral-800">
                        <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 p-3 md:p-4 dark:border-neutral-700 dark:bg-neutral-900">
                            <h3 className="mr-3 truncate text-sm font-medium text-neutral-900 md:text-base dark:text-neutral-100">
                                {previewData.name}
                            </h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPreviewData(null)}
                                className="h-8 flex-shrink-0 text-xs md:h-9 md:text-sm"
                            >
                                Tutup
                            </Button>
                        </div>
                        <div className="flex-1 overflow-hidden bg-neutral-100 p-0 dark:bg-neutral-900">
                            <iframe src={previewData.url} className="h-full w-full border-0" title={previewData.name} />
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
