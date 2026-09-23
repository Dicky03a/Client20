import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Folder, CheckCircle, Circle, FileText, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Categories', href: '/user/submissions' },
];

export default function CategoriesIndex({ categories, recentSubmissions = [] }: { categories: any[], recentSubmissions?: any[] }) {
    const [previewData, setPreviewData] = useState<{url: string, name: string} | null>(null);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/user/categories/${category.id}`}
                            className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow relative overflow-hidden group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors">
                                    {category.name}
                                </h3>
                                <Folder className="w-6 h-6 text-neutral-400 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6 line-clamp-2">
                                {category.description}
                            </p>
                            <div className="flex items-center text-sm font-medium">
                                {category.filled_count === category.subcategories_count && category.subcategories_count > 0 ? (
                                    <span className="flex items-center text-green-600 dark:text-green-400">
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Completed ({category.filled_count}/{category.subcategories_count})
                                    </span>
                                ) : (
                                    <span className="flex items-center text-neutral-600 dark:text-neutral-300">
                                        <Circle className="w-4 h-4 mr-2" />
                                        {category.filled_count}/{category.subcategories_count} Subcategories Filled
                                    </span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {recentSubmissions && recentSubmissions.length > 0 && (
                    <div className="mt-8 border-t border-neutral-200 dark:border-neutral-700 pt-8">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                            Riwayat Dokumen yang Diunggah
                        </h2>
                        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                            <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
                                {recentSubmissions.map((sub) => (
                                    <li key={sub.id} className="p-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition">
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1">
                                                <FileText className="w-6 h-6 text-blue-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{sub.user_file.original_name}</h4>
                                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                                    {sub.subcategory.category.name} — {sub.subcategory.name} • {new Date(sub.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => setPreviewData({url: `/user/files/preview/${sub.user_file.id}`, name: sub.user_file.original_name})}
                                            className="ml-4 inline-flex items-center px-3 py-1.5 border border-blue-200 dark:border-blue-800 text-xs font-medium rounded text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition"
                                        >
                                            <Search className="w-3 h-3 mr-1.5" />
                                            Preview
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            <Dialog open={!!previewData} onOpenChange={(open) => !open && setPreviewData(null)}>
                <DialogContent className="sm:max-w-[800px] w-[90vw] h-[90vh] flex flex-col p-0">
                    <DialogHeader className="p-4 border-b bg-white dark:bg-neutral-800">
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
