<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardMonitoringController extends Controller
{
    /**
     * Menampilkan Dashboard Monitoring dengan PowerBI Embed.
     * Rute: admin.monitoring (URL: /admin/dashboardmonitoring)
     */
    public function dashboardMonitoring()
     {
        // Embed URL powerBI
        $powerBiEmbedUrl = 'https://app.powerbi.com/view?r=eyJrIjoiOGZkNTFkZTYtNTIwNy00ZDZlLWI2NWItMTIzYTlmYmEyYzU5IiwidCI6IjFkNTE2OWFjLWM3Y2ItNDI3NS05NzY0LWJmOGM5YzM2NGE0YyIsImMiOjEwfQ%3D%3D'; 

        // Inertia::render akan memuat komponen DashboardMonitoring.tsx
        return Inertia::render('admin/DashboardMonitoring', [
            'embedUrl' => $powerBiEmbedUrl,
        ]);
    }
}