<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('admin/TestimonialsMonitoring', [
            'testimonials' => $testimonials,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'profession' => 'required|string|max:255',
            'stars' => 'required|integer|min:1|max:5',
            'review' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $path = $this->handlePhotoUpload($request->file('photo'));
            $validated['photo'] = $path;
        }

        Testimonial::create($validated);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial created successfully.');
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'profession' => 'required|string|max:255',
            'stars' => 'required|integer|min:1|max:5',
            'review' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            // Hapus foto lama jika ada
            if ($testimonial->photo) {
                Storage::disk('public')->delete($testimonial->photo);
            }
            // Upload foto baru
            $path = $this->handlePhotoUpload($request->file('photo'));
            $validated['photo'] = $path;
        }

        $testimonial->update($validated);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->photo) {
            Storage::disk('public')->delete($testimonial->photo);
        }
        $testimonial->delete();

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial deleted successfully.');
    }

    private function handlePhotoUpload($photo)
    {
        $manager = new ImageManager(new Driver());
        $image = $manager->read($photo);

        // Crop gambar ke 300x300 dari tengah
        $image->cover(300, 300);

        $path = 'testimonials/' . time() . '_' . uniqid() . '.jpg';
        Storage::disk('public')->put($path, (string) $image->toJpeg());

        return $path;
    }

    public function publicIndex()
    {
        $testimonials = Testimonial::orderBy('created_at', 'desc')->get();
        return Inertia::render('Review', [
            'testimonials' => $testimonials,
        ]);
    }
}
