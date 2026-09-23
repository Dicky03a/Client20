import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FileUp, CheckCircle, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

export default function CategoryShow({ category, subcategories }: { category: any, subcategories: any[] }) {
    const [previewData, setPreviewData] = useState<{url: string, name: string} | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Categories', href: '/user/submissions' },
        { title: category.name, href: `/user/categories/${category.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={category.name} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">{category.name}</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">{category.description}</p>
                </div>
                <div className="grid gap-4">
                    {subcategories.map((sub) => (
                        <div key={sub.id} className="bg-white dark:bg-neutral-800 rounded-xl p-5 shadow-sm border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{sub.name}</h3>
                                    {sub.is_filled ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                            <CheckCircle className="w-3 h-3 justify-center mr-1" />
                                            Filled
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                            Pending
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl">{sub.description}</p>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                                {sub.is_filled ? (
                                    <button type="button" onClick={() => setPreviewData({url: `/user/files/preview/${sub.submission?.user_file_id}`, name: 'Document Preview'})} className="inline-flex items-center justify-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-transparent hover:bg-blue-50 transition">
                                        <Search className="w-4 h-4 mr-2" />
                                        Preview File
                                    </button>
                                ) : (
                                    <Link
                                        href={`/user/subcategories/${sub.id}`}
                                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
                                    >
                                        <FileUp className="w-4 h-4 mr-2" />
                                        Upload File
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
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
