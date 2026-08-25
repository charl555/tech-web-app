DATABASE PLAN FOR TECH ECOMMERCE WEBSITE (REGISTERED USERS ONLY FOR INTERACTIONS)

OVERVIEW

The system is an online shopping platform for computer parts, built with Laravel (backend), React + Inertia.js (frontend), and MySQL. It supports:

Guests: can browse products, categories, brands, view product details, and use search/filters. Guests cannot add items to cart, wishlist, or place orders.

Registered Users: can manage their profile, save addresses, add items to cart, maintain a wishlist, place orders, write reviews, and view order history.

System Admins: manage products, categories, inventory, orders, users, content, and view analytics. Access is role-based.

All interactive features (cart, wishlist, checkout, reviews) require authentication.

ENTITY RELATIONSHIP DIAGRAM (SIMPLIFIED, TEXTUAL)

users --< role_user >-- roles
users --< addresses
users --< orders --< order_items >-- products
products --< product_images
products --< product_attributes
products --< reviews -- users
products --< categories
categories --< categories (self-referential for subcategories)
users --< carts (one active cart per user)
carts --< cart_items >-- products
orders --< payments
coupons --< orders (optional)
users --< wishlist_items >-- products

DATABASE TABLES AND FIELDS

Only tables that differ from the original guest-capable plan are described in detail. All other tables remain as previously defined and are listed without repetition.

users

id: bigint PK, auto increment

name: varchar

email: varchar, unique, required for login

password: varchar, hashed

phone: varchar, optional

is_active: boolean, soft disable account

email_verified_at: timestamp, nullable

remember_token: varchar

created_at: timestamp

updated_at: timestamp

roles

id: bigint PK, auto increment

name: varchar, unique (e.g., 'super-admin')

description: text, optional

created_at: timestamp

updated_at: timestamp

role_user (pivot)

user_id: bigint FK references users.id

role_id: bigint FK references roles.id

created_at: timestamp

updated_at: timestamp
Composite primary key (user_id, role_id).

categories

id: bigint PK, auto increment

name: varchar (e.g., CPUs, GPUs, Motherboards)

slug: varchar, unique URL-friendly name

parent_id: bigint FK, nullable, self-referencing for subcategories

description: text, optional

image: varchar, optional category banner

sort_order: int, for display ordering

is_active: boolean, hide/show category

created_at: timestamp

updated_at: timestamp

brands

id: bigint PK, auto increment

name: varchar (e.g., Intel, AMD, ASUS)

slug: varchar, unique

logo: varchar, image path

description: text, optional

is_active: boolean

created_at: timestamp

updated_at: timestamp

products

id: bigint PK, auto increment

name: varchar, product title

slug: varchar, unique URL-friendly

sku: varchar, stock keeping unit, unique

description: longtext, detailed description

short_description: text, summary for listings

price: decimal(10,2), regular price

sale_price: decimal(10,2), nullable, if on sale

cost_price: decimal(10,2), internal (for profit reports)

quantity: int, current stock level

category_id: bigint FK references categories.id

brand_id: bigint FK references brands.id

is_featured: boolean, highlight on homepage

is_active: boolean, show/hide product

average_rating: decimal(3,2), cached from reviews

total_reviews: int, cached count

created_at: timestamp

updated_at: timestamp

product_attributes
Stores specifications like clock speed, core count, socket type, memory size, etc., as key-value pairs.

id: bigint PK, auto increment

product_id: bigint FK references products.id

attribute_name: varchar (e.g., "Socket", "Core Count")

attribute_value: varchar (e.g., "LGA1700", "8")

sort_order: int, display order

created_at: timestamp

updated_at: timestamp

product_images

id: bigint PK, auto increment

product_id: bigint FK references products.id

image_path: varchar, path to image file

is_primary: boolean, main image for listing

sort_order: int, order in gallery

created_at: timestamp

updated_at: timestamp

product_reviews

id: bigint PK, auto increment

product_id: bigint FK references products.id

user_id: bigint FK references users.id (required, only logged-in users can review)

rating: tinyint, 1-5

title: varchar, review title

comment: text, review body

is_approved: boolean, admin moderation

created_at: timestamp

updated_at: timestamp

carts (modified: user_id required, one active cart per user)

id: bigint PK, auto increment

user_id: bigint FK, required, references users.id

created_at: timestamp

updated_at: timestamp
Unique constraint on user_id to ensure at most one active cart per user.

