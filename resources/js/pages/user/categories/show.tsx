import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FileUp, CheckCircle, Search } from 'lucide-react';

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
            
            {previewData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm">
                    <div className="flex flex-col w-full max-w-5xl h-[80vh] md:h-[90vh] bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-3 md:p-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center bg-neutral-50 dark:bg-neutral-900">
                            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm md:text-base truncate mr-3">{previewData.name}</h3>
                            <button type="button" onClick={() => setPreviewData(null)} className="flex-shrink-0 text-xs md:text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 px-3 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md">
                                Tutup
                            </button>
                        </div>
                        <div className="flex-1 p-0 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                            <iframe src={previewData.url} className="w-full h-full border-0" title={previewData.name} />
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
