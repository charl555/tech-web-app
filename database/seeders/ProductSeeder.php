<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();
        $brands = Brand::all();

        if ($categories->isEmpty() || $brands->isEmpty()) {
            $this->command->warn('Categories or brands are missing. Run CategorySeeder and BrandSeeder first.');

            return;
        }

        $products = [
            ['name' => 'Intel Core i9-14900K', 'slug' => 'intel-core-i9-14900k', 'sku' => 'CPU-001', 'description' => 'High-performance gaming and productivity processor.', 'short_description' => '24-core desktop processor for gaming and productivity.', 'price' => 579.99, 'sale_price' => null, 'cost_price' => 450.00, 'quantity' => 25, 'category_id' => 1, 'brand_id' => 1, 'is_featured' => true, 'is_active' => true, 'average_rating' => 4.8, 'total_reviews' => 128],
            ['name' => 'NVIDIA RTX 4080 Super', 'slug' => 'nvidia-rtx-4080-super', 'sku' => 'GPU-001', 'description' => 'Next-gen graphics for 4K gaming and AI workloads.', 'short_description' => '16GB GDDR6X graphics card for 4K gaming.', 'price' => 999.99, 'sale_price' => 949.99, 'cost_price' => 800.00, 'quantity' => 15, 'category_id' => 2, 'brand_id' => 3, 'is_featured' => true, 'is_active' => true, 'average_rating' => 4.9, 'total_reviews' => 85],
            ['name' => 'AMD Ryzen 9 7950X', 'slug' => 'amd-ryzen-9-7950x', 'sku' => 'CPU-002', 'description' => '16-core powerhouse for creators and gamers.', 'short_description' => '16-core / 32-thread Zen 4 desktop processor.', 'price' => 699.99, 'sale_price' => null, 'cost_price' => 550.00, 'quantity' => 20, 'category_id' => 1, 'brand_id' => 2, 'is_featured' => true, 'is_active' => true, 'average_rating' => 4.7, 'total_reviews' => 112],
            ['name' => 'Corsair Vengeance DDR5 32GB', 'slug' => 'corsair-vengeance-ddr5-32gb', 'sku' => 'RAM-001', 'description' => '32GB high-speed memory kit for modern builds.', 'short_description' => 'DDR5 5600MHz desktop memory kit.', 'price' => 129.99, 'sale_price' => 119.99, 'cost_price' => 90.00, 'quantity' => 50, 'category_id' => 4, 'brand_id' => 5, 'is_featured' => true, 'is_active' => true, 'average_rating' => 4.6, 'total_reviews' => 203],
            ['name' => 'Samsung 990 EVO 2TB', 'slug' => 'samsung-990-evo-2tb', 'sku' => 'STOR-001', 'description' => 'Fast NVMe SSD for gaming and content creation.', 'short_description' => 'PCIe 4.0 NVMe SSD with up to 7250 MB/s speeds.', 'price' => 179.99, 'sale_price' => null, 'cost_price' => 130.00, 'quantity' => 40, 'category_id' => 5, 'brand_id' => 6, 'is_featured' => true, 'is_active' => true, 'average_rating' => 4.8, 'total_reviews' => 310],
            ['name' => 'ASUS ROG Strix Z790-E', 'slug' => 'asus-rog-strix-z790-e', 'sku' => 'MB-001', 'description' => 'Premium motherboard with PCIe 5.0 support.', 'short_description' => 'Intel Z790 chipset with DDR5 and PCIe 5.0.', 'price' => 449.99, 'sale_price' => 429.99, 'cost_price' => 340.00, 'quantity' => 12, 'category_id' => 3, 'brand_id' => 4, 'is_featured' => true, 'is_active' => true, 'average_rating' => 4.7, 'total_reviews' => 64],
            ['name' => 'EVGA SuperNOVA 850W', 'slug' => 'evga-supernova-850w', 'sku' => 'PSU-001', 'description' => 'Fully modular 80+ Gold PSU.', 'short_description' => 'Fully modular 850W power supply with 80+ Gold.', 'price' => 159.99, 'sale_price' => null, 'cost_price' => 110.00, 'quantity' => 0, 'category_id' => 6, 'brand_id' => 12, 'is_featured' => false, 'is_active' => true, 'average_rating' => 4.5, 'total_reviews' => 91],
            ['name' => 'Cooler Master HAF 500', 'slug' => 'cooler-master-haf-500', 'sku' => 'CASE-001', 'description' => 'High-airflow case for optimal cooling.', 'short_description' => 'Mid-tower case with mesh front panel.', 'price' => 109.99, 'sale_price' => null, 'cost_price' => 75.00, 'quantity' => 18, 'category_id' => 7, 'brand_id' => 11, 'is_featured' => false, 'is_active' => true, 'average_rating' => 4.4, 'total_reviews' => 47],
            ['name' => 'AMD Radeon RX 7900 XT', 'slug' => 'amd-radeon-rx-7900-xt', 'sku' => 'GPU-002', 'description' => 'Excellent gaming performance at 4K.', 'short_description' => '20GB GDDR6 graphics card for high-fidelity gaming.', 'price' => 849.99, 'sale_price' => 799.99, 'cost_price' => 680.00, 'quantity' => 10, 'category_id' => 2, 'brand_id' => 2, 'is_featured' => false, 'is_active' => true, 'average_rating' => 4.6, 'total_reviews' => 76],
            ['name' => 'Kingston Fury Beast 64GB', 'slug' => 'kingston-fury-beast-64gb', 'sku' => 'RAM-002', 'description' => 'High-capacity DDR5 kit for workstations.', 'short_description' => '64GB DDR5 5600MHz kit for creators.', 'price' => 249.99, 'sale_price' => null, 'cost_price' => 190.00, 'quantity' => 22, 'category_id' => 4, 'brand_id' => 9, 'is_featured' => false, 'is_active' => true, 'average_rating' => 4.7, 'total_reviews' => 134],
            ['name' => 'MSI MAG Forge 100R', 'slug' => 'msi-mag-forge-100r', 'sku' => 'CASE-002', 'description' => 'Tempered glass mid-tower with mesh front.', 'short_description' => 'Mid-tower case with ARGB and airflow design.', 'price' => 89.99, 'sale_price' => null, 'cost_price' => 60.00, 'quantity' => 30, 'category_id' => 7, 'brand_id' => 8, 'is_featured' => false, 'is_active' => true, 'average_rating' => 4.3, 'total_reviews' => 88],
            ['name' => 'Gigabyte B650 Aorus Elite', 'slug' => 'gigabyte-b650-aorus-elite', 'sku' => 'MB-002', 'description' => 'DDR5 ready AM5 motherboard.', 'short_description' => 'AMD B650 chipset motherboard with PCIe 4.0.', 'price' => 249.99, 'sale_price' => null, 'cost_price' => 190.00, 'quantity' => 16, 'category_id' => 3, 'brand_id' => 7, 'is_featured' => false, 'is_active' => true, 'average_rating' => 4.5, 'total_reviews' => 52],
        ];

        foreach ($products as $product) {
            Product::firstOrCreate(['sku' => $product['sku']], $product);
        }
    }
}
