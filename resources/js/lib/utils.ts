// resources/js/lib/utils.ts

// Utility function: cn (classNames)
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

// Tambahkan util lain jika diperlukan
