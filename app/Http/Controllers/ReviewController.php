<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Testimonial;

class ReviewController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::latest()->get();

        return Inertia::render('Review', [
            'testimonials' => $testimonials,
        ]);
    }
}