cart_items

id: bigint PK, auto increment

cart_id: bigint FK references carts.id

product_id: bigint FK references products.id

quantity: int, must be > 0

price: decimal(10,2), snapshot of product price at addition time

created_at: timestamp

updated_at: timestamp

orders (modified: user_id required, no guest checkout)

id: bigint PK, auto increment

order_number: varchar, unique human-readable number

user_id: bigint FK, required, references users.id

status: enum ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')

subtotal: decimal(10,2), sum of items before discounts

discount_amount: decimal(10,2), coupon discount total

tax_amount: decimal(10,2), tax if applicable

shipping_amount: decimal(10,2), shipping cost

total_amount: decimal(10,2), final total

coupon_id: bigint FK, nullable, references coupons.id

shipping_address_id: bigint FK, references addresses.id

billing_address_id: bigint FK, references addresses.id (if different)

payment_status: enum ('pending', 'paid', 'failed', 'refunded')

notes: text, admin/internal notes

created_at: timestamp

updated_at: timestamp

order_items

id: bigint PK, auto increment

order_id: bigint FK references orders.id

product_id: bigint FK references products.id

product_name: varchar, snapshot of name

sku: varchar, snapshot

price: decimal(10,2), unit price at purchase

quantity: int

subtotal: decimal(10,2), price * quantity

created_at: timestamp

updated_at: timestamp

addresses (modified: user_id required)

id: bigint PK, auto increment

user_id: bigint FK, required, references users.id

address_line1: varchar

address_line2: varchar, optional

city: varchar

state: varchar

postal_code: varchar

country: varchar

phone: varchar, contact number

is_default: boolean, default shipping address

created_at: timestamp

updated_at: timestamp

payments

id: bigint PK, auto increment

order_id: bigint FK references orders.id

transaction_id: varchar, payment gateway transaction ID

payment_method: varchar (e.g., 'credit_card', 'paypal', 'bank_transfer')

amount: decimal(10,2), amount paid

status: enum ('pending', 'completed', 'failed', 'refunded')

payment_data: json, gateway response details (optional)

created_at: timestamp

updated_at: timestamp

coupons

id: bigint PK, auto increment

code: varchar, unique coupon code

discount_type: enum ('fixed', 'percent')

discount_value: decimal(10,2), amount or percentage

min_order_amount: decimal(10,2), minimum subtotal to apply

max_discount_amount: decimal(10,2), cap for percent discounts

usage_limit: int, max number of uses (0 = unlimited)

used_count: int, current usage count

start_date: datetime, valid from

end_date: datetime, valid until

is_active: boolean, enable/disable

created_at: timestamp

updated_at: timestamp

wishlist_items

id: bigint PK, auto increment

user_id: bigint FK, required, references users.id

product_id: bigint FK, references products.id

created_at: timestamp

updated_at: timestamp
Unique constraint on (user_id, product_id).

activity_logs (optional, for admin tracking)

id: bigint PK, auto increment

user_id: bigint FK, nullable, references users.id

action: varchar (e.g., 'product.created', 'order.updated')

description: text, human-readable description

model_type: varchar, model class name (e.g., App\Models\Product)

model_id: bigint, affected model ID

ip_address: varchar, user IP

user_agent: text, browser info

created_at: timestamp

RELATIONSHIPS

User has many Roles via role_user (many-to-many).

Category has many Products; Category can have many child categories (self-referencing one-to-many).

Brand has many Products.

Product belongs to Category and Brand; has many ProductImages, ProductAttributes, ProductReviews.

User has one active Cart; Cart belongs to User.

Cart has many CartItems; CartItem belongs to Cart and Product.

User has many Addresses; Address belongs to User.

Order belongs to User (required), has many OrderItems, belongs to Address (shipping/billing), may belong to Coupon, has many Payments.

OrderItem belongs to Order and Product.

Coupon has many Orders.

User has many WishlistItems; WishlistItem belongs to User and Product.

ActivityLog belongs to User (nullable).

INDEXES

products: index on category_id, brand_id, slug, is_active, price, name (for search).

carts: unique index on user_id.

cart_items: index on cart_id, product_id.

order_items: index on order_id, product_id.

orders: index on user_id, order_number, status, created_at.

addresses: index on user_id.

product_attributes: composite index on (product_id, attribute_name) for filtering.

product_reviews: index on product_id, user_id.
