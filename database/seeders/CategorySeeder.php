<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'CPUs & Processors', 'slug' => 'cpus-processors', 'description' => 'Intel and AMD processors for every budget and use case.', 'sort_order' => 1],
            ['name' => 'Graphics Cards', 'slug' => 'graphics-cards', 'description' => 'NVIDIA and AMD GPUs for gaming and professional workloads.', 'sort_order' => 2],
            ['name' => 'Motherboards', 'slug' => 'motherboards', 'description' => 'ATX, Micro-ATX, and Mini-ITX boards from top brands.', 'sort_order' => 3],
            ['name' => 'Memory (RAM)', 'slug' => 'memory-ram', 'description' => 'DDR4 and DDR5 RAM modules in various speeds and capacities.', 'sort_order' => 4],
            ['name' => 'Storage', 'slug' => 'storage', 'description' => 'NVMe SSDs, SATA SSDs, and high-capacity HDDs.', 'sort_order' => 5],
            ['name' => 'Power Supplies', 'slug' => 'power-supplies', 'description' => '80 Plus certified PSUs with reliable power delivery.', 'sort_order' => 6],
            ['name' => 'Cases', 'slug' => 'cases', 'description' => 'ATX, Micro-ATX, and Mini-ITX cases with great airflow.', 'sort_order' => 7],
            ['name' => 'Cooling', 'slug' => 'cooling', 'description' => 'Air and liquid cooling solutions for optimal temperatures.', 'sort_order' => 8],
            ['name' => 'Peripherals', 'slug' => 'peripherals', 'description' => 'Keyboards, mice, monitors, and audio equipment.', 'sort_order' => 9],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
