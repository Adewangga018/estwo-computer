<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/ProductsMonitoring', [
            'products' => Product::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        // Validasi sudah benar
        $validatedData = $request->validate([
            'nameProduct' => 'required|string|max:150',
            'typeProduct' => 'nullable|string|max:100',
            'detailProduct' => 'nullable|string',
            'brandProduct' => 'nullable|string|max:100',
            'price' => 'required|numeric|min:0',
            'grade' => 'nullable|string|max:50',
            'completenessProduct' => 'nullable|string|max:255',
            'specs' => 'nullable|string',
            'disability' => 'nullable|string',
            'linkProduct' => 'nullable|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // --- AWAL LOGIKA UPLOAD FOTO YANG BENAR ---
        if ($request->hasFile('photo')) {
            // 1. Ambil file dari request
            $file = $request->file('photo');
            // 2. Simpan file ke storage/app/public/products dan dapatkan path-nya
            $path = $file->store('products', 'public');
            // 3. Masukkan path yang benar ke dalam data yang akan disimpan
            $validatedData['photo'] = $path;
        }
        // --- AKHIR LOGIKA UPLOAD FOTO ---

        Product::create($validatedData);

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
    }

    public function update(Request $request, Product $product)
    {
        // ... (Validasi untuk update)

        // Logika untuk menangani update foto jika ada file baru yang diupload
        if ($request->hasFile('photo')) {
            // Hapus foto lama jika ada
            if ($product->photo) {
                Storage::disk('public')->delete($product->photo);
            }
            // Simpan foto baru
            $path = $request->file('photo')->store('products', 'public');
            $request->merge(['photo' => $path]); // Tambahkan path baru ke request
        }

        $product->update($request->except('photo_file')); // Gunakan except untuk field sementara

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        // Hapus file foto dari storage sebelum menghapus data produk
        if ($product->photo) {
            Storage::disk('public')->delete($product->photo);
        }

        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully.');
    }
}
