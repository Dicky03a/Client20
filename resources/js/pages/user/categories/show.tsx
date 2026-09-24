import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FileUp, CheckCircle, Search, Folder, FileText, MoreVertical, LayoutGrid, List, Image as ImageIcon } from 'lucide-react';

import { useState } from 'react';

export default function CategoryShow({ category, subcategories }: { category: any, subcategories: any[] }) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Categories', href: '/user/submissions' },
        { title: category.name, href: `/user/categories/${category.id}` },
    ];

    const formatSize = (bytes?: number) => {
        if (bytes === undefined || bytes === null) return '';
        return (bytes / 1024).toFixed(2) + ' KB';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={category.name} />
            <div className="flex flex-col h-full flex-1 gap-6 mx-auto w-full max-w-7xl p-4 md:p-6 transition-all duration-300">
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Header matching Drive style */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                        <div>
                            <h1 className="text-2xl font-medium text-neutral-900 dark:text-white flex items-center gap-3">
                                <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                                    <Folder className="w-6 h-6 text-neutral-700 dark:text-neutral-300 fill-neutral-700/20 dark:fill-neutral-300/20" />
                                </div>
                                {category.name}
                            </h1>
                            {category.description && (
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 sm:ml-[3.25rem]">{category.description}</p>
                            )}
                        </div>
                        {/* View Toggle */}
                        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900/50 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-white' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                                title="Grid view"
                            >
                                <LayoutGrid className="w-[18px] h-[18px]" />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-white' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                                title="List view"
                            >
                                <List className="w-[18px] h-[18px]" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-4 px-1">Files & Folders</h2>
                        
                        {viewMode === 'grid' ? (
                            <div className="grid gap-4 xl:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {subcategories.map((sub) => {
                                    const userFile = sub.submission?.user_file;
                                    const isImage = userFile?.mime_type?.startsWith('image/');
                                    const fileName = userFile?.original_name || sub.name;
                                    const fileSize = formatSize(userFile?.size);

                                    return (
                                        <div key={sub.id} className="group relative flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:bg-neutral-50 dark:hover:bg-neutral-800/80 hover:shadow-md transition-all duration-200">
                                            <div className="h-40 sm:h-44 bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center border-b border-neutral-100 dark:border-neutral-800 relative z-10 w-full overflow-hidden">
                                                {sub.is_filled ? (
                                                    <a href={`/user/files/preview/${sub.submission.user_file_id}`} target="_blank" rel="noreferrer" className="w-full h-full block">
                                                        {isImage ? (
                                                            <img src={`/user/files/preview/${sub.submission.user_file_id}`} alt={fileName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-white dark:bg-neutral-800 group-hover:bg-neutral-50 dark:group-hover:bg-neutral-900 transition-colors">
                                                                <FileText className="w-12 h-12 text-blue-500" />
                                                            </div>
                                                        )}
                                                    </a>
                                                ) : (
                                                    <>
                                                        <Folder className="w-16 h-16 text-neutral-300 dark:text-neutral-700 fill-neutral-300/30 dark:fill-neutral-700/30" />
                                                        <div className="absolute inset-0 flex gap-3 items-center justify-center transition-opacity backdrop-blur-[1px] bg-black/5 dark:bg-black/20 opacity-0 group-hover:opacity-100">
                                                            <Link 
                                                                href={`/user/subcategories/${sub.id}`}
                                                                className="p-3 bg-blue-600/95 text-white rounded-full shadow-lg hover:scale-110 transition-transform btn-upload relative z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                title="Upload File"
                                                            >
                                                                <FileUp className="w-4 h-4" />
                                                            </Link>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            
                                            <div className="p-3 bg-white dark:bg-neutral-900 flex flex-col justify-center min-h-[4.5rem]">
                                                <div className="flex items-center gap-2">
                                                    <div className="shrink-0 flex items-center justify-center">
                                                        {sub.is_filled ? (
                                                            isImage ? <ImageIcon className="w-4 h-4 text-blue-500" /> : <FileText className="w-4 h-4 text-blue-500" />
                                                        ) : (
                                                            <Folder className="w-4 h-4 text-neutral-500 fill-neutral-500/20" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0 flex flex-col items-start leading-tight">
                                                        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate w-full" title={sub.name}>
                                                            {sub.name}
                                                        </p>
                                                        {sub.description && (
                                                            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate w-full mt-0.5" title={sub.description}>
                                                                {sub.description}
                                                            </p>
                                                        )}
                                                        {sub.is_filled ? (
                                                            <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5 truncate w-full" title={`${fileName} • ${fileSize}`}>
                                                                {fileName} • {fileSize}
                                                            </p>
                                                        ) : (
                                                            <p className="text-[11px] font-medium text-amber-500 dark:text-amber-500/80 mt-0.5">
                                                                Pending
                                                            </p>
                                                        )}
                                                    </div>
                                                    <button className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 shrink-0 self-start mt-[-2px] focus:outline-none">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            {/* Link wrapper overlay for accessibility */}
                                            {!sub.is_filled && (
                                                <Link href={`/user/subcategories/${sub.id}`} className="absolute inset-0 z-0 opacity-0 cursor-pointer"><span className="sr-only">Upload to {sub.name}</span></Link>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
                                <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                                    <div className="col-span-12 sm:col-span-6 md:col-span-4">Name</div>
                                    <div className="hidden sm:block sm:col-span-3 md:col-span-5">File Info</div>
                                    <div className="hidden sm:block sm:col-span-3 md:col-span-2">Status</div>
                                    <div className="hidden md:block md:col-span-1 text-right">Actions</div>
                                </div>
                                <div className="divide-y divide-neutral-100 dark:divide-neutral-800 cursor-default">
                                    {subcategories.map((sub) => {
                                        const userFile = sub.submission?.user_file;
                                        const isImage = userFile?.mime_type?.startsWith('image/');
                                        const fileName = userFile?.original_name || sub.name;
                                        const fileSize = formatSize(userFile?.size);

                                        return (
                                            <div key={sub.id} className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group relative">
                                                <div className="col-span-12 sm:col-span-6 md:col-span-4 flex items-center gap-3 min-w-0">
                                                    {sub.is_filled ? (
                                                        isImage ? <ImageIcon className="w-5 h-5 text-blue-500 shrink-0" /> : <FileText className="w-5 h-5 text-blue-500 shrink-0" />
                                                    ) : (
                                                        <Folder className="w-5 h-5 text-neutral-400 fill-neutral-400/20 shrink-0" />
                                                    )}
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate" title={sub.name}>{sub.name}</span>
                                                        {sub.description && (
                                                            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5" title={sub.description}>{sub.description}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="hidden sm:flex sm:col-span-3 md:col-span-5 flex-col items-start justify-center min-w-0">
                                                    {sub.is_filled ? (
                                                        <>
                                                            <span className="text-sm text-neutral-600 dark:text-neutral-400 truncate w-full" title={fileName}>{fileName}</span>
                                                            {fileSize && (
                                                                <span className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate w-full mt-0.5">{fileSize}</span>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <span className="text-sm text-neutral-400 dark:text-neutral-500 italic">No file</span>
                                                    )}
                                                </div>
                                                <div className="hidden sm:flex sm:col-span-3 md:col-span-2 items-center">
                                                    {sub.is_filled ? (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 border border-green-200 dark:border-green-500/20">
                                                            <CheckCircle className="w-3 h-3 mr-1" /> Filled
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                                                            Pending
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="hidden md:flex md:col-span-1 justify-end">
                                                    <div className="flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                                                        {sub.is_filled ? (
                                                            <a 
                                                                href={`/user/files/preview/${sub.submission?.user_file_id}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="p-1.5 text-neutral-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors focus:outline-none"
                                                                title="Open File"
                                                            >
                                                                <Search className="w-4 h-4" />
                                                            </a>
                                                        ) : (
                                                            <Link 
                                                                href={`/user/subcategories/${sub.id}`}
                                                                className="p-1.5 text-neutral-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors focus:outline-none"
                                                                title="Upload File"
                                                            >
                                                                <FileUp className="w-4 h-4" />
                                                            </Link>
                                                        )}
                                                        <button className="p-1.5 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 rounded-md transition-colors focus:outline-none">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* Link overlay */}
                                                {!sub.is_filled && (
                                                    <Link href={`/user/subcategories/${sub.id}`} className="absolute inset-0 z-0 opacity-0 cursor-pointer"><span className="sr-only">Upload to {sub.name}</span></Link>
                                                )}
                                                {sub.is_filled && (
                                                    <a href={`/user/files/preview/${sub.submission?.user_file_id}`} target="_blank" rel="noreferrer" className="absolute inset-0 z-0 opacity-0 cursor-pointer w-full text-left"><span className="sr-only">Open {fileName}</span></a>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
