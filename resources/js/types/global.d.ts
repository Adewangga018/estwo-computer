export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    is_admin: boolean;
};

export type Product = {
    idProduct: number;
    nameProduct: string;
    typeProduct: string;
    detailProduct: string;
    brandProduct: string;
    price: number;
    isDiscount: boolean;
    discountPercentage: number;
    priceDiscount: number | null;
    grade: string;
    completenessProduct: string;
    specs: Record<string, any>;
    disability: string[];
    linkProduct: string;
    photo: string;
    created_at: string;
    updated_at: string;
};

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User | null;
    };
};
