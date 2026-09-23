import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Circle, FileText, Download, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

export default function UserSubmissions({ user, categories }: { user: any, categories: any[] }) {
    const [previewData, setPreviewData] = useState<{url: string, name: string} | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Pengguna', href: '/admin/users' },
        { title: user.name, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Submissions - ${user.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                <div className="mb-2">
                    <Link href="/admin/users" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Manajemen Pengguna
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
                        Status Kategori: {user.name}
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Melihat dokumen yang telah diunggah oleh {user.name}.
                    </p>
                </div>

                <div className="space-y-6">
                    {categories.map((category) => (
                        <div key={category.id} className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                            <div className="bg-muted/50 p-4 border-b">
                                <h3 className="text-lg font-semibold">{category.name}</h3>
                                <p className="text-sm text-muted-foreground">{category.description}</p>
                            </div>
                            <div className="divide-y">
                                {category.subcategories.map((sub: any) => {
                                    const submission = sub.submissions?.[0];
                                    const isFilled = !!submission;

                                    return (
                                        <div key={sub.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-start sm:items-center gap-4">
                                                <div className="mt-1 sm:mt-0 flex-shrink-0">
                                                    {isFilled ? (
                                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                                    ) : (
                                                        <Circle className="w-5 h-5 text-neutral-300 dark:text-neutral-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">{sub.name}</h4>
                                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{sub.description}</p>
                                                    {isFilled && submission.user_file && (
                                                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 flex items-center">
                                                            <FileText className="w-3 h-3 mr-1" />
                                                            {submission.user_file.original_name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="sm:ml-4 sm:flex-shrink-0 flex items-center justify-end">
                                                {isFilled ? (
                                                    <div className="flex items-center">
                                                        <Button variant="outline" size="sm" onClick={() => setPreviewData({url: `/admin/files/preview/${submission.user_file?.id}`, name: submission.user_file?.original_name || 'Preview'})} className="mr-2 flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                                            <FileText className="w-4 h-4" />
                                                            Preview
                                                        </Button>
                                                        <a href={`/admin/files/download/${submission.user_file?.id}`} target="_blank" rel="noopener noreferrer">
                                                            <Button variant="outline" size="sm" className="flex items-center gap-2 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20">
                                                                <Download className="w-4 h-4" />
                                                                Download
                                                            </Button>
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full whitespace-nowrap">
                                                        Belum Diisi
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                                {category.subcategories.length === 0 && (
                                    <div className="p-4 text-sm text-muted-foreground text-center">
                                        Tidak ada subkategori.
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {categories.length === 0 && (
                        <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 shadow-sm">
                            <p className="text-muted-foreground">Sistem belum memiliki kategori.</p>
                        </div>
                    )}
                </div>
            </div>
            
            <Dialog open={!!previewData} onOpenChange={(open) => !open && setPreviewData(null)}>
                <DialogContent className="sm:max-w-[800px] w-[90vw] h-[90vh] flex flex-col p-0">
                    <DialogHeader className="p-4 border-b">
                        <DialogTitle>{previewData?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 p-0 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                        {previewData && (
                            <iframe src={previewData.url} className="w-full h-full border-0" title={previewData.name} />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
