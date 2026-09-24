import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { CheckCircle, File as FileIcon, FileUp, Library } from 'lucide-react';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SubmissionCreate({ subcategory, library_files }: { subcategory: any; library_files: any[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Categories', href: '/user/submissions' },
        { title: subcategory.category.name, href: `/user/categories/${subcategory.category.id}` },
        { title: subcategory.name, href: `/user/subcategories/${subcategory.id}` },
    ];

    const [activeTab, setActiveTab] = useState<'upload' | 'library'>('upload');
    const [selectedLibraryFile, setSelectedLibraryFile] = useState<number | null>(null);
    const [previewData, setPreviewData] = useState<{ url: string; name: string } | null>(null);

    const {
        data: uploadData,
        setData: setUploadData,
        post: postUpload,
        processing: uploadProcessing,
        errors: uploadErrors,
        progress,
    } = useForm({
        file: null as File | null,
    });

    const {
        data: libraryData,
        setData: setLibraryData,
        post: postLibrary,
        processing: libraryProcessing,
        errors: libraryErrors,
    } = useForm({
        user_file_id: '',
    });

    const handleUploadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postUpload(`/user/subcategories/${subcategory.id}/upload`);
    };

    const handleLibrarySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedLibraryFile) {
            libraryData.user_file_id = selectedLibraryFile.toString();
            postLibrary(`/user/subcategories/${subcategory.id}/library`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Submit - ${subcategory.name}`} />
            <div className="mx-auto flex h-full w-full max-w-4xl flex-1 flex-col gap-4 rounded-xl p-4 sm:gap-6 sm:p-6">
                <div className="mb-4">
                    <h1 className="mb-1 text-2xl font-bold text-neutral-900 dark:text-white">Submit File for {subcategory.name}</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">Choose a new file to upload or pick one from your existing library.</p>
                </div>

                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                    <div className="flex flex-col border-b border-neutral-200 sm:flex-row dark:border-neutral-700">
                        <button
                            onClick={() => {
                                setActiveTab('upload');
                                setPreviewData(null);
                            }}
                            className={`flex flex-1 items-center justify-center px-4 py-3 text-sm font-medium transition-colors sm:px-6 sm:py-4 ${activeTab === 'upload' ? 'border-l-4 border-blue-600 bg-neutral-50 text-blue-600 sm:border-b-2 sm:border-l-0 dark:bg-neutral-900' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                        >
                            <FileUp className="mr-2 h-4 w-4" />
                            Upload New File
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('library');
                                setPreviewData(null);
                            }}
                            className={`flex flex-1 items-center justify-center border-t border-neutral-200 px-4 py-3 text-sm font-medium transition-colors sm:border-t-0 sm:px-6 sm:py-4 dark:border-neutral-700 ${activeTab === 'library' ? 'border-l-4 border-blue-600 bg-neutral-50 text-blue-600 sm:border-b-2 sm:border-l-0 dark:bg-neutral-900' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                        >
                            <Library className="mr-2 h-4 w-4" />
                            Choose from Library
                        </button>
                    </div>

                    <div className="p-4 sm:p-6">
                        {activeTab === 'upload' ? (
                            <form onSubmit={handleUploadSubmit} className="space-y-4 sm:space-y-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        Select File (Max 10MB)
                                    </label>
                                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-neutral-300 px-4 pt-4 pb-4 sm:px-6 sm:pt-5 sm:pb-6 dark:border-neutral-600">
                                        <div className="space-y-2 text-center sm:space-y-1">
                                            <FileUp className="mx-auto h-10 w-10 text-neutral-400 sm:h-12 sm:w-12" />
                                            <div className="flex flex-col items-center justify-center text-sm text-neutral-600 sm:flex-row dark:text-neutral-400">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none hover:text-blue-500 dark:bg-neutral-800"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={(e) => {
                                                            const file = e.target.files ? e.target.files[0] : null;
                                                            setUploadData('file', file);
                                                            if (file) {
                                                                setPreviewData({ url: URL.createObjectURL(file), name: file.name });
                                                            } else {
                                                                setPreviewData(null);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                                <p className="mt-1 sm:mt-0 sm:pl-1">or drag and drop</p>
                                            </div>
                                            <p className="mt-2 text-xs text-neutral-500 sm:mt-0">PDF, DOCX, PNG, JPG up to 10MB</p>
                                        </div>
                                    </div>
                                    {uploadData.file && (
                                        <div className="mt-4 flex flex-col items-center justify-center">
                                            <div className="relative flex w-40 flex-col rounded-xl border-2 border-blue-600 bg-blue-50 p-2 transition-all sm:w-48 dark:bg-blue-900/20">
                                                <div className="relative mb-2 flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-100 ring-2 ring-blue-600 dark:bg-neutral-800">
                                                    {/\.(jpe?g|png|gif|webp|svg)$/i.test(uploadData.file.name) && previewData ? (
                                                        <img
                                                            src={previewData.url}
                                                            alt={uploadData.file.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <FileIcon className="h-10 w-10 text-blue-600" />
                                                    )}
                                                    <div className="pointer-events-none absolute inset-x-0 inset-y-0 flex items-start justify-end bg-blue-600/10 p-1.5 sm:p-2 dark:bg-blue-900/30">
                                                        <CheckCircle className="h-5 w-5 rounded-full bg-white text-blue-600 shadow-sm sm:h-6 sm:w-6" />
                                                    </div>
                                                </div>
                                                <div className="w-full min-w-0 px-1 text-center">
                                                    <h4
                                                        className="truncate text-xs font-medium text-neutral-900 sm:text-sm dark:text-white"
                                                        title={uploadData.file.name}
                                                    >
                                                        {uploadData.file.name}
                                                    </h4>
                                                    <p className="mt-0.5 truncate text-[10px] text-neutral-500 sm:text-xs">
                                                        {(uploadData.file.size / 1024).toFixed(2)} KB
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setUploadData('file', null);
                                                    setPreviewData(null);
                                                }}
                                                className="mt-3 text-sm font-medium text-red-600 transition-colors hover:text-red-700"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    )}
                                    {uploadErrors.file && <p className="mt-2 text-sm text-red-600">{uploadErrors.file}</p>}
                                </div>
                                <div className="flex flex-col justify-end pt-4 sm:flex-row">
                                    <button
                                        type="submit"
                                        disabled={uploadProcessing || !uploadData.file}
                                        className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none disabled:opacity-50 sm:w-auto"
                                    >
                                        {uploadProcessing ? 'Uploading...' : 'Upload & Submit'}
                                    </button>
                                </div>
                                {progress && (
                                    <div className="mt-4 h-2.5 w-full rounded-full bg-gray-200">
                                        <div className="h-2.5 rounded-full bg-blue-600" style={{ width: `${progress.percentage}%` }}></div>
                                    </div>
                                )}
                            </form>
                        ) : (
                            <form onSubmit={handleLibrarySubmit} className="space-y-4 sm:space-y-6">
                                {library_files && library_files.length > 0 ? (
                                    <div className="grid max-h-[50vh] flex-shrink-0 grid-cols-2 gap-3 overflow-y-auto p-1 sm:max-h-[400px] sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
                                        {library_files.map((file) => (
                                            <div
                                                key={file.id}
                                                onClick={() => {
                                                    if (selectedLibraryFile === file.id) {
                                                        setSelectedLibraryFile(null);
                                                        setLibraryData('user_file_id', '');
                                                    } else {
                                                        setSelectedLibraryFile(file.id);
                                                        setLibraryData('user_file_id', file.id.toString());
                                                    }
                                                }}
                                                className={`relative flex cursor-pointer flex-col rounded-xl border-2 p-2 transition-all ${selectedLibraryFile === file.id ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-neutral-200 hover:border-blue-300 dark:border-neutral-700 dark:hover:border-blue-700'}`}
                                            >
                                                <div
                                                    className={`relative mb-2 flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800 ${selectedLibraryFile === file.id ? 'ring-2 ring-blue-600' : ''}`}
                                                >
                                                    {/\.(jpe?g|png|gif|webp|svg)$/i.test(file.original_name) ? (
                                                        <img
                                                            src={`/user/files/preview/${file.id}`}
                                                            alt={file.original_name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <FileIcon
                                                            className={`h-10 w-10 ${selectedLibraryFile === file.id ? 'text-blue-600' : 'text-neutral-400'}`}
                                                        />
                                                    )}
                                                    {selectedLibraryFile === file.id && (
                                                        <div className="pointer-events-none absolute inset-0 flex items-start justify-end bg-blue-600/10 p-1.5 sm:p-2 dark:bg-blue-900/30">
                                                            <CheckCircle className="h-5 w-5 rounded-full bg-white text-blue-600 shadow-sm sm:h-6 sm:w-6" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="w-full min-w-0 px-1 text-center">
                                                    <h4
                                                        className="truncate text-xs font-medium text-neutral-900 sm:text-sm dark:text-white"
                                                        title={file.original_name}
                                                    >
                                                        {file.original_name}
                                                    </h4>
                                                    <p className="mt-0.5 truncate text-[10px] text-neutral-500 sm:text-xs">
                                                        {(file.size / 1024).toFixed(2)} KB
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center">
                                        <Library className="mx-auto mb-3 h-12 w-12 text-neutral-400" />
                                        <h3 className="text-sm font-medium text-neutral-900 dark:text-white">Your library is empty</h3>
                                        <p className="mt-1 text-sm text-neutral-500">Upload a file first to see it here.</p>
                                    </div>
                                )}
                                {libraryErrors.user_file_id && <p className="mt-2 text-sm text-red-600">{libraryErrors.user_file_id}</p>}
                                <div className="flex flex-col justify-end border-t border-neutral-200 pt-4 sm:flex-row dark:border-neutral-700">
                                    <button
                                        type="submit"
                                        disabled={libraryProcessing || !selectedLibraryFile}
                                        className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none disabled:opacity-50 sm:w-auto"
                                    >
                                        Submit from Library
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
