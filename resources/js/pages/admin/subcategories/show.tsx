import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FileText, Download, ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

export default function SubcategoryShow({ subcategory }: { subcategory: any }) {
    const [previewData, setPreviewData] = useState<{url: string, name: string} | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Subkategori', href: '/admin/subcategories' },
        { title: subcategory.name, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Subkategori - ${subcategory.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                <div className="mb-2">
                    <Link href="/admin/subcategories" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Manajemen Subkategori
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
                        Data File: {subcategory.name}
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Melihat dokumen yang telah diunggah untuk subkategori ini.
                    </p>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                    <div className="bg-muted/50 p-4 border-b">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                                {subcategory.category?.name || 'Kategori Utama'}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold">{subcategory.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{subcategory.description}</p>
                    </div>
                    <div className="divide-y">
                        {subcategory.submissions && subcategory.submissions.length > 0 ? (
                            subcategory.submissions.map((submission: any) => (
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
                            <div className="p-8 text-center text-muted-foreground">
                                Belum ada submisi untuk subkategori ini.
                            </div>
                        )}
                    </div>
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
