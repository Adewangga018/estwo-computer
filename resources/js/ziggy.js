const Ziggy = {
    "url": "http://localhost",
    "port": null,
    "defaults": {},
    "routes": {
        "debugbar.openhandler": {
            "uri": "_debugbar/open",
            "methods": ["GET", "HEAD"]
        },
        "debugbar.clockwork": {
            "uri": "_debugbar/clockwork/{id}",
            "methods": ["GET", "HEAD"]
        },
        "debugbar.assets.css": {
            "uri": "_debugbar/assets/stylesheets",
            "methods": ["GET", "HEAD"]
        },
        "debugbar.assets.js": {
            "uri": "_debugbar/assets/javascript",
            "methods": ["GET", "HEAD"]
        },
        "debugbar.cache.delete": {
            "uri": "_debugbar/cache/{key}/{tags?}",
            "methods": ["DELETE"]
        },
        "sanctum.csrf-cookie": {
            "uri": "sanctum/csrf-cookie",
            "methods": ["GET", "HEAD"]
        },
        "ignition.healthCheck": {
            "uri": "_ignition/health-check",
            "methods": ["GET", "HEAD"]
        },
        "ignition.executeSolution": {
            "uri": "_ignition/execute-solution",
            "methods": ["POST"]
        },
        "ignition.updateConfig": {
            "uri": "_ignition/update-config",
            "methods": ["POST"]
        },
        "home": {
            "uri": "/",
            "methods": ["GET", "HEAD"]
        },
        "catalog.index": {
            "uri": "catalog",
            "methods": ["GET", "HEAD"]
        },
        "catalog.show": {
            "uri": "catalog/{product}",
            "methods": ["GET", "HEAD"],
            "bindings": {
                "product": "id"
            }
        },
        "favorites.index": {
            "uri": "favorites",
            "methods": ["GET", "HEAD"]
        },
        "favorites.store": {
            "uri": "favorites",
            "methods": ["POST"]
        },
        "favorites.destroy": {
            "uri": "favorites/{product}",
            "methods": ["DELETE"],
            "bindings": {
                "product": "id"
            }
        },
        "account.index": {
            "uri": "account",
            "methods": ["GET", "HEAD"]
        },
        "faq": {
            "uri": "faq",
            "methods": ["GET", "HEAD"]
        },
        "login": {
            "uri": "login",
            "methods": ["GET", "HEAD"]
        },
        "logout": {
            "uri": "logout",
            "methods": ["POST"]
        },
        "register": {
            "uri": "register",
            "methods": ["GET", "HEAD"]
        },
        "admin.dashboard": {
            "uri": "admin/dashboard",
            "methods": ["GET", "HEAD"]
        },
        "admin.users.index": {
            "uri": "admin/users",
            "methods": ["GET", "HEAD"]
        },
        "admin.products.index": {
            "uri": "admin/products",
            "methods": ["GET", "HEAD"]
        },
        "admin.products.store": {
            "uri": "admin/products",
            "methods": ["POST"]
        },
        "admin.products.update": {
            "uri": "admin/products/{product}",
            "methods": ["POST"],
            "bindings": {
                "product": "id"
            }
        },
        "admin.products.destroy": {
            "uri": "admin/products/{product}",
            "methods": ["DELETE"],
            "bindings": {
                "product": "id"
            }
        },
        // --- RUTE BARU DITAMBAHKAN DI SINI ---
        "admin.testimonials.index": {
            "uri": "admin/testimonials",
            "methods": ["GET", "HEAD"]
        },
        "admin.testimonials.store": {
            "uri": "admin/testimonials",
            "methods": ["POST"]
        },
        "admin.testimonials.update": {
            "uri": "admin/testimonials/{testimonial}",
            "methods": ["POST"],
            "bindings": {
                "testimonial": "id"
            }
        },
        "admin.testimonials.destroy": {
            "uri": "admin/testimonials/{testimonial}",
            "methods": ["DELETE"],
            "bindings": {
                "testimonial": "id"
            }
        }
    },
    "version": "2.0.0"
};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export {
    Ziggy
};
