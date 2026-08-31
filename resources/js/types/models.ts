export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    sort_order?: number;
    is_active: boolean;
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

export interface Order {
    id: number;
    order_number: string;
    status: string;
    total_amount: number;
    payment_status: string;
    created_at: string;
    user?: {
        id: number;
        name: string;
        email: string;
    };
    items?: OrderItem[];
    payments?: Payment[];
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    subtotal: number;
    product?: {
        id: number;
        name: string;
        price: number;
    };
}

export interface Payment {
    id: number;
    order_id: number;
    amount: number;
    status: string;
    method: string;
    created_at: string;
}

export interface Coupon {
    id: number;
    code: string;
    discount_type: string;
    discount_value: number;
    min_order_amount?: number;
    max_discount_amount?: number;
    usage_limit?: number;
    used_count: number;
    start_date?: string;
    end_date?: string;
    is_active: boolean;
}

export interface ActivityLog {
    id: number;
    user_id?: number;
    action: string;
    description: string;
    model_type?: string;
    model_id?: number;
    ip_address?: string;
    user_agent?: string;
    created_at: string;
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    phone?: string;
    created_at: string;
    orders_count?: number;
    total_spent?: number;
}

export interface Address {
    id: number;
    user_id: number;
    type: string;
    first_name: string;
    last_name: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone?: string;
}

export interface WishlistItem {
    id: number;
    product: {
        id: number;
        name: string;
        price: number;
        sale_price?: number;
        is_active: boolean;
    };
}
