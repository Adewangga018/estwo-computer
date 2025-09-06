// resources/js/types/global.d.ts

// Ini akan memberitahu TypeScript bahwa ada fungsi global bernama 'route'
// dan menjelaskan bentuk dasarnya.
declare function route(name: string, params?: any, absolute?: boolean): string;
