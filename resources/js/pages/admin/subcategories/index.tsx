import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Network, Pencil, Plus, Tag, Trash2 } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Category {
    id: number;
    name: string;
    description: string | null;
}

interface Subcategory {
    id: number;
    category_id: number;
    name: string;
    description: string | null;
    created_at: string;
    category?: Category;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Subkategori', href: '/admin/subcategories' },
];

export default function SubcategoriesIndex({ subcategories, categories }: { subcategories: Subcategory[], categories: Category[] }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);

    const { data, setData, post, put, delete: destroy, reset, errors, processing } = useForm({
        category_id: '',
        name: '',
        description: '',
    });

    const openCreateDialog = () => {
        setSelectedSubcategory(null);
        reset();
        setIsDialogOpen(true);
    };

    const openEditDialog = (subcategory: Subcategory) => {
        setSelectedSubcategory(subcategory);
        setData({
            category_id: subcategory.category_id.toString(),
            name: subcategory.name,
            description: subcategory.description || '',
        });
        setIsDialogOpen(true);
    };

    const openDeleteDialog = (subcategory: Subcategory) => {
        setSelectedSubcategory(subcategory);
        setIsDeleteDialogOpen(true);
    };

    const submitForm: FormEventHandler = (e) => {
        e.preventDefault();
        if (selectedSubcategory) {
            put(route('admin.subcategories.update', selectedSubcategory.id), {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        } else {
            post(route('admin.subcategories.store'), {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        }
    };

    const confirmDelete = () => {
        if (selectedSubcategory) {
            destroy(route('admin.subcategories.destroy', selectedSubcategory.id), {
                onSuccess: () => setIsDeleteDialogOpen(false),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subkategori" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
                            Manajemen Subkategori
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Kelola subkategori turunan dari kategori utama.
                        </p>
                    </div>
                    <Button 
                        onClick={openCreateDialog}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Subkategori
                    </Button>
                </div>

                {/* Table Section */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden flex-1">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b bg-muted/50">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Kategori Induk</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Subkategori</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Deskripsi</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {subcategories.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-muted-foreground h-32">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Network className="h-8 w-8 opacity-20" />
                                                <span>Tidak ada subkategori yang ditemukan.</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    subcategories.map((sub) => (
                                        <tr 
                                            key={sub.id}
                                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted group"
                                        >
                                            <td className="p-4 align-middle font-medium">{sub.id}</td>
                                            <td className="p-4 align-middle">
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    {sub.category?.name || 'Tidak diketahui'}
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-semibold">{sub.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle text-muted-foreground max-w-xs truncate">
                                                {sub.description || '-'}
                                            </td>
                                            <td className="p-4 text-right align-middle">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(sub)} className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(sub)} className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Hapus</span>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create / Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px] overflow-visible p-0 border-0 shadow-2xl">
                    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 pb-2 border-b">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold flex items-center gap-2">
                                {selectedSubcategory ? 'Edit Subkategori' : 'Tambah Subkategori'}
                            </DialogTitle>
                            <DialogDescription>
                                {selectedSubcategory 
                                    ? 'Perbarui detail subkategori yang sudah ada di bawah ini.' 
                                    : 'Isi form di bawah ini untuk menambahkan subkategori baru.'}
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    <form onSubmit={submitForm} className="p-6 pt-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="category_id" className="text-sm font-semibold">Kategori Induk</Label>
                            <Select 
                                value={data.category_id} 
                                onValueChange={(val) => setData('category_id', val)}
                            >
                                <SelectTrigger className={errors.category_id ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="-- Pilih Kategori Utama --" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((c) => (
                                        <SelectItem key={c.id} value={c.id.toString()}>
                                            {c.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_id && <p className="text-sm text-red-500 font-medium">{errors.category_id}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-semibold">Nama Subkategori</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={errors.name ? 'border-red-500' : ''}
                                placeholder="Mis. Pertemuan Rutin"
                            />
                            {errors.name && <p className="text-sm text-red-500 font-medium">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-semibold">Deskripsi</Label>
                            <Input
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Deskripsi opsional..."
                            />
                            {errors.description && <p className="text-sm text-red-500 font-medium">{errors.description}</p>}
                        </div>
                        <DialogFooter className="pt-4 mt-2 border-t">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setIsDialogOpen(false)}
                                disabled={processing}
                            >
                                Batal
                            </Button>
                            <Button type="submit" disabled={processing} className="shadow-sm">
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-red-600 flex items-center gap-2">
                            <Trash2 className="h-5 w-5" />
                            Konfirmasi Hapus
                        </DialogTitle>
                        <DialogDescription className="py-4 text-base">
                            Apakah Anda yakin ingin menghapus subkategori <strong>"{selectedSubcategory?.name}"</strong>? 
                            Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={processing}>
                            Batal
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete} disabled={processing}>
                            {processing ? 'Menghapus...' : 'Ya, Hapus'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
