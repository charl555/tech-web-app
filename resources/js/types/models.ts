export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

export interface Brand {
    id: number;
    name: string;
    slug: string;
    description?: string;
    logo?: string;
    is_active: boolean;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    sku: string;
    description: string;
    short_description?: string;
    price: string | number;
    sale_price?: string | number;
    cost_price?: string | number;
    quantity: number;
    category_id: number;
    brand_id: number;
    is_featured: boolean;
    is_active: boolean;
    average_rating: number;
    total_reviews: number;
    brand?: Brand;
    category?: Category;
}
