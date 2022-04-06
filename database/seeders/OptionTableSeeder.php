<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class OptionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (config('options') as $opt)
            \App\Models\General\Option::create($opt['data']);
    }
}
