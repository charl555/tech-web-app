<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            ['name' => 'Intel', 'slug' => 'intel', 'description' => 'Industry-leading processors and technologies.', 'is_active' => true],
            ['name' => 'AMD', 'slug' => 'amd', 'description' => 'High-performance computing and graphics solutions.', 'is_active' => true],
            ['name' => 'NVIDIA', 'slug' => 'nvidia', 'description' => 'World leader in visual computing and AI.', 'is_active' => true],
            ['name' => 'ASUS', 'slug' => 'asus', 'description' => 'Premium motherboards, graphics cards, and components.', 'is_active' => true],
            ['name' => 'Corsair', 'slug' => 'corsair', 'description' => 'High-performance memory, PSUs, and PC components.', 'is_active' => true],
            ['name' => 'Samsung', 'slug' => 'samsung', 'description' => 'NVMe SSDs, memory, and display technologies.', 'is_active' => true],
            ['name' => 'Gigabyte', 'slug' => 'gigabyte', 'description' => 'Motherboards, graphics cards, and hardware.', 'is_active' => true],
            ['name' => 'MSI', 'slug' => 'msi', 'description' => 'Gaming hardware, motherboards, and graphics cards.', 'is_active' => true],
            ['name' => 'Kingston', 'slug' => 'kingston', 'description' => 'Memory modules, SSDs, and storage solutions.', 'is_active' => true],
            ['name' => 'Seagate', 'slug' => 'seagate', 'description' => 'Hard drives and storage solutions for every need.', 'is_active' => true],
            ['name' => 'Cooler Master', 'slug' => 'cooler-master', 'description' => 'Cases, cooling, and power supplies.', 'is_active' => true],
            ['name' => 'EVGA', 'slug' => 'evga', 'description' => 'Graphics cards, motherboards, and power supplies.', 'is_active' => true],
        ];

        foreach ($brands as $brand) {
            Brand::firstOrCreate(['slug' => $brand['slug']], $brand);
        }
    }
}
