<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class SetsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        \App\Models\Students\Set::create([
            'name' => '3rd Cohot',
            'degree' => 'BSc',
            'department_id' => 6,
            'school_department_id' => 1,
            'start_date' => \Carbon\Carbon::now()->addYears(-1),
            'expected_years' => 4,
            'grading_system_id' => 1,
        ]);
    }
}
