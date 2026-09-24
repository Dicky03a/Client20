import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { FileUp, Library, File as FileIcon, CheckCircle, Search } from 'lucide-react';


export default function SubmissionCreate({ subcategory, library_files }: { subcategory: any, library_files: any[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Categories', href: '/user/submissions' },
        { title: subcategory.category.name, href: `/user/categories/${subcategory.category.id}` },
        { title: subcategory.name, href: `/user/subcategories/${subcategory.id}` },
    ];

    const [activeTab, setActiveTab] = useState<'upload' | 'library'>('upload');
    const [selectedLibraryFile, setSelectedLibraryFile] = useState<number | null>(null);
    const [previewData, setPreviewData] = useState<{url: string, name: string} | null>(null);

    const { data: uploadData, setData: setUploadData, post: postUpload, processing: uploadProcessing, errors: uploadErrors, progress } = useForm({
        file: null as File | null,
    });

    const { data: libraryData, setData: setLibraryData, post: postLibrary, processing: libraryProcessing, errors: libraryErrors } = useForm({
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
            <div className="flex h-full flex-1 flex-col gap-4 sm:gap-6 rounded-xl p-4 sm:p-6 max-w-4xl mx-auto w-full">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">Submit File for {subcategory.name}</h1>
                    <p className="text-neutral-600 dark:text-neutral-400">Choose a new file to upload or pick one from your existing library.</p>
                </div>
                
                <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                    <div className="flex flex-col sm:flex-row border-b border-neutral-200 dark:border-neutral-700">
                        <button
                            onClick={() => { setActiveTab('upload'); setPreviewData(null); }}
                            className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-center font-medium text-sm transition-colors ${activeTab === 'upload' ? 'bg-neutral-50 dark:bg-neutral-900 text-blue-600 border-l-4 sm:border-l-0 sm:border-b-2 border-blue-600' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                        >
                            <FileUp className="w-4 h-4 mr-2" />
                            Upload New File
                        </button>
                        <button
                            onClick={() => { setActiveTab('library'); setPreviewData(null); }}
                            className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-center font-medium text-sm transition-colors border-t sm:border-t-0 border-neutral-200 dark:border-neutral-700 ${activeTab === 'library' ? 'bg-neutral-50 dark:bg-neutral-900 text-blue-600 border-l-4 sm:border-l-0 sm:border-b-2 border-blue-600' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                        >
                            <Library className="w-4 h-4 mr-2" />
                            Choose from Library
                        </button>
                    </div>

                    <div className="p-4 sm:p-6">
                        {activeTab === 'upload' ? (
                            <form onSubmit={handleUploadSubmit} className="space-y-4 sm:space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Select File (Max 10MB)</label>
                                    <div className="mt-1 flex justify-center px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-6 border-2 border-neutral-300 dark:border-neutral-600 border-dashed rounded-md">
                                        <div className="space-y-2 sm:space-y-1 text-center">
                                            <FileUp className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-neutral-400" />
                                            <div className="flex flex-col sm:flex-row items-center justify-center text-sm text-neutral-600 dark:text-neutral-400">
                                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-neutral-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={e => {
                                                        const file = e.target.files ? e.target.files[0] : null;
                                                        setUploadData('file', file);
                                                        if (file) {
                                                            setPreviewData({ url: URL.createObjectURL(file), name: file.name });
                                                        } else {
                                                            setPreviewData(null);
                                                        }
                                                    }} />
                                                </label>
                                                <p className="mt-1 sm:mt-0 sm:pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-neutral-500 mt-2 sm:mt-0">PDF, DOCX, PNG, JPG up to 10MB</p>
                                        </div>
                                    </div>
                                    {uploadData.file && (
                                        <div className="mt-4 flex flex-col justify-center items-center">
                                            <div className="relative flex flex-col p-2 rounded-xl border-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20 w-40 sm:w-48 transition-all">
                                                <div className="w-full aspect-square mb-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden relative ring-2 ring-blue-600">
                                                    {/\.(jpe?g|png|gif|webp|svg)$/i.test(uploadData.file.name) && previewData ? (
                                                        <img src={previewData.url} alt={uploadData.file.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <FileIcon className="w-10 h-10 text-blue-600" />
                                                    )}
                                                    <div className="absolute inset-x-0 inset-y-0 bg-blue-600/10 dark:bg-blue-900/30 flex items-start justify-end p-1.5 sm:p-2 pointer-events-none">
                                                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 bg-white rounded-full shadow-sm" />
                                                    </div>
                                                </div>
                                                <div className="w-full min-w-0 text-center px-1">
                                                    <h4 className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-white truncate" title={uploadData.file.name}>{uploadData.file.name}</h4>
                                                    <p className="text-[10px] sm:text-xs text-neutral-500 mt-0.5 truncate">{(uploadData.file.size / 1024).toFixed(2)} KB</p>
                                                </div>
                                            </div>
                                            <button 
                                                type="button" 
                                                onClick={() => {
                                                    setUploadData('file', null);
                                                    setPreviewData(null);
                                                }}
                                                className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    )}
                                    {uploadErrors.file && <p className="mt-2 text-sm text-red-600">{uploadErrors.file}</p>}
                                </div>
                                <div className="flex flex-col sm:flex-row justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={uploadProcessing || !uploadData.file}
                                        className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50 transition"
                                    >
                                        {uploadProcessing ? 'Uploading...' : 'Upload & Submit'}
                                    </button>
                                </div>
                                {progress && (
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress.percentage}%` }}></div>
                                    </div>
                                )}
                            </form>
                        ) : (
                            <form onSubmit={handleLibrarySubmit} className="space-y-4 sm:space-y-6">
                                {library_files && library_files.length > 0 ? (
                                    <div className="grid grid-cols-2 flex-shrink-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 max-h-[50vh] sm:max-h-[400px] overflow-y-auto p-1">
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
                                                className={`relative flex flex-col p-2 cursor-pointer rounded-xl border-2 transition-all ${selectedLibraryFile === file.id ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-neutral-200 dark:border-neutral-700 hover:border-blue-300 dark:hover:border-blue-700'}`}
                                            >
                                                <div className={`w-full aspect-square mb-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden relative ${selectedLibraryFile === file.id ? 'ring-2 ring-blue-600' : ''}`}>
                                                    {/\.(jpe?g|png|gif|webp|svg)$/i.test(file.original_name) ? (
                                                        <img src={`/user/files/preview/${file.id}`} alt={file.original_name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <FileIcon className={`w-10 h-10 ${selectedLibraryFile === file.id ? 'text-blue-600' : 'text-neutral-400'}`} />
                                                    )}
                                                    {selectedLibraryFile === file.id && (
                                                        <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-900/30 flex items-start justify-end p-1.5 sm:p-2 pointer-events-none">
                                                            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 bg-white rounded-full shadow-sm" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="w-full min-w-0 text-center px-1">
                                                    <h4 className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-white truncate" title={file.original_name}>{file.original_name}</h4>
                                                    <p className="text-[10px] sm:text-xs text-neutral-500 mt-0.5 truncate">{(file.size / 1024).toFixed(2)} KB</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <Library className="mx-auto h-12 w-12 text-neutral-400 mb-3" />
                                        <h3 className="text-sm font-medium text-neutral-900 dark:text-white">Your library is empty</h3>
                                        <p className="mt-1 text-sm text-neutral-500">Upload a file first to see it here.</p>
                                    </div>
                                )}
                                {libraryErrors.user_file_id && <p className="mt-2 text-sm text-red-600">{libraryErrors.user_file_id}</p>}
                                <div className="flex flex-col sm:flex-row justify-end pt-4 border-t border-neutral-200 dark:border-neutral-700">
                                    <button
                                        type="submit"
                                        disabled={libraryProcessing || !selectedLibraryFile}
                                        className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50 transition"
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
