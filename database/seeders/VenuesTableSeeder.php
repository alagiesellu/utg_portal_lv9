<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class VenuesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        \App\Models\General\Venue::create([
            'name' => 'PB101',
            'type' => 'Lab',
            'description' => 'Peace Building',
            'address' => 'Kanifing',
            'capacity' => 40,
        ]);
    }
}
