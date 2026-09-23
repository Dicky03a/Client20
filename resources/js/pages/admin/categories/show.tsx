import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FileText, Download, ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

export default function CategoryShow({ category }: { category: any }) {
    const [previewData, setPreviewData] = useState<{url: string, name: string} | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Kategori', href: '/admin/categories' },
        { title: category.name, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Kategori - ${category.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                <div className="mb-2">
                    <Link href="/admin/categories" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Manajemen Kategori
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
                        Data File: {category.name}
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Melihat dokumen yang telah diunggah berdasarkan subkategori.
                    </p>
                </div>

                <div className="space-y-6">
                    {category.subcategories.map((sub: any) => (
                        <div key={sub.id} className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                            <div className="bg-muted/50 p-4 border-b">
                                <h3 className="text-lg font-semibold">{sub.name}</h3>
                                <p className="text-sm text-muted-foreground">{sub.description}</p>
                            </div>
                            <div className="divide-y">
                                {sub.submissions && sub.submissions.length > 0 ? (
                                    sub.submissions.map((submission: any) => (
                                        <div key={submission.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-start sm:items-center gap-4">
                                                <div className="mt-1 sm:mt-0 flex-shrink-0">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                        <User className="w-5 h-5" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-neutral-900 dark:text-neutral-100">{submission.user?.name}</h4>
                                                    <p className="text-xs text-neutral-500">{submission.user?.email}</p>
                                                    {submission.user_file && (
                                                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 flex items-center">
                                                            <FileText className="w-3 h-3 mr-1" />
                                                            {submission.user_file.original_name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="sm:ml-4 sm:flex-shrink-0 flex items-center justify-end">
                                                {submission.user_file && (
                                                    <div className="flex items-center">
                                                        <Button variant="outline" size="sm" onClick={() => setPreviewData({url: `/admin/files/preview/${submission.user_file.id}`, name: submission.user_file.original_name})} className="mr-2 flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                                            <FileText className="w-4 h-4" />
                                                            Preview
                                                        </Button>
                                                        <a href={`/admin/files/download/${submission.user_file.id}`} target="_blank" rel="noopener noreferrer">
                                                            <Button variant="outline" size="sm" className="flex items-center gap-2 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20">
                                                                <Download className="w-4 h-4" />
                                                                Download
                                                            </Button>
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-4 text-sm text-muted-foreground text-center">
                                        Belum ada submisi untuk subkategori ini.
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {(!category.subcategories || category.subcategories.length === 0) && (
                        <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 shadow-sm">
                            <p className="text-muted-foreground">Kategori ini belum memiliki subkategori.</p>
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
