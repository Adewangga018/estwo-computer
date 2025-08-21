import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableRow, TableCell, TableHead, TableHeader, TableBody } from '@/components/ui';
import React, { useState } from 'react';

// Tipe data untuk produk, sesuaikan dengan model Product Anda
interface Product {
    idProduct: number;
    nameProduct: string;
    typeProduct: string;
    stockProduct: number;
    price: number;
}

// Anda perlu mengirimkan data products dari controller
export default function ProductsMonitoring({ products }: { products: Product[] }) {
    // Data dummy jika products belum ada
    const dummyProducts: Product[] = [
        { idProduct: 1, nameProduct: 'Laptop Gaming Legion', typeProduct: 'Laptop', stockProduct: 10, price: 15000000 },
        { idProduct: 2, nameProduct: 'Macbook Pro M3', typeProduct: 'Laptop', stockProduct: 5, price: 25000000 },
    ];
    const productList = products && products.length > 0 ? products : dummyProducts;

    // State untuk modal dan produk yang dipilih
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // State untuk form create dan edit
    const [createForm, setCreateForm] = useState({
        nameProduct: '',
        typeProduct: '',
        stockProduct: 0,
        price: 0
    });
    const [editForm, setEditForm] = useState({
        nameProduct: '',
        typeProduct: '',
        stockProduct: 0,
        price: 0
    });

    // Handler modal
    const handleCreate = () => setShowCreate(true);
    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setEditForm({
            nameProduct: product.nameProduct,
            typeProduct: product.typeProduct,
            stockProduct: product.stockProduct,
            price: product.price
        });
        setShowEdit(true);
    };
    const handleDelete = (product: Product) => {
        setSelectedProduct(product);
        setShowDelete(true);
    };
    const closeModal = () => {
        setShowCreate(false);
        setShowEdit(false);
        setShowDelete(false);
        setSelectedProduct(null);
    };

    return (
        <>
            <Head title="Products Monitoring" />
            <div className="mx-auto py-8 bg-gray-100">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Products Monitoring</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <Button className="text-white bg-yellow-500 hover:bg-yellow-600" onClick={handleCreate}>Create New Product</Button>
                        </div>
                        <Table className="text-center align-middle"
                            headers={["ID", "Product Name", "Type", "Stock", "Price", "Actions"]}
                        >
                            {productList.map((product) => (
                                <TableRow key={product.idProduct}>
                                    <TableCell>{product.idProduct}</TableCell>
                                    <TableCell>{product.nameProduct}</TableCell>
                                    <TableCell>{product.typeProduct}</TableCell>
                                    <TableCell>{product.stockProduct}</TableCell>
                                    <TableCell>Rp {product.price.toLocaleString('id-ID')}</TableCell>
                                    <TableCell className="p-0 align-middle text-center">
                                        <div className="flex gap-4 justify-center items-center">
                                            <Button className="text-white bg-yellow-500 hover:bg-yellow-600" variant="outline" size="sm" onClick={() => handleEdit(product)}>Edit</Button>
                                            <Button className="bg-red-500 hover:bg-red-600" variant="destructive" size="sm" onClick={() => handleDelete(product)}>Delete</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Table>
                        {/* Modal Create */}
                        {showCreate && (
                            <div className="fixed inset-0 bg-gray-100 bg-opacity-40 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                    <h2 className="text-xl font-bold mb-4">Create Product</h2>
                                    <form>
                                        <input className="border p-2 w-full mb-2" placeholder="Product Name" value={createForm.nameProduct} onChange={e => setCreateForm(f => ({ ...f, nameProduct: e.target.value }))} />
                                        <input className="border p-2 w-full mb-2" placeholder="Type" value={createForm.typeProduct} onChange={e => setCreateForm(f => ({ ...f, typeProduct: e.target.value }))} />
                                        <input className="border p-2 w-full mb-2" placeholder="Stock" type="number" value={createForm.stockProduct} onChange={e => setCreateForm(f => ({ ...f, stockProduct: Number(e.target.value) }))} />
                                        <input className="border p-2 w-full mb-2" placeholder="Price" type="number" value={createForm.price} onChange={e => setCreateForm(f => ({ ...f, price: Number(e.target.value) }))} />
                                        <div className="flex gap-2 justify-end mt-4">
                                            <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
                                            <Button className="bg-yellow-500 hover:bg-yellow-600" type="submit" variant="default">Create</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {/* Modal Edit */}
                        {showEdit && selectedProduct && (
                            <div className="fixed inset-0 bg-gray-100 bg-opacity-40 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                    <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                                    <form>
                                        <input className="border p-2 w-full mb-2" placeholder="Product Name" value={editForm.nameProduct} onChange={e => setEditForm(f => ({ ...f, nameProduct: e.target.value }))} />
                                        <input className="border p-2 w-full mb-2" placeholder="Type" value={editForm.typeProduct} onChange={e => setEditForm(f => ({ ...f, typeProduct: e.target.value }))} />
                                        <input className="border p-2 w-full mb-2" placeholder="Stock" type="number" value={editForm.stockProduct} onChange={e => setEditForm(f => ({ ...f, stockProduct: Number(e.target.value) }))} />
                                        <input className="border p-2 w-full mb-2" placeholder="Price" type="number" value={editForm.price} onChange={e => setEditForm(f => ({ ...f, price: Number(e.target.value) }))} />
                                        <div className="flex gap-2 justify-end mt-4">
                                            <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
                                            <Button className="bg-yellow-500 hover:bg-yellow-600" type="submit" variant="default">Save</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        {/* Modal Delete */}
                        {showDelete && selectedProduct && (
                            <div className="fixed inset-0 bg-gray-100 bg-opacity-40 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                    <h2 className="text-xl font-bold mb-4 text-red-500">Delete Product</h2>
                                    <p>Are you sure you want to delete <span className="font-semibold">{selectedProduct.nameProduct}</span>?</p>
                                    <div className="flex gap-2 justify-end mt-4">
                                        <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
                                        <Button className="bg-red-500 hover:bg-red-600" type="button" variant="destructive">Delete</Button>
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
