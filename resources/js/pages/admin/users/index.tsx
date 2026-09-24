import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { Pencil, Plus, Trash2, UserCircle, Users, ClipboardList, Search } from 'lucide-react';
import { FormEventHandler, useState, useMemo } from 'react';

interface Role {
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    roles?: Role[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Pengguna', href: '/admin/users' },
];

export default function UsersIndex({ users, roles }: { users: User[], roles: Role[] }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = useMemo(() => {
        return users.filter(user => 
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [users, searchQuery]);

    const { data, setData, post, put, delete: destroy, reset, errors, processing } = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const openCreateDialog = () => {
        setSelectedUser(null);
        reset();
        setIsDialogOpen(true);
    };

    const openEditDialog = (user: User) => {
        setSelectedUser(user);
        setData({
            name: user.name,
            email: user.email,
            password: '',
            role: user.roles && user.roles.length > 0 ? user.roles[0].name : '',
        });
        setIsDialogOpen(true);
    };

    const openDeleteDialog = (user: User) => {
        setSelectedUser(user);
        setIsDeleteDialogOpen(true);
    };

    const submitForm: FormEventHandler = (e) => {
        e.preventDefault();
        if (selectedUser) {
            put(route('admin.users.update', selectedUser.id), {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        } else {
            post(route('admin.users.store'), {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        }
    };

    const confirmDelete = () => {
        if (selectedUser) {
            destroy(route('admin.users.destroy', selectedUser.id), {
                onSuccess: () => setIsDeleteDialogOpen(false),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengguna" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
                            Manajemen Pengguna
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Kelola data dan hak akses pengguna sistem.
                        </p>
                    </div>
                    <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Cari pengguna..."
                                className="pl-9 w-full bg-background"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button 
                            onClick={openCreateDialog}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Pengguna
                        </Button>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden flex-1">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b bg-muted/50">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nama Pengguna</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Peran (Role)</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-muted-foreground h-32">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Users className="h-8 w-8 opacity-20" />
                                                <span>Tidak ada pengguna yang ditemukan.</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr 
                                            key={user.id}
                                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted group"
                                        >
                                            <td className="p-4 align-middle font-medium">{user.id}</td>
                                            <td className="p-4 align-middle">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-semibold">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle text-muted-foreground">
                                                {user.email}
                                            </td>
                                            <td className="p-4 align-middle">
                                                {user.roles && user.roles.length > 0 ? (
                                                    <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground">
                                                        {user.roles[0].name.charAt(0).toUpperCase() + user.roles[0].name.slice(1)}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground text-xs italic">Tanpa peran</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-right align-middle">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/users/${user.id}/submissions`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20">
                                                            <ClipboardList className="h-4 w-4" />
                                                            <span className="sr-only">View Submissions</span>
                                                        </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(user)} className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(user)} className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
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
                                {selectedUser ? 'Edit Pengguna' : 'Tambah Pengguna'}
                            </DialogTitle>
                            <DialogDescription>
                                {selectedUser 
                                    ? 'Perbarui informasi pengguna melalui form ini. Kosongkan nilai password jika tidak ingin diubah.' 
                                    : 'Isi form di bawah ini untuk menambahkan pengguna baru.'}
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    <form onSubmit={submitForm} className="p-6 pt-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-semibold">Nama Lengkap</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={errors.name ? 'border-red-500' : ''}
                                placeholder="Mis. John Doe"
                            />
                            {errors.name && <p className="text-sm text-red-500 font-medium">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold">Alamat Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={errors.email ? 'border-red-500' : ''}
                                placeholder="Mis. johndoe@example.com"
                            />
                            {errors.email && <p className="text-sm text-red-500 font-medium">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-semibold">
                                Kata Sandi {selectedUser && <span className="font-normal text-muted-foreground ml-2">(opsional untuk edit)</span>}
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={errors.password ? 'border-red-500' : ''}
                                placeholder="Minimal 8 karakter..."
                            />
                            {errors.password && <p className="text-sm text-red-500 font-medium">{errors.password}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-sm font-semibold">Peran (Role)</Label>
                            <Select 
                                value={data.role} 
                                onValueChange={(val) => setData('role', val)}
                            >
                                <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="-- Pilih Peran --" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((r) => (
                                        <SelectItem key={r.name} value={r.name}>
                                            {r.name.charAt(0).toUpperCase() + r.name.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.role && <p className="text-sm text-red-500 font-medium">{errors.role}</p>}
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
                            Apakah Anda yakin ingin menghapus pengguna <strong>"{selectedUser?.name}"</strong>? 
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
