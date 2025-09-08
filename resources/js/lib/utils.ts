import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Memformat angka menjadi format mata uang Rupiah (IDR).
 * @param amount - Angka yang akan diformat.
 * @returns String mata uang, contoh: "Rp 1.500.000".
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) {
    return "Rp 0";
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Memformat string tanggal menjadi format yang lebih mudah dibaca.
 * @param dateString - String tanggal (misal: "2023-10-27T10:00:00.000Z").
 * @returns String tanggal yang diformat, contoh: "27 Oktober 2023".
 */
export function formatDate(dateString: string): string {
  if (!dateString) {
    return "Tanggal tidak valid";
  }
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
