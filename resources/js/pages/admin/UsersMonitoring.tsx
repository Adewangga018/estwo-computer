import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableRow, TableCell, TableHead, TableHeader, TableBody } from '@/components/ui';
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

// Tipe data untuk user, sesuaikan dengan model User Anda

interface User {
    idUser: number;
    firstName: string;
    lastName: string;
    email: string;
    created_at?: string;
}

interface PaginatedUsers {
    data: User[];
    [key: string]: any;
}

// Anda perlu mengirimkan data users dari controller
export default function UsersMonitoring({ users }: { users: PaginatedUsers }) {
    const userList = users?.data ?? [];

    // State for modals and selected user
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // State untuk form create user
    const [createForm, setCreateForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [errorCreate, setErrorCreate] = useState<string|null>(null);

    // State untuk form edit user
    const [editForm, setEditForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [errorEdit, setErrorEdit] = useState<string|null>(null);

    // State untuk delete
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [errorDelete, setErrorDelete] = useState<string|null>(null);

    // Handler submit create user
    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingCreate(true);
        setErrorCreate(null);
        try {
            // Ambil CSRF token dari meta tag
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const res = await fetch('/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
                body: JSON.stringify(createForm)
            });
            if (!res.ok) {
                const err = await res.json();
                setErrorCreate(err.message || 'Gagal membuat user');
            } else {
                // Sukses, tutup modal dan refresh halaman
                setShowCreate(false);
                setCreateForm({ firstName: '', lastName: '', email: '', password: '' });
                window.location.reload();
            }
        } catch (err) {
            setErrorCreate('Gagal membuat user');
        }
        setLoadingCreate(false);
    };

    // Handlers
    const handleCreate = () => {
        setShowCreate(true);
    };
    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setEditForm({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: ''
        });
        setShowEdit(true);
    };
    const handleDelete = (user: User) => {
        setSelectedUser(user);
        setShowDelete(true);
    };
    const closeModal = () => {
        setShowCreate(false);
        setShowEdit(false);
        setShowDelete(false);
        setSelectedUser(null);
        setErrorEdit(null);
        setErrorDelete(null);
    };

    // Handler submit edit user
    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;
        setLoadingEdit(true);
        setErrorEdit(null);
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const res = await fetch(`/admin/users/${selectedUser.idUser}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
                body: JSON.stringify(editForm)
            });
            if (!res.ok) {
                const err = await res.json();
                setErrorEdit(err.message || 'Gagal mengedit user');
            } else {
                setShowEdit(false);
                window.location.reload();
            }
        } catch (err) {
            setErrorEdit('Gagal mengedit user');
        }
        setLoadingEdit(false);
    };
    // Handler submit delete user
    const handleDeleteSubmit = async () => {
        if (!selectedUser) return;
        setLoadingDelete(true);
        setErrorDelete(null);
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const res = await fetch(`/admin/users/${selectedUser.idUser}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                }
            });
            if (!res.ok) {
                const err = await res.json();
                setErrorDelete(err.message || 'Gagal menghapus user');
            } else {
                setShowDelete(false);
                window.location.reload();
            }
        } catch (err) {
            setErrorDelete('Gagal menghapus user');
        }
        setLoadingDelete(false);
    };

    return (
        <>
            <Head title="Users Monitoring"/>
            <div className="mx-auto py-8 bg-gray-100">
                <div className="mb-4">
                    <Link href="/admin" className="m-4 top-4 left-4">
                        <Button variant="outline" className="flex items-center gap-2">
                            <ArrowLeft size={16} />
                             Kembali ke Dashboard
                        </Button>
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Users Monitoring</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <Button className="text-white bg-yellow-500 hover:bg-yellow-600" onClick={handleCreate}>Create New User</Button>
                        </div>
                        <Table className="text-center align-middle"
                            headers={["ID", "First Name", "Last Name", "Email", "Actions"]}
                        >
                            {userList.map((user) => (
                                <TableRow key={user.idUser}>
                                    <TableCell>{user.idUser}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell className="p-0 align-middle text-center">
                                        <div className="flex gap-4 justify-center items-center">
                                            <Button className="text-white bg-yellow-500 hover:bg-yellow-600" variant="outline" size="sm" onClick={() => handleEdit(user)}>Edit</Button>
                                            <Button className="bg-red-500 hover:bg-red-600" variant="destructive" size="sm" onClick={() => handleDelete(user)}>Delete</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Table>
                        {/* Modal Create */}
                        {showCreate && (
                            <div className="fixed inset-0 bg-gray-100 bg-opacity-40 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                    <h2 className="text-xl font-bold mb-4">Create User</h2>
                                    <form onSubmit={handleCreateSubmit}>
                                        <input className="border p-2 w-full mb-2" placeholder="First Name" value={createForm.firstName} onChange={e => setCreateForm(f => ({ ...f, firstName: e.target.value }))} required />
                                        <input className="border p-2 w-full mb-2" placeholder="Last Name" value={createForm.lastName} onChange={e => setCreateForm(f => ({ ...f, lastName: e.target.value }))} required />
                                        <input className="border p-2 w-full mb-2" placeholder="Email" type="email" value={createForm.email} onChange={e => setCreateForm(f => ({ ...f, email: e.target.value }))} required />
                                        <input className="border p-2 w-full mb-2" placeholder="Password" type="password" value={createForm.password} onChange={e => setCreateForm(f => ({ ...f, password: e.target.value }))} required />
                                        {errorCreate && <div className="text-red-500 mb-2">{errorCreate}</div>}
                                        <div className="flex gap-2 justify-end mt-4">
                                            <Button type="button" variant="outline" onClick={closeModal} disabled={loadingCreate}>Cancel</Button>
                                            <Button className="bg-yellow-500 hover:bg-yellow-600" type="submit" variant="default" disabled={loadingCreate}>{loadingCreate ? 'Creating...' : 'Create'}</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {/* Modal Edit */}
                        {showEdit && selectedUser && (
                            <div className="fixed inset-0 bg-gray-100 bg-opacity-40 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                    <h2 className="text-xl font-bold mb-4">Edit User</h2>
                                    <form onSubmit={handleEditSubmit}>
                                        <input className="border p-2 w-full mb-2" placeholder="First Name" value={editForm.firstName} onChange={e => setEditForm(f => ({ ...f, firstName: e.target.value }))} required />
                                        <input className="border p-2 w-full mb-2" placeholder="Last Name" value={editForm.lastName} onChange={e => setEditForm(f => ({ ...f, lastName: e.target.value }))} required />
                                        <input className="border p-2 w-full mb-2" placeholder="Email" type="email" value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} required />
                                        <input className="border p-2 w-full mb-2" placeholder="Password (optional)" type="password" value={editForm.password} onChange={e => setEditForm(f => ({ ...f, password: e.target.value }))} />
                                        {errorEdit && <div className="text-red-500 mb-2">{errorEdit}</div>}
                                        <div className="flex gap-2 justify-end mt-4">
                                            <Button type="button" variant="outline" onClick={closeModal} disabled={loadingEdit}>Cancel</Button>
                                            <Button className="bg-yellow-500 hover:bg-yellow-600" type="submit" variant="default" disabled={loadingEdit}>{loadingEdit ? 'Saving...' : 'Save'}</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {/* Modal Delete */}
                        {showDelete && selectedUser && (
                            <div className="fixed inset-0 bg-gray-100 bg-opacity-40 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                    <h2 className="text-xl font-bold mb-4 text-red-500">Delete User</h2>
                                    <p>Are you sure you want to delete <span className="font-semibold">{selectedUser.firstName} {selectedUser.lastName}</span>?</p>
                                    {errorDelete && <div className="text-red-500 mb-2">{errorDelete}</div>}
                                    <div className="flex gap-2 justify-end mt-4">
                                        <Button type="button" variant="outline" onClick={closeModal} disabled={loadingDelete}>Cancel</Button>
                                        <Button className="bg-red-500 hover:bg-red-600" type="button" variant="destructive" onClick={handleDeleteSubmit} disabled={loadingDelete}>{loadingDelete ? 'Deleting...' : 'Delete'}</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Tambahkan komponen pagination di sini jika diperlukan */}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
